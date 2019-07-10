const config = require('../../config')
const lpassport = require('l-passport')



lpassport.initialize({
    provider: 'weibo',
    appId: config.secureConfig.wbAuth.appKey,
    appSecret: config.secureConfig.wbAuth.appSecret,
    redirect: config.secureConfig.wbAuth.callbackUrl,
    state: '',
    scope: 'email'
})

