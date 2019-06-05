var Redis = require('ioredis')
const config = require('../config/config')
const redisConfig = config.redis

module.exports = {
    async redisHGet(key, field) {
        let redis = new Redis(redisConfig)
        let result = await redis.hget(key, field)
        await redis.disconnect()
        return result
    },
    async redisSet(key, value) {
        let redis = new Redis(redisConfig)
        let result = await redis.set(key, value)
        await redis.disconnect()
        return result
    },
    async redisGet(key) {
        let redis = new Redis(redisConfig)
        let result = await redis.get(key)
        await redis.disconnect()
        return result
    },
    redisSmembers(key) {
        let redis = new Redis(redisConfig)
        return redis.smembers(key).then((val) => {
            return val
        }).then(()=>{
            redis.disconnect()
        }).catch((err) => {
            console.log(err)
            return null
        })
    }
}