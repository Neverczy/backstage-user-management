const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
  console.log(`request recvied`)
  let str = `request url is ${req.url}\nrequest method is ${req.method}\n你好`
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/' || req.url === '/html') {
    res.end(`<h1>index</h1>`)
  } else if (req.url === '/css') {
    res.end(`<h1>css</h1>`)
  } else if (req.url === '/js') {
    res.end(`<h1>js</h1>`)
  } else {
    res.end('<h1>404 NOT FOUND</h1>')
  }
})

server.listen(80, function () {
  console.log('server is running at http://127.0.0.1')
})
