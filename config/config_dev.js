const secureConfig = require('./secureConfig_dev')
module.exports = {
    redis: {
        port: 6379,
        host: '127.0.0.1',
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
        url: `mongodb://127.0.0.1:27017/stock`
    },
    'secureConfig': secureConfig,
    domain: '127.0.0.1'
}

