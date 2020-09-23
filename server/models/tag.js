const { Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  const Tag = sequelize.define(
    'tag',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamp: false,
    }
  )

  Tag.associate = (models) => {
    Tag.belongsToMany(models.article, {
      through: 'articleTag'
    })
  }

  return Tag
}
