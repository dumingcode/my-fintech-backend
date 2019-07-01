const authService = require('../service/authService')
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
        ctx.body = body
    },
    logout(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        if (!ctx.session.user) {
            body.code = -1
            body.msg = '已退出'
            ctx.body = body
            return
        }
        ctx.session = {}
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
        ctx.body = body
    }
}