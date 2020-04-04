/**
 * 个股量化计算接口
 */
const stockQuantServive = require('../service/stockQuantServive')
module.exports = {
    async queryStockAlphaBeta(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await stockQuantServive.queryStockAlphaBeta(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    async searchStock(ctx) {
        let formData = ctx.request.body
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const data = await stockQuantServive.searchStock(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }

}