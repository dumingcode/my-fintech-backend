const router = require('koa-router')()

const lxrIndexRouter = require('./lxrIndexRouter')
router.use('/', lxrIndexRouter.routes(), lxrIndexRouter.allowedMethods())


module.exports = router