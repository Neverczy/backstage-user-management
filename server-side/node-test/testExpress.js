const express = require('express')
const app = express()

app.get('/user', (req, res) => {
  console.log(Date.now(), 'get')
  console.log(req.query)
  res.send('good')
})

app.post('/user', (req, res) => {
  console.log('post')
  console.log(req.query)
  res.send(req.query)
})

app.listen(80, () => {
  console.log('server is running at 127.0.0.1')
})
