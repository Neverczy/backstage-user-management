const express = require('express')
const router = require('./expressRouter')
const app = express()

/*
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
*/
let mw = function (req, res, next) {
  // console.log(req);
  // console.log(res);
  console.log('mw is trigger')
  next()
}
app.use(mw)
app.use('/api', router)
app.use(express.static('assets'))

app.listen(80, () => {
  console.log('server is running at http://127.0.0.1')
})

