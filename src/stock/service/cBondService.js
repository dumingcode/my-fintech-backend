const config = require('../../config')
const redisUtil = require('../../util/redisUtil')
const mongdb = require('../../db/mongdb')
// const config = require('../../config')
const Joi = require('@hapi/joi')
const dayjs = require('dayjs')

module.exports = {
    //查询可转债ma5 10 20数据 codes样例 600030,600001
    async queryCbondMa(formData) {
        if (!formData) { return null }
        let codes = formData.codes
        if (!codes) { return null }
        let stocks = codes.split(',')
        let promiseArr = []
        for (let i = 0; i < stocks.length; i++) {
            promiseArr.push(redisUtil.redisHGet(config.redisStoreKey.yearLowStockSet, stocks[i]))
        }
        return Promise.all(promiseArr).then(function (values) {
            
            return values.filter(value => { return value != null }).map((jsonStr) => {
                console.log(jsonStr)
                let json = JSON.parse(jsonStr)
                let retObj = {
                    'code': json['code'],
                    'ma20GenDate': json['ma20GenDate'],
                    'ma20': json['ma20'],
                    'ma10': json['ma10'],
                    'ma5': json['ma5'],
                    'atr': json['atr']
                }
                console.log(retObj)
                return JSON.stringify(retObj)
            })
        })

    },
    async queryRecentCbBasicInfo(formData) {
        const schema = Joi.object().keys({
            diff: Joi.number().integer().min(0).max(50)
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        const today = dayjs()
        formData.endDate = parseInt(today.format('YYYYMMDD'))
        formData.startDate = parseInt(today.subtract(formData.diff, 'day').format('YYYYMMDD'))
        const redisKey = `queryRecentCbBasicInfo_${formData.startDate}_${formData.endDate}`
        const weekData = await redisUtil.redisGet(redisKey)
        if (!weekData) {
            const dealData = await mongdb.queryDoc('stock', 'cbBasicInfo', {
                'LISTDATE': { $gte: parseInt(formData.startDate), $lte: parseInt(formData.endDate) }
            })
            await redisUtil.redisSetEx(redisKey, JSON.stringify(dealData), 'EX', 3600)
            return JSON.stringify(dealData)
        }
        return weekData
    }




}