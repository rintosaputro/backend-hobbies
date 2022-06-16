const hobbies = require('express').Router()

const {getAllHobbies} = require('../controllers/hobbies')

hobbies.get('/', getAllHobbies)

module.exports = hobbies
