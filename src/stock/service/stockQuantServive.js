/**
 * 个股量化相关服务
 */
const config = require('../../config')
const redisUtil = require('../../util/redisUtil')

module.exports = {

    /**
     * 查询股票的alpha beta值
     * @param {股票代码组合} formData 
     */
    async queryStockAlphaBeta(formData) {
        if (!formData) { return null }
        console.log(formData)
        let codes = formData.codes
        let type = formData.type || 'all'
        if (!codes) { return null }
        let stocks = codes.split(',')
        let promiseArr = []
        for (let i = 0; i < stocks.length; i++) {
            let val = await redisUtil.redisHGet(config.redisStoreKey.yearLowStockSet, stocks[i])
            promiseArr.push(val)
        }
        let alphaBetaArr = promiseArr.filter(value => { return value != null }).map((alphaBetaJsonStr) => {
            let alphaBeta = JSON.parse(alphaBetaJsonStr)
            let retObj = {
                'code': alphaBeta['code'],
                'name': alphaBeta['name'],
                'alphaBetaGenDate': alphaBeta['alphaBetaGenDate']
            }
            if (type == '720') {
                retObj['alphaBeta2Year'] = alphaBeta['alphaBeta2Year']
            } else if (type == '180') {
                retObj['alphaBeta180day'] = alphaBeta['alphaBeta180day']
            } else if (type == '90') {
                retObj['alphaBeta90day'] = alphaBeta['alphaBeta90day']
            } else if (type == '365') {
                retObj['alphaBeta1Year'] = alphaBeta['alphaBeta1Year']
            } else {
                retObj['alphaBeta2Year'] = alphaBeta['alphaBeta2Year']
                retObj['alphaBeta180day'] = alphaBeta['alphaBeta180day']
                retObj['alphaBeta90day'] = alphaBeta['alphaBeta90day']
                retObj['alphaBeta1Year'] = alphaBeta['alphaBeta1Year']
            }
            return retObj
        })
        return alphaBetaArr
    }


}