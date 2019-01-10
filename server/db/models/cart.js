const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.STRING
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Cart
