const secureConfig = require('./secureConfig_prod')
module.exports = {

    redis: {
        port: 6379,
        host: '172.17.188.91',
        keyPrefix: 'myfintech-',
        password: secureConfig.redisPasswd
    },
    redisStoreKey: {
        lxrIndexKey: 'lxrIndex',
        lxrIndexDealDateKey: 'lxrIndexDealDate',
        lxrIndexDataAll: 'lxrIndexDataAll',
        qmIndexDealDateKey: 'qmIndexDealDate',
        qmIndexDataAll: 'qmIndexDataAll',
        yearLowStockSet: 'xueQiuStockSet',
        citic1V: 'citic1V',
        citic2V: 'citic2V'
    },
    logConfig: {
        name: 'myfintech-www'
    },
    mongoDb: {
        url: `mongodb://stock:${secureConfig.redisPasswd}@172.17.188.91:27017/stock`
    },
    'secureConfig': secureConfig,
    domain: 'gunxueqiu.site',
    homePage: 'https://gunxueqiu.site/#/home'
}
