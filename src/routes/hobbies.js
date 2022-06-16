const hobbies = require('express').Router()

const {getAllHobbies, getHobby, addHobby, editHobby} = require('../controllers/hobbies')

hobbies.get('/', getAllHobbies)
hobbies.post('/', addHobby)
hobbies.get('/:id', getHobby)
hobbies.patch('/:id', editHobby)

module.exports = hobbies
