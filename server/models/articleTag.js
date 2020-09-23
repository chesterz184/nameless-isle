const { Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  const ArticleTag = sequelize.define('articleTag', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  return ArticleTag
}
