const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization

        const residences = await connection('residences')
        .where('users_id', users_id)
        .select('*')

        return response.json(residences)
    }
}