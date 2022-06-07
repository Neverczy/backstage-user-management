const express = require('express')
const user_sign = require('../router-handler/user_sign')
const router = express.Router()

router.post('/signup', user_sign.signUp)

router.post('/login', user_sign.login)

module.exports = router
