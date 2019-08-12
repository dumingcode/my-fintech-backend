const router = require('koa-router')()
const houseController = require('../controller/houseController')

const routers = router.get('house/queryRecenetWeekDealInfo.json', houseController.queryRecenetWeekDealInfo)
    .get('house/queryYearDealInfo.json', houseController.queryYearDealInfo)
module.exports = routers