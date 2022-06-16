const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/hobbies', require('./hobbies'))
route.use('/users-hobbies', require('./usersHobbies'))

module.exports = route
