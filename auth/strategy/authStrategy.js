const config = require('../../config/secureConfig')
const lpassport = require('l-passport')



lpassport.initialize({
    provider: 'weibo',
    appId: config.wbAuth.appKey,
    appSecret: config.wbAuth.appSecret,
    redirect: config.wbAuth.callbackUrl,
    state: '',
    scope: 'email'
})

