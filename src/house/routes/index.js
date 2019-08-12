const router = require('koa-router')()

const houseRouter = require('./houseRouter')
router.use('/', houseRouter.routes(), houseRouter.allowedMethods())

module.exports = router