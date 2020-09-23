const jwt = require('jsonwebtoken')
const { TOKEN } = require('../config/base')

exports.createToken = info => {
  const token = jwt.sign(info, TOKEN.secret, { expiresIn: TOKEN.expiresIn })
  return token
}

exports.checkToken = (ctx, roleList = []) => {
  
}