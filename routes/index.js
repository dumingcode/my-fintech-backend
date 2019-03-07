const router = require('koa-router')()

const lxrIndexRouter = require('./lxrIndexRouter')
const coverRouter = require('./BigDataCoverRouter')
const quantRouter = require('./quantRouter')
const cBondRouter = require('./cBondRouter')


router.use('/', lxrIndexRouter.routes(), lxrIndexRouter.allowedMethods())
router.use('/', coverRouter.routes(), coverRouter.allowedMethods())
router.use('/', quantRouter.routes(), quantRouter.allowedMethods())
router.use('/', cBondRouter.routes(), cBondRouter.allowedMethods())


module.exports = router