const usersHobbies = require('express').Router()

const { getAllUsersHobbies, getUsersHobbies, editUsersHobbies } = require('../controllers/usersHobbies')

usersHobbies.get('/', getAllUsersHobbies)
usersHobbies.get('/:id', getUsersHobbies)
usersHobbies.patch('/:id', editUsersHobbies)

module.exports= usersHobbies
