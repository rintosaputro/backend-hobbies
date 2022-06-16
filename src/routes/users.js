const users = require('express').Router()

const {getAllUsers} = require('../controllers/users')

users.get('/', getAllUsers)

module.exports = users
