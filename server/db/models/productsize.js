const Sequelize = require('sequelize')
const db = require('../db')

const ProductSize = db.define('ProductSize', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = ProductSize
