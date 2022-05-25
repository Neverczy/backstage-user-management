/*exports.userName = 'chenzy';
exports.age = '28';
exports.pro = 'broswer side'

module.exports.addr = 'us fl miami'
module.exports = {
  coName: 'mbz',
  since: '1994',
  addr: 'us fl miami'
}

module.exports = exports*/

// exports = {
//   name: 'mbz',
//   since: '1994',
//   addr: 'us fl miamie'
// }
//
// module.exports = exports

function timeFormatter(dateStr) {
  let dt = new Date(dateStr)
  let year = dt.getFullYear()
  let month = fillZero(dt.getMonth() + 1)
  let date = fillZero(dt.getDate())
  let hours = fillZero(dt.getHours())
  let min = fillZero(dt.getMinutes())
  let second = fillZero(dt.getSeconds())
  fillZero(year)
  fillZero(min)
  return `${year}/${month}/${date} ${hours}:${min}:${second}`
}

function fillZero(str) {
  return str < 9 ? '0' + str : str;
}

module.exports = {
  timeFormatter,
}
