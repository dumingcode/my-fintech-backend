const userService = require('../service/userService')
module.exports = {
    /**
     * 
     * @param {存储个人自选股} ctx 
     */
    async saveOptStocks(ctx) {
        ctx.session.refresh()
        body = await userService.saveOptStocks(ctx.request.query, ctx.session.user)
        console.log(body)
        ctx.body = body
    },
    async queryOptStocks(ctx) {
        ctx.session.refresh()
        body = await userService.queryOptStocks(ctx.session.user)
        console.log(body)
        ctx.body = body
    }
}