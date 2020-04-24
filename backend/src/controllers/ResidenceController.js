const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query

        const [count] = await connection('residences').count()

        const residences = await connection('residences')
        .join('users', 'users.id', '=', 'residences.user_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'residences.*', 
            'users.name', 
            'users.whatsapp', 
            'users.email'
        ])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(residences)
    },

    async create(request, response) {
        const { city, district, street, house_number, uf, title, description, vacancies_number, residents_number, price } = request.body

        const user_id = request.headers.authorization

        const [id] = await connection('residences').insert({
            city, 
            district, 
            street, 
            house_number, 
            uf,
            title, 
            description, 
            vacancies_number, 
            residents_number, 
            price,
            user_id,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const user_id = request.headers.authorization

        const residence = await connection('residences')
        .where('id', id)
        .select('user_id')
        .first()

        if(residence.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('residences').where('id', id).delete()

        return response.status(204).send()
    },

}