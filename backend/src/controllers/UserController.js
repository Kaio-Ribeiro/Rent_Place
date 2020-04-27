const generateUniqueID = require('../utils/generateUniqueID')
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {

        const users = await connection('users').select('*')

    
        return response.json(users)
    },

    async create(request, response) {
        const { name, password, whatsapp, email, city, uf } = request.body

        const id = generateUniqueID()

        await connection('users').insert({
            id,
            name,
            password,
            whatsapp,
            email,
            city,
            uf,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params

        await connection('users').where('id', id).delete()

        return response.status(204).send()
    },

    async update(request, response) {
        const { name, password, whatsapp, email, city, uf } = request.body

        const { id } = request.params

        await connection('users').update({
            id,
            name,
            password,
            whatsapp,
            email,
            city,
            uf,
        })

        return response.json({ id })
    }
}