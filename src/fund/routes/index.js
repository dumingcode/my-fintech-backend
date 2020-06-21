const router = require('koa-router')()

const fundRouter = require('./fundRouter')
router.use('/', fundRouter.routes(), fundRouter.allowedMethods())

module.exports = router