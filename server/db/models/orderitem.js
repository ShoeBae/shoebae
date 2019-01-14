const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('OrderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderItem
