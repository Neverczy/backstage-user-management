const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})

// db.query('select 1', (err, res) => {
//   if (err) return console.log(err.message)
//   console.log(res)
// })
//
// db.query("SELECT * FROM user", (err, res) => {
//   if (err) return console.log(err.message)
//   console.log(res)
// })

// const updateData = {username: 'Spider-Man', password: 'pcc321'};
// let sqlStr = 'insert into user (username,password) values (?,?)'
// db.query(sqlStr, [updateData.username, updateData.password], (err, res) => {
//   if (err) return console.log(err.message)
//   if (res.affectedRows === 1) return console.log('insert successful')
// })

// const ud1 = {username: 'Spider-Man2', password: 'pcc4321'}
// sqlStr = 'insert into user set ?'
// db.query(sqlStr, ud1, (err, res) => {
//   if (err) return console.log(err.message)
//   console.log(res)
// })

// const ud = {id: 14, username: 'SpiderMan666', password: '666666'}
// const sqlStr = 'update user set username=?,password=? where id=?'
// db.query(sqlStr, [ud.username, ud.password, ud.id], (err, res) => {
//   if (err) return console.log(err.message)
//   if (res.affectedRows === 1) return console.log('update successful')
// })

// const ud = {id: 14, username: 'SpiderMan', password: '666', status: 1}
// const sqlStr = 'update user set ? where id=?'
// db.query(sqlStr, [ud, ud.id], (err, res) => {
//   if (err) return console.log(err.message)
//   if (res.affectedRows === 1) return console.log('update successful')
// })

const sqlStr = 'delete from user where id = ?'
db.query(sqlStr, 14, (err, res) => {
  if (err) return console.log(err.message)
  if (res.affectedRows === 1) return console.log('delete successful')
})
