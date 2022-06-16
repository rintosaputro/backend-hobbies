const users = require('express').Router()

const {getAllUsers, addUser} = require('../controllers/users')

users.get('/', getAllUsers)
users.post('/', addUser)

module.exports = users
