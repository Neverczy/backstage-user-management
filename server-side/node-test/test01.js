const fs = require('fs')
import {mbu} from '../mbz-utils'

// fs.readFile('./assets/1.txt', 'utf8', function (err, res) {
//   if (err) console.log(err)
//   else console.log(res)
// })
//
// fs.writeFile('./assets/2.txt', 'm this is 2 txt', 'utf8', function (err) {
//   if (err) console.log(err)
//   else console.log('写入成功')
// })

const str = '<h1 title="abc">这是一个h1标签<span>123&nbsp;</span></h1>'
console.log(str)
console.log('------------')
let estr = mbu._html_.htmlTextEspace(str)
console.log(estr)
console.log('------------')
let uestr = mbu._html_.htmlTextUnespace(estr)
console.log(uestr)
console.log('------------')

