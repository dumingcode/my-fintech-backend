const config = require('../config')
const redisUtil = require('../util/redisUtil')
module.exports = {

    /**
     * 从redis中获取全部指数估值数据
     * @return 指数的pe百分位 pb百分位 pe pb的绝对值
     */
    fetchLxrAllIndexData() {
        let lxrData = redisUtil.redisGet(config.redisStoreKey.lxrIndexDataAll)
        return lxrData
    },
    fetchQmAllIndexData() {
        let lxrData = redisUtil.redisGet(config.redisStoreKey.qmIndexDataAll)
        return lxrData
    },
    queryLxrIndexDealDate() {
        let data = redisUtil.redisGet(config.redisStoreKey.lxrIndexDealDateKey)
        return data
    },
    queryQmIndexDealDate() {
        let data = redisUtil.redisGet(config.redisStoreKey.qmIndexDealDateKey)
        return data
    }


}