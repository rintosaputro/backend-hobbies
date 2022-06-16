const users = require('express').Router()

const {getAllUsers, addUser, editUser, getUser, getProfile, editProfile} = require('../controllers/users')
const {verifyUser} = require('../helpers/auth')

// Profile endpoint
users.get('/profile', verifyUser, getProfile)
users.patch('/profile', verifyUser, editProfile)

// Users endpoint
users.get('/', getAllUsers)
users.post('/', addUser)
users.get('/:id', getUser)
users.patch('/:id', editUser)

module.exports = users
