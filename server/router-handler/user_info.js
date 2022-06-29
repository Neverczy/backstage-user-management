const db = require('../database/index')

exports.getUserinfo = (req, res) => {
  const sql = `select id,username,nickname,email,user_pic from vm_users where id=?`
  db.query(sql, req.auth.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('获取用户信息失败')
    res.send({
      status: 200,
      data: result[0],
      msg: '成功'
    })
  })
}
