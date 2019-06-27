const router = require('koa-router')()
const userController = require('../controller/userController')
const routers =
    router.post('user/saveOptStocks.json', userController.saveOptStocks)
        .get('user/queryOptStocks.json', userController.queryOptStocks)
        .post('user/saveOptGridInfo.json', userController.saveOptGridInfo)
        .get('user/queryOptGridInfo.json', userController.queryOptGridInfo)
        .get('user/saveOptGridInfo.json', userController.saveOptGridInfo)
        .get('user/saveOptStocks.json', userController.saveOptStocks)
        .get('user/saveOptStockDealDetail.json', userController.saveOptStockDealDetail)
        .post('user/saveOptStockDealDetail.json', userController.saveOptStockDealDetail)
        .get('user/queryOptStockDealDetail.json', userController.queryOptStockDealDetail)
        .get('user/saveStopProfitThreshold.json', userController.saveStopProfitThreshold)
        .post('user/saveStopProfitThreshold.json', userController.saveStopProfitThreshold)
        .get('user/queryStopProfitThreshold.json', userController.queryStopProfitThreshold)
        .post('user/saveOptCbs.json', userController.saveOptCbs)
        .get('user/queryOptCbs.json', userController.queryOptCbs)
        .get('user/saveOptCbs.json', userController.saveOptCbs)



module.exports = routers