const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('CartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = CartItem
