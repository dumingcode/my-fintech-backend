const router = require('koa-router')()
const passport = require('l-passport')
const authController = require('../controller/authController')

const routers =
    router.get('auth/weibo/callback', passport.authorization('weibo'), async (ctx) => {
        await authController.weiboCallback(ctx)
    })
        .get('auth/loginTest', process.env.NODE_ENV === 'production' ? () => { } : authController.loginTest)
        // 本地登录
        .post('auth/loginLocal.json', authController.loginLocal)



module.exports = routers