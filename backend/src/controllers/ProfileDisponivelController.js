const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = request.headers.authorization;

        const servico = await connection('servicoDisponiveis')
            .where('prestadorId', user_id)
            .select('*');

        return response.json(servico);
    }
}