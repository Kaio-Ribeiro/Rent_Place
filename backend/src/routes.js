const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UserController = require('./controllers/UserController')
const ResidenceController = require('./controllers/ResidenceController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/users', UserController.index)

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required().min(6).max(10),
        whatsapp: Joi.string().required().min(10).max(11),
        email: Joi.string().required().email(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        
    })
}), UserController.create)

routes.delete('/users/:id', UserController.delete)
routes.put('/users/:id', UserController.update)

routes.get('/residences', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), ResidenceController.index)

routes.post('/residences', celebrate({
    [Segments.BODY]: Joi.object().keys({
        city: Joi.string().required(),
        district: Joi.string().required(),
        street: Joi.string().required(),
        house_number: Joi.number().required(),
        uf: Joi.string().required().length(2),
        title: Joi.string().required(),
        description: Joi.string().required(),
        vacancies_number: Joi.number().required(),
        residents_number: Joi.number().required(),
        price: Joi.number().required(),
    })
}), ResidenceController.create)

routes.delete('/residences/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ResidenceController.delete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index)

module.exports = routes