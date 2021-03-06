const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const AuthController = require('./controllers/AuthController')

const routes = express.Router()

routes.post('/login', AuthController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes