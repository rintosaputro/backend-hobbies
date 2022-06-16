const Sequelize = require('sequelize')
const sequelize = require('../helpers/sequelize')

const Users = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'First name can not be empty'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Last name can not be empty'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'Email has been used!'
    },
    validate: {
      isEmail: {
        msg: 'Email does not match'
      },
      notEmpty: {
        msg: 'Email can not be empty'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Password can not be empty'
      }
    }
  }
})

module.exports = Users
