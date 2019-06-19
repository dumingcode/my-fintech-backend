const passport = require('koa-passport')
let OAuth2Strategy = require('passport-oauth2').Strategy
const config = require('../config/secureConfig')
const lpassport = require('l-passport')



lpassport.initialize({
    provider: 'weibo',
    appId: config.wbAuth.appKey,
    appSecret: config.wbAuth.appSecret,
    redirect: config.wbAuth.callbackUrl,
    state: '',
    scope: 'email'
})



passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})