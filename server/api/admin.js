const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
const {isAdmin} = require('.../util')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Product}, {model: User}]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
