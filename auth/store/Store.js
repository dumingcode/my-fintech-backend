const redisUtil = require('../../util/redisUtil')
const { Store } = require("koa-session2")

class RedisStore extends Store {
    constructor() {
        super()
    }

    async get(sid, ctx) {
        let data = await redisUtil.redisGet(`SESSION:${sid}`)
        return JSON.parse(data)
    }

    async set(session, { sid = this.getID(24), maxAge = 1000 * 60 * 60 * 24 * 7 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await redisUtil.redisSetEx(`SESSION:${sid}`, JSON.stringify(session), 'EX', 60 * 60 * 24 * 7)
        } catch (e) { }
        return sid
    }

    async destroy(sid, ctx) {
        return await redisUtil.redisDel(`SESSION:${sid}`)
    }
}

module.exports = RedisStore