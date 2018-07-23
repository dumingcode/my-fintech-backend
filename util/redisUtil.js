var Redis = require('ioredis')
const config = require('../config/config')
const redisConfig = config.redis

module.exports = {
    async redisHGet(key, field) {
        let redis = new Redis(redisConfig)
        let authPromise = await redis.auth(redisConfig.password)
        let result = await redis.hget(key, field)
        return result
    },
    async redisHGet(key, field) {
        let redis = new Redis(redisConfig)
        let authPromise = await redis.auth(redisConfig.password)
        let result = await redis.hget(key, field)
        return result
    },
    async redisSet(key, value) {
        let redis = new Redis(redisConfig)
        let authPromise = await redis.auth(redisConfig.password)
        let result = await redis.set(key, value)
        return result
    },
    async redisGet(key) {
        let redis = new Redis(redisConfig)
        let authPromise = await redis.auth(redisConfig.password)
        let result = await redis.get(key)
        return result
    }
}