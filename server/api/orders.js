const router = require('express').Router()
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models/product')
const {Order} = require('../db/models/order')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await OrderItem.findAll()
    console.log(orders)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
