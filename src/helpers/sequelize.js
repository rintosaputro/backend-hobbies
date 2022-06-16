const Sequelize = require('sequelize')

const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT} = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
})

module.exports = sequelize
