const router = require('express').Router()
const {User} = require('../db/models')
const {CartItem} = require('../db/models/cartitem')
const {Cart} = require('../cart')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/account', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {userId: req.params.id}
    })
    const orders = await CartItem.findById({
      where: {cartId: cart.id}
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
