const router = require('express').Router()
const {User} = require('../db/models')
const _ = require('lodash')

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

router.put('/:id', async (req, res, next) => {
  try {
    const userAttributes = _.pick(req.body, User.userFields)
    const user = await User.findById(req.params.id).then(user =>
      user.update(userAttributes)
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
})
