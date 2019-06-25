const userService = require('../service/userService')
module.exports = {
    /**
     * 存储个人自选股代码列表
     * @param {*} ctx 
     */
    async saveOptStocks(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptStocks(ctx.request.query, ctx.session.user)
        if (body.code > 0) {
            const optStocks = await userService.queryOptStocks(ctx.session.user)
            ctx.session.optStocks = optStocks.data
            body.data = optStocks.data
        }
        ctx.body = body
    },
    /**
     * 查询自选股代码列表
     * @param {*} ctx 
     */
    async queryOptStocks(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optStocks) {
            ctx.body = await userService.queryOptStocks(ctx.session.user)
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optStocks }
        }
    },
    /**
     * 保存网格策略参数信息
     * @param {*} ctx 
     */
    async saveOptGridInfo(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptGridInfo(ctx.request.query, ctx.session.user)
        const optGrid = await userService.queryOptGridInfo(ctx.session.user)
        ctx.session.optGrid = optGrid.data
        body.data = optGrid.data
        ctx.body = body
    },
    /**
     * 查询网格策略参数信息
     * @param {*} ctx 
     */
    async queryOptGridInfo(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optGrid) {
            const body = await userService.queryOptGridInfo(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optGrid }
        }
    },
    /**
     * 保存自选股交易数据-成本价、已补仓次数、已止盈次数
     * @param {*} ctx 
     */
    async saveOptStockDealDetail(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptStockDealDetail(ctx.request.query, ctx.session.user)
        const stockDealDetail = await userService.queryOptStockDealDetail(ctx.session.user)
        ctx.session.stockDealDetail = stockDealDetail.data
        body.data = stockDealDetail.data
        ctx.body = body
    },
    /**
     * 查询自选股交易数据
     * @param {*} ctx 
     */
    async queryOptStockDealDetail(ctx) {
        ctx.session.refresh()
        if (!ctx.session.stockDealDetail) {
            const body = await userService.queryOptStockDealDetail(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.stockDealDetail }
        }
    },
    async queryStopProfitThreshold(ctx) {
        ctx.session.refresh()
        if (!ctx.session.profitThreshold) {
            const body = await userService.queryStopProfitThreshold(ctx.session.user)
            ctx.body = body
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.profitThreshold }
        }
    },
    async saveStopProfitThreshold(ctx) {
        ctx.session.refresh()
        let body = await userService.saveStopProfitThreshold(ctx.request.query, ctx.session.user)
        const profitThreshold = await userService.queryStopProfitThreshold(ctx.session.user)
        ctx.session.profitThreshold = profitThreshold.data
        body.data = profitThreshold.data
        ctx.body = body
    },
    /**
     * 存储可转债代码列表
     * @param {} ctx 
     */
    async saveOptCbs(ctx) {
        ctx.session.refresh()
        let body = await userService.saveOptCbs(ctx.request.query, ctx.session.user)
        if (body.code > 0) {
            const optCbs = await userService.queryOptCbs(ctx.session.user)
            ctx.session.optCbs = optCbs.data
            body.data = optCbs.data
        }
        ctx.body = body
    },
    /**
     * 查询可转债代码列表
     * @param {*} ctx 
     */
    async queryOptCbs(ctx) {
        ctx.session.refresh()
        if (!ctx.session.optCbs) {
            ctx.body = await userService.queryOptCbs(ctx.session.user)
        } else {
            ctx.body = { code: 1, msg: 'ok', data: ctx.session.optCbs }
        }
    }
}