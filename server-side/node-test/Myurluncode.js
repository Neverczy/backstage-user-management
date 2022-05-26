const querystring = require('querystring')

function myUrluncode(req, res, next) {
  let str = ''
  req.on('data', (chunk) => {
    str += chunk
  })
  req.on('end', () => {
    // req.body = querystring.decode(str)
    req.body = querystring.parse(str)
    next()
  })
}

module.exports = myUrluncode
