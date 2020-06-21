
const index = require('./index/routes')
const stock = require('./stock/routes')
const auth = require('./auth/routes')
const house = require('./house/routes')
const fund = require('./fund/routes')

const router = {
    index, stock, auth, house, fund
}


module.exports = router