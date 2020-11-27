const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //esquema de paginação e contagem de incidentes
        const { page = 1} = request.query;

        const [ count ] = await connection('servicoFeitos').count();
        
        const servico = await connection('servicoFeitos')
            .join('usuarios', 'usuarios.id', '=', 'servicoFeitos.prestadorId') 
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'servicoFeitos.*',
                'usuarios.name',
                'usuarios.email'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(servico);
    },

    async create(request, response){
        const { nomeServico, preco, detalhes, notaDoContratante, notaDoPrestador, 
            relatorio, prestadorId, contratanteId } = request.body;

        const servicoId = generateUniqueId();

        const [id] = await connection('servicoFeitos').insert({
            nomeServico, preco, detalhes, notaDoContratante, notaDoPrestador, 
            servicoId, relatorio, contratanteId, prestadorId
        });

        return response.json({ id });
    },
};