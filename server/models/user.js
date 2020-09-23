const { Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      comment: 'bcrypt加密'
    },
    email: {
      type: Sequelize.STRING(50)
    },
    role: {
      type: Sequelize.TINYINT,
      defaultValue: 2,
      comment: '用户权限：1 - admin, 2 - 普通用户'
    },
    github: {
      type: Sequelize.TEXT // github 登录用户 直接绑定在 user 表
    },
  })

  User.associate = models => {
    User.hasMany(models.article, {
      foreignKey: 'authorId'
    })
  }

  return User
}
