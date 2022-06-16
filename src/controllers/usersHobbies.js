const UsersHobbies = require('../models/usersHobbies')
const {response} = require('../helpers/responseHandler')
const Users = require('../models/users')
const Hobbies = require('../models/hobbies')

exports.getAllUsersHobbies = async (req, res) => {
  try {
    const results = await UsersHobbies.findAll({
      attributes: ['id', 'isActive', 'userId', 'hobbyId']
    })

    if (results) {
      return response(res, 'List Users Hobbies', results)
    }else {
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

exports.getUsersHobbies = async (req, res) => {
  try {
    const {id} = req.params
    const results = await UsersHobbies.findByPk(id, {
      attributes: ['id', 'isActive', 'userId', 'hobbyId']
    })

    if (results) {
      return response(res, 'Detail User Hobby', results)
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

exports.editUsersHobbies = async (req, res) => {
  try {
    const {id} = req.params

    const results = await UsersHobbies.findByPk(id, {
      attributes: ['id', 'isActive', 'userId', 'hobbyId']
    })

    if (results) {
      const {isActive, userId, hobbyId} = req.body
      const data = {}

      if (isActive) {
        if (isActive === 1 || isActive === 0) {
          return response(res, 'isActive can only be filled with 1 for true and 0 for false', null, null, 400)
        } else {
          data.isActive = isActive
        }
      }

      if (userId) {
        const user = await Users.findByPk(userId)
        if (user) {
          data.userId = userId
        } else {
          return response(res, 'User is not define', null, null, 404)
        }
      }

      if (hobbyId) {
        const hobby = await Hobbies.findByPk(hobbyId)
        if (hobby) {
          data.hobbyId = hobbyId
        } else {
          return response(res, 'Hobby is not define', null, null, 404)
        }
      }

      for (let key in data) {
        results[key] = data[key]
      }

      await results.save()

      return response(res, 'Successfully edited users hobbies', results)
    } else {
      return response(res, 'Users Hobbies not found', null, null, 404)
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
