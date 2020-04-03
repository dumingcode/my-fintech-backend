const cBondService = require('../service/cBondService')
module.exports = {
    async queryCbondMa(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await cBondService.queryCbondMa(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    // 查询最新x天的转债数据
    async queryRecentCbBasicInfo(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        
        let data = await cBondService.queryRecentCbBasicInfo(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    async searchCb(ctx) {
        let formData = ctx.request.body
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const data = await cBondService.searchCb(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }
}