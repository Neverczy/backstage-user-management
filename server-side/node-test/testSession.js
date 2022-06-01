const express = require('express')
const session = require('express-session')

const app = express()
app.use(session({
  secret: 'mbz co',
  resave: false,
  saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/api/post', (req, res) => {
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({status: 1, msg: 'login failed'})
  }
  req.session.user = req.body
  req.session.isLogin = true
  res.send({status: 0, msg: 'login successful'})
})

app.get('/api/username', (req, res) => {
  if (!req.session.isLogin) {
    return res.send({
      status: 1,
      msg: 'failed'
    })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status: 0,
    msg: 'logout success'
  })
})

app.listen(80, (err) => {
  if (err) return console.log(err)
  console.log('server is running at http://127.0.0.1')
})
