const Users = require('../models/users')
const {response, pageInfo} = require('../helpers/responseHandler')
const {passwordValidator} = require('../helpers/validator')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {
  try {
    let { page, limit } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    const offset = (page - 1) * limit

    const {count, rows} = await Users.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName'],
      offset,
      limit
    })
    if (rows.length > 0) {
      const pagination = pageInfo(count, limit, page, 'users')
      return response(res, 'List users', rows, pagination)
    } else {
      return response(res, 'Data not found', null, null, 404)
    }
  } catch (err) {
    if (err.errors) {
      let message = ''
      err.errors.map(error => {
        message = error.message
      })
      return response(res, message, null, null, 400)
    } else {
      return response(res, 500, 'Unexpeted Error')
    }
  }
}

exports.addUser = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body

    if (!passwordValidator(password)) {
      return response(res, 'Password must be at least 6 characters, uppercase and lowercase', null, null, 400)
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const results = await Users.create({
      firstName, lastName, email, password: hashPassword
    })

    return response(res, 'Successfully created user', results)
  } catch (err) {
    if (err.errors) {
      let message = ''
      err.errors.map(error => {
        message = error.message
      })
      return response(res, message, null, null, 400)
    } else {
      return response(res, 500, 'Unexpeted Error')
    }
  }
}
