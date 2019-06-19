const passport = require('koa-passport')
const lpassport = require('l-passport')
module.exports = {
    weiboCallback(ctx) {
        try {
            console.log(ctx.state.passport)
            ctx.body = ctx.state.passport
        } catch (error) {
            console.log(error)
            ctx.body = "error"
        }

    }
}