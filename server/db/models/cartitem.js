const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartitem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  selectedSize: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartItem
