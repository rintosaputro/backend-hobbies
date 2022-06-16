const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/hobbies', require('./hobbies'))

module.exports = route
