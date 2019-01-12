const router = require('express').Router()
const {Order} = require('../db/models/order')
const {Product} = require('../db/models/produt')

module.exports = router

router.get('/', (req, res, next) => {
  try {
    const orders = Order.findAll({
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const orders = Order.findAll({
      where: {
        userId: req.params.id
      },
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
