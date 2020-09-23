const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/database')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  ...config.options,
})

const db = {}

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
