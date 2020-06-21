const router = require('koa-router')()
const fundController = require('../controller/fundController')

const routers = router.post('fund/queryFundOutLineInfo.json', fundController.queryFundOutLineInfo)
.get('fund/queryFundExtraInfo.json', fundController.queryFundExtraInfo)
module.exports = routers