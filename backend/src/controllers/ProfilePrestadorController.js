const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user = await connection('usuarios')
            .where('tipo', "prestador")
            .select('*');

        return response.json(user);
    },

    async getPrestadorById(request, response){
        const userId = request.headers.authorization;

        const user = await connection('usuarios')
            .where('id', userId)
            .select('*');

        return response.json(user);
    }
}