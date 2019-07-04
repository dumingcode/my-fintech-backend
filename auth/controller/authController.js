const authService = require('../service/authService')
const config = require("../../config")
module.exports = {
    async weiboCallback(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        ctx.session.user = `weibo${ctx.state.passport.body.id}`
        ctx.session.userInfo = {
            'nickName': ctx.state.passport.body.screen_name,
            'location': ctx.state.passport.body.location,
            'profile_image_url': ctx.state.passport.body.profile_image_url,
            'uid': `weibo${ctx.state.passport.body.id}`
        }
        await authService.saveUserInfo(ctx.session.userInfo)
        body.data = ctx.session.userInfo
        ctx.cookies.set('nickName', ctx.session.userInfo.nickName, {
            domain: config.domain,
            path: '/',
            secure: false,
            sameSite: 'strict',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 2
        })
        ctx.set({
            'Content-Type': 'text/html'
        })
        ctx.response.redirect(config.homePage)
        ctx.body = body
    },
    async loginTest(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        ctx.session.user = 'local26323'
        ctx.session.userInfo = {
            'nickName': 'jake1036',
            'location': 'beijing',
            'profile_image_url': 'http://tp1.sinaimg.cn/1404376560/50/0/1',
            'uid': `local26323`
        }
        await authService.saveUserInfo(ctx.session.userInfo)
        body.data = ctx.session.userInfo
        ctx.cookies.set('nickName', ctx.session.userInfo.nickName, {
            domain: config.domain,
            path: '/',
            secure: false,
            sameSite: 'strict',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 2
        })
        ctx.set({
            'Content-Type': 'text/html'
        })
        ctx.response.redirect(config.homePage)
        ctx.body = body
    }
}