const express = require('express')
const router = require('./interfaceRouter')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', router)

app.listen(80, () => {
  console.log('interface test server is running at http://127.0.0.1')
})
