const hobbies = require('express').Router()

const {getAllHobbies, getHobby} = require('../controllers/hobbies')

hobbies.get('/', getAllHobbies)
hobbies.get('/:id', getHobby)

module.exports = hobbies
