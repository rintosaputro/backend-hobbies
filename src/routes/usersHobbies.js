const usersHobbies = require('express').Router()

const {
  getAllUsersHobbies, getUsersHobbies, editUsersHobbies, addUsersHobbies, deleteUsersHobbies 
} = require('../controllers/usersHobbies')

const {verifyUser} = require('../helpers/auth')

usersHobbies.get('/', getAllUsersHobbies)
usersHobbies.post('/', verifyUser, addUsersHobbies)
usersHobbies.get('/:id', getUsersHobbies)
usersHobbies.patch('/:id', verifyUser, editUsersHobbies)
usersHobbies.delete('/:id', deleteUsersHobbies)

module.exports= usersHobbies
