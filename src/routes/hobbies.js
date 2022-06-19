const hobbies = require('express').Router()

const {getAllHobbies, getHobby, addHobby, editHobby, getHobbyByName} = require('../controllers/hobbies')

hobbies.get('/', getAllHobbies)
hobbies.get('/name', getHobbyByName)
hobbies.post('/', addHobby)
hobbies.get('/:id', getHobby)
hobbies.patch('/:id', editHobby)

module.exports = hobbies
