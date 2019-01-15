const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
const {isAdmin} = require('../util')
module.exports = router

router.get('/', async (req, res, next) => {
  if (isAdmin) {
    try {
      const orders = await Order.findAll({
        include: [{model: Product}]
      })
      res.json(orders)
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const orders = await Order.findAll({
        include: [{model: Product}]
      })
      res.json(orders)
    } catch (error) {
      next(error)
    }
  }
})
