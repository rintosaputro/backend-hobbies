const hobbies = require('express').Router()

const {getAllHobbies, getHobby, addHobby} = require('../controllers/hobbies')

hobbies.get('/', getAllHobbies)
hobbies.post('/', addHobby)
hobbies.get('/:id', getHobby)

module.exports = hobbies
