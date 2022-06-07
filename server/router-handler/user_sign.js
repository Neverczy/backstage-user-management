const db = require('../database/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.signUp = (req, res) => {
  const userSignInfo = req.body
  if (!(userSignInfo.username.trim()) || !(userSignInfo.password.trim())) {
    return res.cc('用户名或密码不合法')
  }
  userSignInfo.password = userSignInfo.password.trim()
  let sql = `select username from vm_users where username=?`
  db.query(sql, [userSignInfo.username], (err, result) => {
    if (err) return res.cc(err)
    if (result.length > 0) return res.cc('用户名已被占用')
    userSignInfo.password = bcrypt.hashSync(userSignInfo.password, 8)
    sql = `insert into vm_users set ?`
    db.query(sql, {username: userSignInfo.username, password: userSignInfo.password}, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('注册失败,请稍后再试')
      res.cc('注册成功', 200)
    })
  })
}

exports.login = (req, res) => {
  const userLoginInfo = req.body
  if (!userLoginInfo.username.trim() || !userLoginInfo.password.trim())
    return res.cc('用户名或密码不能为空')
  userLoginInfo.password = userLoginInfo.password.trim()
  let sql = `select * from vm_users where username=?`
  db.query(sql, userLoginInfo.username, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('用户不存在')
    let pwdVaild = bcrypt.compareSync(userLoginInfo.password, result[0].password)
    if (!pwdVaild) return res.cc('用户名或密码错误')
    const user = {...result[0], password: '', user_pic: ''}
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
    res.send({
      status: 200,
      msg: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  })
}
