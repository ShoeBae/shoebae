const router = require('express').Router()
const {Order, Product, User, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const orders = await Order.findAll({
        include: [Product]
      })
      res.json(orders)
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [Product]
      })
      res.json(orders)
    } catch (error) {
      next(error)
    }
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {orderItems, userId, totalPrice} = req.body
    const order = await Order.create({status: 'created', totalPrice, userId})
    const items = orderItems.map(item => ({...item, orderId: order.id}))
    await OrderItem.bulkCreate(items)
    console.log(order, ',<<<order')
    res.json(order)
  } catch (err) {
    next(err)
  }
})
