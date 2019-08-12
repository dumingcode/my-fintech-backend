
const index = require('./index/routes')
const stock = require('./stock/routes')
const auth = require('./auth/routes')
const house = require('./house/routes')

const router = {
    index, stock, auth, house
}


module.exports = router