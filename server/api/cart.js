const router = require('express').Router()
const {CartItem, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  const cartId = req.user ? req.user.cartId : req.cookies.cartId
  try {
    const result = await CartItem.findAll({where: {cartId}, include: [Product]})
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const cartId = req.user ? req.user.cartId : req.cookies.cartId
  const {id: productId} = req.body
  try {
    const result = await CartItem.create({quantity: 1, productId, cartId}) //include on create??? Currently isn't working
    // compensating for that fact in getToCart thunk
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const {cartItemId} = req.body
    const result = await CartItem.findById(cartItemId)
    await result.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
