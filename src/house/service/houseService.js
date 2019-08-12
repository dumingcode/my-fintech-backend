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
            let yearMonthStatc = {}
            for (let i = 1; i <= 12; i++) {
                if (i <= 9) {
                    yearMonthStatc[`${formData.year}0${i}`] = 0
                } else {
                    yearMonthStatc[`${formData.year}${i}`] = 0
                }
            }
            yearMonthStatc[`${formData.year}`] = 0
            formData.startDate = `${formData.year}0101`
            formData.endDate = `${formData.year}1231`
            const dealData = await this.queryHouseDailyInfo(formData)
            dealData.forEach((val) => {
                const intData = parseInt(val['date'])
                const monthData =
                    parseInt(intData % 10000 / 100)
                if (monthData <= 9) {
                    yearMonthStatc[`${formData.year}0${monthData}`] += val['houseNum']
                } else {
                    yearMonthStatc[`${formData.year}${monthData}`] += val['houseNum']
                }
                yearMonthStatc[`${formData.year}`] += val['houseNum']
            })
            console.log(yearMonthStatc)
            await redisUtil.redisSetEx(`${houseRedisKey}_year_${formData.year}`, JSON.stringify(yearMonthStatc), 'EX', 7200)
            return JSON.stringify(yearMonthStatc)
        }
        return yearData
    }





}