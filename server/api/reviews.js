const router = require('express').Router()
const {Review} = require('../db/models')
const {requireLogin} = require('../util')
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
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/:productID', requireLogin, async (req, res, next) => {
  try {
    const review = await Review.create(
      req.body.rating,
      req.body.comment,
      req.params.productID
    )
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:productID/:reviewID', requireLogin, async (req, res, next) => {
  try {
    const data = req.body
    const id = req.params.reviewID
    await Review.update(data, {
      where: {id}
    })
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.delete('/productID/:reviewID', requireLogin, async (req, res, next) => {
  try {
    await Review.destroy({
      where: {
        id: req.params.reviewID
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
