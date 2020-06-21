const fundService = require('../service/fundService')
const dayjs = require('dayjs')
const Joi = require('@hapi/joi')

module.exports = {

    async queryFundOutLineInfo(ctx) {
        let formData = ctx.request.body
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        body.data = await fundService.queryFundOutLineInfo(formData)
        ctx.body = body
    },
    async queryFundExtraInfo(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        body.data = await fundService.queryFundExtraInfo(formData)
        ctx.body = body
    }

    
}