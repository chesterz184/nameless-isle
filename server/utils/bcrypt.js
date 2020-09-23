const bcrypt = require('bcrypt')
const saltRounds = 10

function encrypt(password) {
  return new Promise((res, rej) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        rej(password)
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          res(password)
        }
        res(hash)
      })
    })
  })
}

function comparePassword (_password, hash) {
  return new Promise((res, rej) => {
    bcrypt.compare(_password, hash, (err, isMatch) => {
      if (err) {
        rej(err)
      } else {
        res(isMatch)
      }
    })
  })
}

module.exports = {
  encrypt,
  comparePassword
}