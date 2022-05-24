const fs = require('fs')

fs.readFile('./assets/1.txt', 'utf8', function (err, res) {
  if (err) console.log(err)
  else console.log(res)
})

fs.writeFile('./assets/2.txt', 'm this is 2 txt', 'utf8', function (err) {
  if (err) console.log(err)
  else console.log('写入成功')
})
