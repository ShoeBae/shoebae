const router = require('express').Router()
const {Product, Size} = require('../db/models')
const {requireAdmin} = require('../util')
const _ = require('lodash')
module.exports = router

// const isAdmin = (req, res, next) => {
//   if (!req.user || !req.user.isAdmin) {
//     res.sendStatus(403)
//     return next(new Error('Access Denied'))
//   }
// }

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.productId
      },
      include: [{model: Size, as: 'sizes'}]
    })
    res.json(product[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const productAttributes = _.pick(req.body, Product.adminFields)
    const product = await Product.create(productAttributes)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', requireAdmin, async (req, res, next) => {
  try {
    const data = req.body
    const id = req.params.productId
    await Product.update(data, {
      where: {id}
    })
    const product = await Product.findAll({
      where: {
        id
      },
      include: [{model: Size, as: 'sizes '}]
    })
    res.json(product[0])
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', requireAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
