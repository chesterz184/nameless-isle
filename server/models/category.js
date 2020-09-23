const { Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  const Category = sequelize.define(
    'category',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
    },
    {
      timestamp: false,
    }
  )

  Category.associate = (models) => {
    Category.hasMany(models.article, {
      foreignKey: 'categoryId'
    })
    // Category.belongsToMany(models.article, {
    //   as: 'article',
    //   foreignKey: 'articleId',
    //   targetKey: 'id',
    //   constraints: false,
    // })
  }

  return Category
}
