const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api', (req, res) => {
  console.log('get')
  throw new Error('get is error')
  res.send('get')
})

app.use((err, req, res, next) => {
  console.log('error: ' + err.message)
  res.send('get')
})

app.post('/api/po1', (req, res) => {
  console.log('po1' + req.body)
  res.send(req.body)
})

app.post('/api/po2', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.listen(80, () => {
  console.log('server is running at http://127.0.0.1')
})
