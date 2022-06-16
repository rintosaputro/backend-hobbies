const Users = require('../models/users')
const Hobbies = require('../models/hobbies')
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
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: [],
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
      return response(res, 'Unexpeted Error', null, null, 500)
    }
  }
}

exports.getUser = async (req, res) => {
  try {
    const {id} = req.params

    const include = [
      {
        model: Hobbies,
        as: 'hobbies'
      }
    ]

    const results = await Users.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include,
    })

    if (results) {
      return response(res, 'Detail User', results)
    } else {
      return response(res, 'User not found', null, null, 404)
    }
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

exports.addUser = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body

    if (!passwordValidator(password)) {
      return response(res, 'Password must be at least 6 characters, uppercase and lowercase', null, null, 400)
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    await Users.create({
      firstName, lastName, email, password: hashPassword
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

exports.editUser = async (req, res) => {
  try {
    const {id} = req.params
    const user = await Users.findByPk(id)
    if (user) {
      const {firstName, lastName, email, password} = req.body

      const data = {firstName, lastName, email}

      if (password) {
        if (passwordValidator(password)) {
          // Hashing password
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)

          data.password = hashPassword
        } else {
          return response(res, 'Password must be at least 6 characters, uppercase and lowercase', null, null, 400)
        }
      }
      
      for (let key in data) {
        if (data[key]) user[key] = data[key]
      }

      await user.save()
      
      return response(res, 'Successfully edited user', null, null, 200)
    } else {
      return response(res, 'User not found', null, null, 404)
    }
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
