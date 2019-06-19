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
            passport.authenticate('oauth2', {
                successRedirect: '/app',
                failureRedirect: '/'
            })
            return passport.authenticate('oauth2', (err, user, info, status) => {
                ctx.body = { err, user, info, status }
                return ctx.body
            })(ctx)
        } catch (error) {
            console.log(error)
        }

    }
}