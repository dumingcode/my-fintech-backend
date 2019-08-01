const config = require('../../config')
const lpassport = require('l-passport')



lpassport.initialize({
    provider: 'qq',
    appId: config.secureConfig.qqAuth.appKey,
    appSecret: config.secureConfig.qqAuth.appSecret,
    redirect: config.secureConfig.qqAuth.callbackUrl,
    state: '',
    scope: 'email'
})

