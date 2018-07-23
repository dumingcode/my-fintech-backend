const router = require('koa-router')()
const coverController = require('../controller/BigDataCoverController')
    // router.prefix('indexInvest')


const routers = router
    .post('bigdata/querySinaStock.json', coverController.querySinaStock)
    .get('bigdata/querySinaStockGet.json', coverController.querySinaStockGet)
    .get('bigdata/queryStockYearLowPrice.json', coverController.queryStockYearLowPrice)


module.exports = routers