
const index = require('./index/routes')
const stock = require('./stock/routes')
const auth = require('./auth/routes')

const router = {
    index, stock, auth
}


module.exports = router