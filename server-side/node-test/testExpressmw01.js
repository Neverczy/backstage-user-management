const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('01 mw ')
  req.reqDate = Date.now()
  next()
})

app.use((req, res, next) => {
  console.log('02 mw')
  req.reqMethod = req.method
  next()
})

app.get('/api', (req, res) => {
  console.log('get')
  console.log(req.reqDate || 'null')
  console.log(req.reqMethod || 'null')
  res.send(`${req.reqDate || 'null'}
${req.reqMethod || 'null'}`)
})

app.post('/api', (req, res) => {
  console.log('post')
  console.log(req.reqDate || 'null')
  console.log(req.reqMethod || 'null')
  res.send(`${req.reqDate || 'null'}
${req.reqMethod || 'null'}`)
})

app.listen(80, () => {
  console.log('server is running at http://127.0.0.1')
})

