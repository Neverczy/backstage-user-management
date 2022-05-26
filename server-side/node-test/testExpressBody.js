const express = require('express')
const Myurluncode = require('./Myurluncode')

const app = express()

app.use(Myurluncode)

app.post('/api/post', (req, res, next) => {
  console.log(req.body)
  res.send(req.body)
})


app.listen(80, () => {
  console.log('server is running at http://127.0.0.1')
})
