const router = require('express').Router()
const {Order} = require('../db/models/order')

module.exports = router

router.get('/', (req, res, next) => {
  const orders = Order.findAll({
    include: [{model: Product}]
  })
  res.json(orders)
})
