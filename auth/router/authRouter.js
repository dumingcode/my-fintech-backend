const router = require('koa-router')()
const passport = require('l-passport')
const authController = require('../controller/authController')

const routers =
    router.get('auth/weibo/callback', passport.authorization('weibo'), async (ctx) => {
        authController.weiboCallback(ctx)
    })
        .get('auth/logout', authController.logout)



module.exports = routers