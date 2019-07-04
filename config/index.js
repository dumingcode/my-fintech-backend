const config_dev = require('./config_dev')
const config_prod = require('./config_prod')

function config() {
    const env = String(process.env.NODE_ENV)
    console.log(env)
    if (env.includes('production')) {
        return config_prod
    } else {
        return config_dev

    }
}
module.exports = config()