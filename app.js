const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const routers = require('./routes/index')
const Router = require('koa-router')
const Sentry = require('@sentry/node')

// error handler
onerror(app)
Sentry.init({ dsn: 'https://c3c61980cbaf419990217ab42643fe12@sentry.io/1420239' })
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
app.use(routers.routes()).use(routers.allowedMethods())

//app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    Sentry.captureException(err)
    console.error('server error', err, ctx)
});

module.exports = app