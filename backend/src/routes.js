const express = require('express')

const UserController = require('./controllers/UserController')
const ResidenceController = require('./controllers/ResidenceController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.delete('/users/:id', UserController.delete)
routes.put('/users/:id', UserController.update)

routes.get('/residences', ResidenceController.index)
routes.post('/residences', ResidenceController.create)
routes.delete('/residences/:id', ResidenceController.delete)

routes.get('/profile', ProfileController.index)

module.exports = routes