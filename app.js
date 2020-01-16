const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const routers = require('./src/routes')
const Sentry = require('@sentry/node')
const session = require("koa-session2")
const Store = require("./src/auth/store/Store")
const config = require("./src/config")
const koaSwagger = require('koa2-swagger-ui')
const tokenUtil = require('./src/util/tokenUtil')

const app = new Koa()
// error handler
onerror(app)
Sentry.init({ dsn: 'https://c3c61980cbaf419990217ab42643fe12@sentry.io/1420239' })


// authentication
require('./src/auth/strategy/weiboStrategy')
require('./src/auth/strategy/qqStrategy')
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(session({
    key: "SESSIONID",
    store: new Store(),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    domain: config.domain,
    path: '/',
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
}))
// 拦截登陆 user开头的必须登陆
// 添加微信小程序header处理逻辑
app.use(async (ctx, next) => {
    const token = ctx.request.header['x-gunxueqiu-token'] || ''
    if (token) {
        ctx.session.user = await tokenUtil.getUserId(token)
        console.log(`wx token ${token}->${ctx.session.user}`)
    }
    if (!ctx.session.user && ctx.path.includes('/user')) {
        ctx.status = 401
        ctx.body = {
            code: -1,
            msg: '用户未登陆',
            data: null
        }
        return
    }
    await next()
})




app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
    Sentry.captureException(err)
})

// 统一返回异常
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            code: -1,
            msg: err.message,
            data: null
        }
        ctx.app.emit('error', err, ctx)
    }
})

// routes
app.use(routers.index.routes()).use(routers.index.allowedMethods())
app.use(routers.stock.routes()).use(routers.stock.allowedMethods())
app.use(routers.auth.routes()).use(routers.auth.allowedMethods())
app.use(routers.house.routes()).use(routers.house.allowedMethods())

app.use(
    koaSwagger({
        routePrefix: '/swagger', // host at /swagger instead of default /docs
        swaggerOptions: {
            url: 'http://127.0.0.1:3000/swagger.json', // example path to json
        },
    }),
)



module.exports = app