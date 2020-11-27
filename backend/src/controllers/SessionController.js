const connection = require('../database/connection');

module.exports = {
        async create(request, response){
            const { email, password } = request.body;

            const user = await connection('usuarios')
                .where('email', email)
                .andWhere('password', password)
                .select('name', 'id', 'tipo')
                .first();
            
            if(!user){
                return response.status(400).json({ error: "No researcher found with this email."});
            }

            return response.json(user);
        }
}