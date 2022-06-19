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
  age : {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: {
        msg: 'Age must be number'
      },
      min: {
        args: 10,
        msg: 'Age must be above 10 and under 200'
      },
      max: {
        args: 200,
        msg: 'Age must be above 10 and under 200'
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
