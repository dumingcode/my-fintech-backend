const houseService = require('../service/houseService')
const dayjs = require('dayjs')
const Joi = require('@hapi/joi')

module.exports = {
    /**
     * 查询北京二手房最近一周成交量数据
     * @param {startDate:起始时间,endDate:结束时间} ctx 
     */
    async queryRecenetWeekDealInfo(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const today = dayjs()
        formData.endDate = parseInt(today.format('YYYYMMDD'))
        formData.startDate = formData.endDate - 7
        let data = await houseService.queryRecenetWeekDealInfo(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    /**
     * 查询指定年份的数据量
     * @param {*} ctx 
     */
    async queryYearDealInfo(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const schema = Joi.object().keys({
            year: Joi.string().required()
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        let data = await houseService.queryYearDealInfo(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }
}