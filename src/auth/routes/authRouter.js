const router = require('koa-router')()
const passport = require('l-passport')
const authController = require('../controller/authController')
const wxController = require('../controller/wxController')

const routers =
    router.get('auth/weibo/callback', passport.authorization('weibo'), async (ctx) => {
        await authController.weiboCallback(ctx)
    })
        .get('auth/loginTest', process.env.NODE_ENV === 'production' ? () => { } : authController.loginTest)
        // 本地登录
        .post('auth/loginLocal.json', authController.loginLocal)
        // 游客登陆
        .post('auth/loginGuest.json', authController.loginGuest)
        .get('auth/qq/callback', passport.authorization('qq'), async (ctx) => {
            await authController.qqCallback(ctx)
        })
        .post('auth/loginByWeixin.json', wxController.loginByWeixin)
        .get('auth/loginByWeixin.json', wxController.loginByWeixin)




module.exports = routers