const router = require('koa-router')()
const authController = require('../controller/authController')

const routers = router
    .get('auth/weibo/callback', authController.weiboCallback)
module.exports = routers