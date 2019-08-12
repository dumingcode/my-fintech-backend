const redisUtil = require('../../util/redisUtil')
const Joi = require('@hapi/joi')
const mongdb = require('../../db/mongdb')
const config = require('../../config')

module.exports = {

    /**
     * 查询其实日期和结束日期之间的二手房成交房源数量
     * @param {} formData 
     */
    async queryHouseDailyInfo(formData) {
        const dealData = await mongdb.queryDoc('stock', 'house', {
            '_id': { $gte: parseInt(formData.startDate), $lte: parseInt(formData.endDate) }
        })
        return dealData
    },
    /**
     * 查询最近一周二手房交易数据
     * @param {} formData 
     */
    async queryRecenetWeekDealInfo(formData) {
        const houseRedisKey = config.redisStoreKey.houseDeal
        const weekData = await redisUtil.redisGet(`${houseRedisKey}_week`)
        if (!weekData) {
            const dealData = await this.queryHouseDailyInfo(formData)
            await redisUtil.redisSetEx(`${houseRedisKey}_week`, JSON.stringify(dealData), 'EX', 3600)
            return JSON.stringify(dealData)
        }
        return weekData
    },
    async queryYearDealInfo(formData) {
        const houseRedisKey = config.redisStoreKey.houseDeal
        const yearData = await redisUtil.redisGet(`${houseRedisKey}_year_${formData.year}`)
        if (!yearData) {
            formData.startDate = `${formData.year}0101`
            formData.endDate = `${formData.year}1231`
            const dealData = await this.queryHouseDailyInfo(formData)
            await redisUtil.redisSetEx(`${houseRedisKey}_year_${formData.year}`, JSON.stringify(dealData), 'EX', 7200)
            return JSON.stringify(dealData)
        }
        return yearData
    }





}