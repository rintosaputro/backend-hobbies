const Sequelize = require('sequelize')
const sequelize = require('../helpers/sequelize')

const Hobbies = sequelize.define('hobbies', {
  hobby: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Hobby can not be empty'
      }
    }
  }
})

module.exports = Hobbies
