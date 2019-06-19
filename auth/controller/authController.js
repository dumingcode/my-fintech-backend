const passport = require('koa-passport')
module.exports = {
    weibo(ctx) {
        let formData = ctx.request.body
        try {
            return passport.authenticate('oauth2', { scope: 'email' })(ctx)
        } catch (error) {
            console.log(error)
        }

    },
    weiboCallback(ctx) {
        try {
            // return passport.authenticate('oauth2', (err, user, info, status) => {
            //     ctx.body = { err, user, info, status }
            //     return ctx.body
            // })(ctx)

            return passport.authenticate('oauth2', (err, user, info, status) => {
                ctx.body = { err, user, info, status }
                return ctx.login(user)
            })(ctx)
        } catch (error) {
            console.log(error)
        }

    }
}