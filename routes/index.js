const router = require('koa-router')()

const lxrIndexRouter = require('./lxrIndexRouter')
const coverRouter = require('./BigDataCoverRouter')
const quantRouter = require('./quantRouter')
const cBondRouter = require('./cBondRouter')
const authRouter = require('../auth/router/authRouter')


router.use('/', lxrIndexRouter.routes(), lxrIndexRouter.allowedMethods())
router.use('/', coverRouter.routes(), coverRouter.allowedMethods())
router.use('/', quantRouter.routes(), quantRouter.allowedMethods())
router.use('/', cBondRouter.routes(), cBondRouter.allowedMethods())
router.use('/', authRouter.routes(), authRouter.allowedMethods())


module.exports = router