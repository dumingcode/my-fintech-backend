const router = require('koa-router')()
const cBondController = require('../controller/cBondController')

const routers = router.get('cBond/queryCbondMa.json', cBondController.queryCbondMa)
.get('cBond/queryRecentCbBasicInfo.json', cBondController.queryRecentCbBasicInfo)

module.exports = routers