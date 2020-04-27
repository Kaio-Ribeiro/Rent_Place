const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('User', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new User', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            name: "Kaio Anderson",
            password: "12456789",
            whatsapp: "88998715967",
            email: "kaio.and7@gmail.com",
            city: "Cedro",
            uf: "CE",
        })
        
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})