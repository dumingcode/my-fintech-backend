const router = require('koa-router')()
const userController = require('../controller/userController')

const routers =
    router.get('user/saveOptStocks.json', userController.saveOptStocks)
        .post('user/saveOptStocks.json', userController.saveOptStocks)
        .get('user/queryOptStocks.json', userController.queryOptStocks)



module.exports = routers