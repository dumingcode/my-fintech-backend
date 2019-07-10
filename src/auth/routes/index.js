const router = require('koa-router')()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
router.use('/', authRouter.routes(), authRouter.allowedMethods())
router.use('/', userRouter.routes(), userRouter.allowedMethods())


module.exports = router