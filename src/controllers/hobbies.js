const { response, pageInfo } = require('../helpers/responseHandler')
const Hobbies = require('../models/hobbies')

exports.getAllHobbies = async (req, res) => {
  try {
    let {page, limit} = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    const offset = (page - 1) * limit
    const {count, rows} = await Hobbies.findAndCountAll({
      attributes: ['id', 'hobby'],
      include: [],
      offset,
      limit
    })
    
    if (rows) {
      const pagination = pageInfo(count, limit, page, 'hobbies')
      return response(res, 'List hobbies', rows, pagination)
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

exports.getHobby = async (req, res) => {
  try {
    const {id} = req.params
    
    const results = await Hobbies.findByPk(id, {
      attributes: ['id', 'hobby']
    })

    if (results) {
      return response(res, 'Detail hobby', results)
    } else {
      return response(res, 'Hobby not found', null, null, 404)
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

exports.addHobby = async (req, res) => {
  try {
    const {hobby} = req.body

    const results = await Hobbies.create({hobby})

    return response(res, 'Successfully created hobby', results)
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