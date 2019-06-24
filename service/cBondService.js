const config = require('../config')
const redisUtil = require('../util/redisUtil')

function isIntNum(val) {
    var regPos = /^\d+$/; // 非负整数
    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}
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
                let json = JSON.parse(jsonStr)
                let retObj = {
                    'code': json['code'],
                    'ma20GenDate': json['ma20GenDate'],
                    'ma20': json['ma20'],
                    'ma10': json['ma10'],
                    'ma5': json['ma5']
                }
                console.log(retObj)
                return JSON.stringify(retObj)
            })
        })

    }




}