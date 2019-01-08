const Sequelize = require('sequelize')
const db = require('../db')

const Size = db.define('size', {
  length: {
    type: Sequelize.INTEGER,
    validate: {
      min: 6,
      max: 14
    }
  }
})

module.exports = Size
