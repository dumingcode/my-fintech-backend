const router = require('koa-router')()
const cBondController = require('../controller/cBondController')

const routers = router.get('cBond/queryCbondMa.json', cBondController.queryCbondMa)
.get('cBond/queryRecentCbBasicInfo.json', cBondController.queryRecentCbBasicInfo)
.post('cBond/searchCb.json', cBondController.searchCb)

module.exports = routers