const http = require('../util/http')
const config = require('../config/config')
const redisUtil = require('../util/redisUtil')

module.exports = {

    //查询一级行业明细
    async queryCitiFstIndustryInfo() {
        let lxrData = await redisUtil.redisSmembers(config.redisStoreKey.citic1V)
        return lxrData
    },
    //查询二级行业明细
    async queryCitiSndIndustryInfo() {
        let lxrData = await redisUtil.redisSmembers(config.redisStoreKey.citic2V)
        return lxrData
    }


}