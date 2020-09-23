const { Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  const Article = sequelize.define('article', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT
    },
    viewCount: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0
    }
  })

  Article.associate = models => {
    Article.belongsTo(models.user, {
      foreignKey: 'authorId'
    })
    Article.belongsToMany(models.tag, {
      through: 'articleTag'
    })
    Article.belongsTo(models.category, {
      foreignKey: 'categoryId'
    })
  }

  return Article
}
