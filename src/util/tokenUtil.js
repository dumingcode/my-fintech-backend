const config = require("../config")
const jwt = require('jsonwebtoken')
module.exports = {
    createToken(userInfo) {
        const token = jwt.sign(userInfo, config.secureConfig.wxAuth.tokenSecret)
        return token
      },
      async parse(token) {
        if (token) {
          try {
            return jwt.verify(token, config.secureConfig.wxAuth.tokenSecret)
          } catch (err) {
            return null
          }
        }
        return null
      },
      async getUserId(token) {
        if (!token) {
          return 0
        }
        const result = await this.parse(token)
        if (!result) {
          return 0
        }
        return result
      }

}