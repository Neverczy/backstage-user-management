const express = require('express')
const user_info = require('../router-handler/user_info')
const router = express.Router()

router.get('/userinfo', user_info.getUserinfo)

module.exports = router
