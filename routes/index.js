const router = require('koa-router')()

const lxrIndexRouter = require('./lxrIndexRouter')
const coverRouter = require('./BigDataCoverRouter')
const quantRouter = require('./quantRouter')


router.use('/', lxrIndexRouter.routes(), lxrIndexRouter.allowedMethods())
router.use('/', coverRouter.routes(), coverRouter.allowedMethods())
router.use('/', quantRouter.routes(), quantRouter.allowedMethods())


module.exports = router