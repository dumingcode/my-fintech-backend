const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const routers = require('./routes/index')
const Sentry = require('@sentry/node')
const session = require("koa-session2")
const Store = require("./auth/store/Store")
const config = require("./config")

const app = new Koa()
// error handler
onerror(app)
Sentry.init({ dsn: 'https://c3c61980cbaf419990217ab42643fe12@sentry.io/1420239' })


// authentication
require('./auth/strategy/weiboStrategy')

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
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
}))
// 拦截登陆 user开头的必须登陆
app.use(async (ctx, next) => {
    if (!ctx.session.user && ctx.path.includes('/user')) {
        ctx.status = 403
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
            message: err.message,
            data: null
        }
        ctx.app.emit('error', err, ctx)
    }
})

// routes
app.use(routers.routes()).use(routers.allowedMethods())



module.exports = app