const router = require('koa-router')()
const stockQuantController = require('../controller/stockQuantController')

const routers = router.get('stockQuant/queryStockAlphaBeta.json', stockQuantController.queryStockAlphaBeta)
module.exports = routers