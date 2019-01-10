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
      const cart = await Cart.findOne({where: {userId: user.id}})
      //refract code below
      console.log('THIS IS A CART', cart)
      if (cart) {
        await Cart.update({sessionId: req.sessionID})
      }
      ///ERROR ABOVE, TRYING TO UPDATE EXISTING CART

      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    //add lodash above
    const cart = await Cart.find({where: {sessionId: req.sessionID}})
    //refract code below
    console.log('THIS IS A CART', cart)
    if (cart) {
      await Cart.update({where: {userID: user.id}})
    } else {
      await Cart.create({userId: user.id, sessionId: req.sessionID})
    }

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
