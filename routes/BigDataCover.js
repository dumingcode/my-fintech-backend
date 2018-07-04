const router = require('koa-router')()
const coverController = require('../controller/BigDataCoverController')
    // router.prefix('indexInvest')


const routers = router
    .post('bigdata/querySinaStock.json', coverController.querySinaStock)

module.exports = routers