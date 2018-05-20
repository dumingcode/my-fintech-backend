const redisUtil = require('../util/redisUtil')
const config = require('../config/config')
module.exports = {

    /**
     * 从redis中获取全部指数估值数据
     * @return 指数的pe百分位 pb百分位 pe pb的绝对值
     */
     fetchLxrAllIndexData() {
        let data =  redisUtil.redisGet(config.redisStoreKey.lxrIndexDataAll)
        return data
    }


}