const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'favicon.ico'
  },
  color: {
    type: Sequelize.STRING
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    // REVIEW: ENUM vs model/relationship
    type: Sequelize.ENUM('boot', 'dress', 'sneaker')
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
})

module.exports = Product
