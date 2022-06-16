const usersHobbies = require('express').Router()

const { getAllUsersHobbies, getUsersHobbies } = require('../controllers/usersHobbies')

usersHobbies.get('/', getAllUsersHobbies)
usersHobbies.get('/:id', getUsersHobbies)

module.exports= usersHobbies
