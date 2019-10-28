const router = require('koa-router')()
const coverController = require('../controller/BigDataCoverController')
const indController = require('../controller/industryController')
    // router.prefix('indexInvest')


const routers = router
    .post('bigdata/querySinaStock.json', coverController.querySinaStock)
    .get('bigdata/querySinaStockGet.json', coverController.querySinaStockGet)
    .get('bigdata/queryStockYearLowPrice.json', coverController.queryStockYearLowPrice)
    .get('bigdata/queryCitiFstIndustryInfo.json', indController.queryCitiFstIndustryInfo)
    .get('bigdata/queryCitiSndIndustryInfo.json', indController.queryCitiSndIndustryInfo)
    .get('bigdata/queryStockIndInfo.json', coverController.queryStockYearLowPrice)
    .get('bigdata/queryGzSndIndustryInfo.json', indController.queryGzSndIndustryInfo)
    .get('bigdata/queryGzTrdIndustryInfo.json', indController.queryGzTrdIndustryInfo)


module.exports = routers