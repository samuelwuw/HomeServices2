const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async index(request, response){
        //esquema de paginação e contagem de incidentes
        const { page = 1} = request.query;

        const [ count ] = await connection('servicoDisponiveis').count();
        
        const servico = await connection('servicoDisponiveis')
            .join('usuarios', 'usuarios.id', '=', 'servicoDisponiveis.prestadorId') 
            .limit(20)
            .offset((page - 1) * 5)
            .select([
                'servicoDisponiveis.*',
                'usuarios.name',
                'usuarios.email'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(servico);
    },

    async pesquisaPorDetalhes(request, response){
        //esquema de paginação e contagem de incidentes
        const { pesquisa } = request.body;
        
        const servico = await connection('servicoDisponiveis')
            .where('detalhes', 'like', `%${pesquisa}%` )             
            .select('*');       

        return response.json(servico);
    },

    async create(request, response){
        const { nomeServico, precoMedio, detalhes, prestadorId } = request.body;

        const servicoId = generateUniqueId();

        const [id] = await connection('servicoDisponiveis').insert({
            nomeServico, precoMedio, detalhes, servicoId, prestadorId
        });

        return response.json({ id });
    },  

    async update(request, response){
        const { id } = request.params;
        const { nomeServico, precoMedio, detalhes, prestadorId } = request.body;

        const servico = await connection('servicoDisponiveis')
        .where('servicoId', id)
        .select('prestadorId')
        .first();

        if(servico.prestadorId != prestadorId){
            return response.status(401).json({ error: 'Operation not permitted'});
        }

        await connection('servicoDisponiveis').where('servicoId', id).update({
            nomeServico, precoMedio, detalhes
        });
        return response.status(204).send();
    },

    async delete(request, response){
        const { id } = request.params;
        const prestadorID = request.headers.authorization;

        const servico = await connection('servicoDisponiveis')
            .where('servicoId', id)
            .select('prestadorId')
            .first();

        if(servico.prestadorId != prestadorID){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('servicoDisponiveis').where('servicoId', id).delete();
        return response.status(204).send();
    }
};