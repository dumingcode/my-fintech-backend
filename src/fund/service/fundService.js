const redisUtil = require('../../util/redisUtil')
const Joi = require('@hapi/joi')
const mongdb = require('../../db/mongdb')
const config = require('../../config')
const http = require('../../util/http')

module.exports = {

    /**
     * 从ES中查询fund概要数据支持分页
     * @param {*} formData 
     */
    async queryFundOutLineInfo(formData) {
        const schema = Joi.object().keys({
            queryParameters: Joi.array(),
            sortParameters: Joi.array(),
            from: Joi.number().required(),
            size: Joi.number().required()
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        const content = { 
            "query": 
                { "bool": 
                    { "must": formData.queryParameters,
                        // [   
                            // 数组内的数据由前端攒出来 后台就不用费力构建es查询参数
                            // { "range":{ "Bond": { "gt": "30", "lt": "60" } } }, 
                            // { "range": { "Stock": { "gt": "30" } } }, 
                            // { "range": { "2019": { "gt": "10" } } }
                            // { "range": { "2018": { "gt": "-5" } } },
                            // {"range": {"Rating3Year":{"gt":"3"}}},
                            // {"match": {"CategoryId.kerword":"PGSZF3"}},
                            // {"match": {"FundName":"华泰柏瑞行业领先混合"}},
                            // {"range": {"InceptionDate": {"gt": "2014-12-17"}}}
                        // ], 
                        "must_not": [], 
                        "should": [] 
                    } 
                }, 
            "from": formData.from, 
            "size": formData.size, 
            "sort": formData.sortParameters,
            // [
                // {"2018": "desc"}
            // ], 
            "aggs": {} 
        }
        try{
            const searchResult = await http.post(config.elasticsearch.url+'fund/_doc/_search', content, false)
            const searchResultJson = searchResult.data.hits
            const hits = searchResultJson.hits
            let res = []
            hits.forEach(hit => {
                res.push(hit['_source'])
            })
            return {total: searchResultJson.total,data: res}
        } catch(e){
            console.log(e)
            return {total: 0,data: []}
        }
    },
    async queryFundExtraInfo(formData) {
        const schema = Joi.object().keys({
            code: Joi.string().required(),
            PortfolioEffectiveDate: Joi.string().required()
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        try{
            const extraDataFunc =  redisUtil.redisGet(config.redisStoreKey.fund + ':' + formData.code)
            const portfolioDataFunc =  mongdb.queryDoc('stock', 'fund_portfolio', { '_id': `${formData.code}-${formData.PortfolioEffectiveDate}`})
            const extraData = await extraDataFunc
            const portfolioData = await portfolioDataFunc
            const extraDataJson = JSON.parse(extraData)
            return {
                'Management': extraDataJson && extraDataJson['Management'] ? extraDataJson['Management']: '',
                'Custodial': extraDataJson && extraDataJson['Custodial']  ? extraDataJson['Custodial']: '',
                'Redemption': extraDataJson && extraDataJson['Redemption']  ? extraDataJson['Redemption']: '',
                'LastRedemption': extraDataJson && extraDataJson['LastRedemption']  ? extraDataJson['LastRedemption']: '',
                'Profile': extraDataJson && extraDataJson['Profile']  ? extraDataJson['Profile']: '',
                'Managers': extraDataJson && extraDataJson['Managers']  ? extraDataJson['Managers']: '',
                'Top5BondHoldings': portfolioData.length > 0 && portfolioData[0]['Top5BondHoldings'] ? portfolioData[0]['Top5BondHoldings']:[],
                'Top10StockHoldings': portfolioData.length > 0 && portfolioData[0]['Top10StockHoldings'] ? portfolioData[0]['Top10StockHoldings']:[]
            }
        } catch(e){
            console.log(e)
            throw new Error(e)
        }
    }
}