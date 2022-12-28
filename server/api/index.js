const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/games', require('./games'))

router.get('/test', (req, res, next) => {
  res.send(req.user)
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

//new game
//old games
//leader board
