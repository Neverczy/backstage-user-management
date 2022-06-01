const express = require('express')
const jwt = require('jsonwebtoken')
const {expressjwt: ejwt} = require('express-jwt')

const secret = 'mbz co No.1'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(ejwt({secret, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}))

app.post('/api/login', (req, res) => {
  const userInfo = req.body
  if (userInfo.username !== 'admin' && userInfo.password !== '000000') {
    return res.send({
      status: 400,
      msg: 'login failed'
    })
  }
  const tokenStr = jwt.sign(
    {username: userInfo.username},
    secret,
    {expiresIn: '30h'})
  res.send({
    status: 200,
    msg: 'login success',
    token: tokenStr
  })
})

app.get('/api/getInfo', (req, res) => {
  res.send({
    status: 200,
    msg: 'get success',
    data: req.auth,
    data: req.user,

  })
})

app.listen(80, (err) => {
  if (err) return console.log(err)
  console.log('server is running at http://127.0.0.1')
})
