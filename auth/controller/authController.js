module.exports = {
    weiboCallback(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }

        // console.log(ctx.state.passport)
        ctx.session.user = `weibo${ctx.state.passport.body.id}`
        ctx.session.nickName = ctx.state.passport.body.screen_name
        body.data = {
            'nickName': ctx.state.passport.body.screen_name,
            'uid': ctx.state.passport.body.id,
            'profile_image_url': ctx.state.passport.body.profile_image_url
        }
        ctx.body = body
    },
    logout(ctx) {
        if (!ctx.session.user) {
            ctx.body = 'already logout'
            return
        }
        ctx.session = {}
        ctx.body = '已登出'
    },
    loginTest(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        ctx.session.user = 'test'
        ctx.session.nickName = 'jake1036'
        body.data = {
            'nickName': ctx.session.nickName,
            'uid': ctx.session.user,
            'profile_image_url': 'http://tp1.sinaimg.cn/1404376560/50/0/1'
        }
        ctx.body = body
    }
}