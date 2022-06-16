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

exports.addUsersHobbies = async (req, res) => {
  try {
    const {isActive, hobbyId} = req.body
    const {id : userId} = req.user

    const user = await Users.findByPk(userId)

    if (!user) {
      return response(res, 'User is not defined', null, null, 404)
    }
    if (!hobbyId) {
      return response(res, 'Hobby is not defined', null, null, 404)
    }

    const results = await UsersHobbies.create({
      isActive, userId, hobbyId
    })

    return response(res, 'Successfully added users hobbies', results)
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
      const {isActive, hobbyId} = req.body
      const {id: userId} = req.user
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

exports.deleteUsersHobbies = async (req, res) => {
  try {
    const {id} = req.params

    const results = await UsersHobbies.findByPk(id)

    if (results) {
      results.destroy()
      return response(res, 'Successfully deleted', results)
    } else {
      return response(res, 'Data is not define', null, null, 404)
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
