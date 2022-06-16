const Users = require('../models/users')
const {response, pageInfo} = require('../helpers/responseHandler')

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
    return response(res, 'Unexpected error', err, null, 500)
  }
}
