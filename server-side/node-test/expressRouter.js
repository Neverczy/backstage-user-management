const express = require('express')

const router = express.Router()

router.get('/pub/get', (req, res) => {
  res.send('get: pub')
})

router.post('/pub/post', (req, res) => {
  res.send('post: pub')
})

module.exports = router
