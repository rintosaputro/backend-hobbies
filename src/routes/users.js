const users = require('express').Router()

const {getAllUsers, addUser, editUser, getUser} = require('../controllers/users')

users.get('/', getAllUsers)
users.post('/', addUser)
users.get('/:id', getUser)
users.patch('/:id', editUser)

module.exports = users
