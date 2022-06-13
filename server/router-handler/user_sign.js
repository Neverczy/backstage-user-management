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
    db.query(sql, {
      username: userSignInfo.username,
      password: userSignInfo.password,
      nickname: userSignInfo.nickname,
      email: userSignInfo.email,
      is_admin: userSignInfo.username === 'admin' ? 0 : 1
    }, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('注册失败,请稍后再试')
      res.cc('注册成功', 200)
    })
  })
}

exports.login = (req, res) => {
  const userLoginInfo = req.body
  const menu = [
    [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'home'
      },
      {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'mall'
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'user'
      },
      {
        label: '其他',
        icon: 'location',
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'others/pageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'others/pageTwo'
          }
        ]
      }
    ],
    [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'home'
      },
      {
        path: '/video',
        name: 'video',
        label: '商品管理',
        icon: 'video-play',
        url: 'mall'
      }
    ]
  ]
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
      data: menu[result[0]['is_admin']],
      token: 'Bearer ' + tokenStr
    })
    console.log(`用户"${userLoginInfo.username}"登陆了`)
  })
}
