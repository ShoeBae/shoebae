const Sequelize = require('sequelize')
const db = require('../db')

// REVIEW: association of products/orders?
const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  // REVIEW: transitions?
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
  }
})

module.exports = Order
