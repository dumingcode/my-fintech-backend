const router = require('koa-router')()

const lxrIndexRouter = require('./lxrIndexRouter')
const coverRouter = require('./BigDataCoverRouter')


router.use('/', lxrIndexRouter.routes(), lxrIndexRouter.allowedMethods())
router.use('/', coverRouter.routes(), coverRouter.allowedMethods())

module.exports = router