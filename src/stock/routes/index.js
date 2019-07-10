const router = require('koa-router')()

const bigDataCoverRouter = require('./BigDataCoverRouter')
const cBondRouter = require('./cBondRouter')
const quantRouter = require('./quantRouter')
router.use('/', bigDataCoverRouter.routes(), bigDataCoverRouter.allowedMethods())
router.use('/', cBondRouter.routes(), cBondRouter.allowedMethods())
router.use('/', quantRouter.routes(), quantRouter.allowedMethods())


module.exports = router