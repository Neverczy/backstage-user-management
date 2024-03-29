const express = require('express')
const cors = require('cors')
const {expressjwt: jwt} = require('express-jwt')
const config = require('./config')

const userSign = require('./router/user_sign')
const userInfo = require('./router/user_info')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.cc = function (err, status = 400) {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use(jwt({secret: config.jwtSecretKey, algorithms: ["HS256"]})
  .unless({path: [/^\/api\//]}))


app.use('/api', userSign)
app.use('/my', userInfo)

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name = 'UnauthorizedError') return res.cc('身份认证失败')
})

app.listen('3007', () => {
  console.log('server is running at http://127.0.0.1:3007')
})
