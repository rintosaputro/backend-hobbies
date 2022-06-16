const UsersHobbies = require('../models/usersHobbies')
const {response} = require('../helpers/responseHandler')

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
