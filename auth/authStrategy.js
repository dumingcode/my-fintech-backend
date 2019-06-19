const passport = require('koa-passport')
let OAuth2Strategy = require('passport-oauth2').Strategy
const config = require('../config/secureConfig')

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://api.weibo.com/oauth2/authorize',
    tokenURL: 'https://api.weibo.com/oauth2/access_token',
    clientID: config.wbAuth.appKey,
    clientSecret: config.wbAuth.appSecret,
    callbackURL: "https://gunxueqiu.site/api/auth/weibo/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, { accessToken, refreshToken, profile })
    }
))
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})