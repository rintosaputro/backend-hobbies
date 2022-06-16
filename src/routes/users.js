const users = require('express').Router()

const {getAllUsers, addUser, editUser} = require('../controllers/users')

users.get('/', getAllUsers)
users.post('/', addUser)
users.patch('/:id', editUser)

module.exports = users
