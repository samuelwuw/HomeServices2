const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = request.headers.authorization;

        const servico = await connection('servicoFeitos')
            .where('prestadorId', user_id)
            .select('*');

        if(!servico){
            const servico2 = await connection('servicoFeitos')
            .where('contratanteId', user_id)
            .select('*');

            return response.json(servico2)
        }

        return response.json(servico);
    }
}