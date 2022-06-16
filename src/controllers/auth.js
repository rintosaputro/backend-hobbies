const Users = require('../models/users')
const {response} = require('../helpers/responseHandler')
const {passwordValidator} = require('../helpers/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {APP_SECRET} = process.env

exports.register = async (req, res) => {
  try {
    const {firstName, lastName, age, email, password} = req.body

    if (!passwordValidator(password)) {
      return response(res, 'Password must be at least 6 characters, uppercase and lowercase', null, null, 400)
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await Users.create({
      firstName, lastName, age, email, password: hashPassword
    })

    return response(res, 'Successfully created user')
  } catch (err) {
    if (err.errors) {
      let message = ''
      err.errors.map(error => {
        message = error.message
      })

      return response(res, message, null, null, 400)
    } else {
      return response(res, 'Unexpeted Error', null, null, 500)
    }
  }
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body

    if (!email && !password) {
      return response(res, 'Email and password can not be empty')
    }

    const user = await Users.findOne({
      where: {email}
    })

    if (!user) {
      return response(res, 'User with this email is not found', null, null, 400)
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return response(res, 'Invalid password', null, null, 400)
    }

    const {id} = user
    const token = jwt.sign({id}, APP_SECRET)
    const results = {token}

    return response(res, 'Successfully logged in', results)
  } catch (err) {
    if (err.errors) {
      let message = ''
      err.errors.map(error => {
        message = error.message
      })

      return response(res, message, null, null, 400)
    } else {
      return response(res, 'Unexpeted Error', null, null, 500)
    }
  }
}
