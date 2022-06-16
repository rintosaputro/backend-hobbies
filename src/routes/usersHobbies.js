const usersHobbies = require('express').Router()

const { getAllUsersHobbies, getUsersHobbies, editUsersHobbies, addUsersHobbies } = require('../controllers/usersHobbies')

usersHobbies.get('/', getAllUsersHobbies)
usersHobbies.post('/', addUsersHobbies)
usersHobbies.get('/:id', getUsersHobbies)
usersHobbies.patch('/:id', editUsersHobbies)

module.exports= usersHobbies
