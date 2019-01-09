const router = require('express').Router()
const {Product, Size} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    // REVIEW: good this exists, should be used
    res.sendStatus(403)
    return next(new Error('Access Denied'))
  }
}

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
    //Product.findByPk(req.params.productId, { include: [...]}
    const product = await Product.findAll({
      where: {
        // REVIEW: use findById
        id: req.params.productId
      },
      include: [{model: Size, as: 'sizes'}]
    })
    res.json(product[0])
  } catch (err) {
    next(err)
  }
})

User.adminWritableFields = ['isAdmin', 'firstname', 'lastname', 'email']
User.userWritableFields = ['firstname', 'lastname', 'email']
Product.writableFields = ['title', 'price', 'categoryId']


// ../util.js

function requireLogin (req, res, next) {
  if (req.user) {
    return next()
  }
  res.sendStatus(401)
}

function requireAdmin (req, res, next) {
  if (req.user.isAdmin) {
    return next()
  }
  res.sendStatus(403)
}


router.post('/', requireLogin, requireAdmin, async (req, res, next) => {
  try {
    // REVIEW: don't pass req.body into `create` or `update` (anything really)
    const productAttributes = _.pick(req.body, Product.writableFields);
    //const {title} = {}
    //product.update({ title: undefined })
    //product.update({})
    const product = await Product.create(productAttributes)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const data = req.body
    const id = req.params.productId
    await Product.update(data, {
      where: {id}
    })
    // REVIEW: id is unique. use findOne, or findById
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

router.delete('/:productId', async (req, res, next) => {
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






cartRouter.put('/cart', requireLogin, async (req, res, next) => {
  if (req.user.isAdmin) {
    // update cart
  }
  else {
    // cart = Cart.findById(???)
    // if (cart.userId === req.user.id) {
    //   update cart
    // }
    // res.sendStatus(403)
  }
})













