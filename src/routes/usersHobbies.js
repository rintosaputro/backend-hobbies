const usersHobbies = require('express').Router()

const { getAllUsersHobbies } = require('../controllers/usersHobbies')

usersHobbies.get('/', getAllUsersHobbies)

module.exports= usersHobbies
