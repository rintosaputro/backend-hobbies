const Sequelize = require('sequelize')
const sequelize = require('../helpers/sequelize')
const Hobbies = require('./hobbies')
const Users = require('./users')

// Many to Many relation (user and hobby)

const UserHobby = sequelize.define('usersHobbies', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

Users.belongsToMany(Hobbies, {
  as: 'hobbies',
  through: UserHobby,
  foreignKey: 'userId'
})

Hobbies.belongsToMany(Users, {
  as: 'users',
  through: UserHobby,
  foreignkey: 'hobbyId'
})

module.exports = UserHobby
