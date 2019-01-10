const requireLogin = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.sendStatus(401)
}

const requireAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next()
  }
  res.sendStatus(403)
}

module.exports = {requireLogin, requireAdmin}
