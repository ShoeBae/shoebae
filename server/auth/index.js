const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const {requireLogin} = require('../util')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      Cart.find({where: {userId: user.id, sessionId: req.session}})
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    Cart.find({where: {sessionId: req.session}}).then(
      Cart.update({userID: user.id})
    )
    await Cart.create({where: {userId: user.id, sessionId: req.session}})
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', requireLogin, (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', requireLogin, (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
