const usersHobbies = require('express').Router()

const { getAllUsersHobbies, getUsersHobbies, editUsersHobbies, addUsersHobbies, deleteUsersHobbies } = require('../controllers/usersHobbies')

usersHobbies.get('/', getAllUsersHobbies)
usersHobbies.post('/', addUsersHobbies)
usersHobbies.get('/:id', getUsersHobbies)
usersHobbies.patch('/:id', editUsersHobbies)
usersHobbies.delete('/:id', deleteUsersHobbies)

module.exports= usersHobbies
