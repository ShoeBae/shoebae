const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('OrderItem', {
  salePrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
