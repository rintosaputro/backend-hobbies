const auth = require('express').Router()

const { register } = require('../controllers/auth')

auth.post('/register', register)

module.exports = auth
