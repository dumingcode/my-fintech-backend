const router = require('koa-router')()
const lxrIndexController = require('../controller/lxrIndexController')
    // router.prefix('indexInvest')


const routers = router
    .get('indexInvest/queryLxrIndexAllData.json', lxrIndexController.queryLxrIndexAllData)
    .get('indexInvest/queryLxrIndexDealDate.json', lxrIndexController.queryLxrIndexDealDate)
    .get('indexInvest/queryQmIndexDealDate.json', lxrIndexController.queryQmIndexDealDate)

module.exports = routers