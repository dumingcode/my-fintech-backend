const passport = require('koa-passport')
const lpassport = require('l-passport')
module.exports = {
    weiboCallback(ctx) {
        try {
            lpassport.authorization('weibo'), async (ctx) => {
                ctx.body = ctx.state.passport
            }
        } catch (error) {
            console.log(error)
        }

    }
}