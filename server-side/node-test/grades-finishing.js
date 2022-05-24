const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, '/assets/grades.txt'), 'utf8', function (err, res) {
  if (err) return console.log(err)
  console.log('reading from: ', path.basename(path.join(__dirname, '/assets/grades.txt')))
  let resArray = res.split(' ')
  let formateStr = ''
  resArray.forEach(item => {
    let reformateStr = item.split('=').join(':')
    formateStr += reformateStr + '\n'
  })
  fs.writeFile(path.join(__dirname, '/assets/grades-ok.txt'), formateStr, 'utf8', function (err) {
    if (err) return console.log(err)
    console.log('writting from: ', path.basename(path.join(__dirname, '/assets/grades-ok.txt'), '.txt'))
  })
})
