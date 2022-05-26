const express = require('express')
const router = express.Router()

router.get('/get', (req, res) => {
  res.send({
    status: 200,
    message: 'GET请求成功',
    data: req.query
  })
})

router.post('/post', (req, res) => {
  res.send({
    status: 200,
    message: 'POST请求成功',
    data: req.body
  })
})

module.exports = router
