const router = require('koa-router')()
const userController = require('../controller/userController')
const routers =
    router.post('user/saveOptStocks.json', userController.saveOptStocks)
        .get('user/queryOptStocks.json', userController.queryOptStocks)
        .post('user/saveOptGridInfo.json', userController.saveOptGridInfo)
        .get('user/queryOptGridInfo.json', userController.queryOptGridInfo)
        .post('user/saveOptStockDealDetail.json', userController.saveOptStockDealDetail)
        .get('user/queryOptStockDealDetail.json', userController.queryOptStockDealDetail)
        .post('user/saveStopProfitThreshold.json', userController.saveStopProfitThreshold)
        .get('user/queryStopProfitThreshold.json', userController.queryStopProfitThreshold)
        .post('user/saveOptCbs.json', userController.saveOptCbs)
        .get('user/queryOptCbs.json', userController.queryOptCbs)
        .get('user/queryUserInfo.json', userController.queryUserInfo)
        .get('user/logout.json', userController.logout)
        .delete('user/delOptStockDealDetail.json', userController.delOptStockDealDetail)



module.exports = routers