const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer()
server.on('request', (req, res) => {
  let fpath = path.join(__dirname, `assets${req.url}`)
  if (req.url === '/') {
    fpath = path.join(__dirname, 'assets/clock.html')
  }
  console.log(fpath)
  // res.setHeader('Content-Type', 'text/html; charset=utf-8');
  fs.readFile(fpath, 'utf8', (err, data) => {
    if (err) {
      return res.end('<h1>404 NOT FOUND</h1>')
    }
    return res.end(data)
  })
})

server.listen(80, () => {
  console.log('server is running ar http://127.0.0.1');
})
