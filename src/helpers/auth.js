const jwt = require('jsonwebtoken')
const {response} = require('../helpers/responseHandler')

const {APP_SECRET} = process.env

exports.verifyUser = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) {
    return response(res, 'Unauthorized', null, null, 401)
  }
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1]
    if (token) {
      const decode = jwt.verify(token, APP_SECRET)
      req.user = decode
      if (decode) {
        return next()
      } else {
        return response(res, 'Unauthorized', null, null, 401)
      }
    } else {
      return response(res, 'Token must be provided', null, null, 401)
    }
  } else {
    return response(res, 'Unexpected error', null, null, 500)
  }
}
