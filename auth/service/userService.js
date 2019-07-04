const mongdb = require('../../db/mongdb')
const Joi = require('@hapi/joi')

module.exports = {
    /**
     * 存储用户的自选股
     * @param {codes需要把全量的自选股代码拼接起来发到后端} formData 
     */
    async saveOptStocks(formData, user) {
        const schema = Joi.object().keys({
            codes: Joi.string().regex(/^([0-9]{6},?)+$/).regex(/[^,]$/).required()
        })
        const result = Joi.validate({ codes: formData.codes }, schema)
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        if (result.error !== null) {
            throw result.error
        }
        const codes = formData.codes
        await mongdb.updateOne('stock', 'optStock', { '_id': `${user}` }, { 'stock': codes }, true)
        return body
    },
    /**
     * 
     * @param {查询用户自选股} user 
     */
    async queryOptStocks(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const optStock = await mongdb.queryDoc('stock', 'optStock', { '_id': `${user}` })
        body.data = optStock
        return body
    },
    /**
     * 保存自选股交易数据-已补仓次数、已止盈次数、成本价格
     * @param {*} formData 
     * @param {*} user 
     */
    async saveOptStockDealDetail(formData, user) {
        const schema = Joi.object().keys({
            code: Joi.string().regex(/^([0-9]{6}){1}$/).required(),
            coverTime: Joi.number().integer().min(0),
            profitTime: Joi.number().integer().min(0),
            memo: Joi.string().allow('')
        }).or('coverTime', 'profitTime')
        const result = Joi.validate(formData, schema)

        if (result.error !== null) {
            throw result.error
        }

        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const code = formData.code
        // 此处应该先查询mongodb中已经保存的数据
        const optStockDeal = await mongdb.queryDoc('stock', 'optStockDeal', { '_id': `${user}-${code}` })
        let dealDetail = {}
        if (optStockDeal.length > 0) {
            dealDetail = optStockDeal[0]
        }

        dealDetail.user = user
        dealDetail.code = formData.code
        if (formData.coverTime) {
            dealDetail.coverTime = formData.coverTime
        }
        if (formData.profitTime) {
            dealDetail.profitTime = formData.profitTime
        }
        if (formData.cost) {
            dealDetail.cost = formData.cost
        }
        if (formData.memo) {
            dealDetail.memo = formData.memo
        }

        await mongdb.updateOne('stock', 'optStockDeal', { '_id': `${user}-${code}` }, dealDetail, true)
        body.data = dealDetail
        return body
    },
    async delOptStockDealDetail(formData, user) {
        const schema = Joi.object().keys({
            code: Joi.string().regex(/^([0-9]{6}){1}$/).required()
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const code = formData.code
        await mongdb.deleteOne('stock', 'optStockDeal', { '_id': `${user}-${code}` })
        body.data = body
        return body
    },
    async queryOptStockDealDetail(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const optStock = await mongdb.queryDoc('stock', 'optStockDeal', { 'user': `${user}` })
        body.data = optStock
        return body
    },
    /**
     * 存储用户网格数据信息
     * @param {*} formData 
     * @param {*} user 
     */
    async saveOptGridInfo(formData, user) {
        const schema = Joi.object().keys({
            code: Joi.string().regex(/^([0-9]{6}){1}$/).required(),
            gap: Joi.number().min(0).max(100),
            low: Joi.number().min(0)
        })
        const result = Joi.validate(formData, schema)

        if (result.error !== null) {
            throw result.error
        }

        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let optGrid = {}
        const grid = await mongdb.queryDoc('stock', 'optGrid', { '_id': `${user}-${formData.code}` })
        if (grid.length > 0) {
            optGrid = grid[0]
        }
        optGrid.code = formData.code
        if (!formData.user) {
            optGrid.user = user
        }
        if (formData.low) {
            optGrid.low = formData.low
        }
        if (formData.gap) {
            optGrid.gap = formData.gap
        }
        await mongdb.updateOne('stock', 'optGrid', { '_id': `${user}-${formData.code}` }, optGrid, true)
        return body
    },
    /**
     * 查询用户网格信息
     * @param {*} user 
     */
    async queryOptGridInfo(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const optGrid = await mongdb.queryDoc('stock', 'optGrid', { 'user': `${user}` })
        body.data = optGrid
        return body
    },
    /**
     * 查询首次止盈阈值50%或者100%
     * @param {*} user 
     */
    async queryStopProfitThreshold(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const threshold = await mongdb.queryDoc('stock', 'stopProfitThreshold', { '_id': `${user}` })
        body.data = threshold
        return body
    },
    async saveStopProfitThreshold(formData, user) {
        const schema = Joi.object().keys({
            threshold: Joi.number().min(0).max(100)
        })
        const result = Joi.validate(formData, schema)

        if (result.error !== null) {
            throw result.error
        }

        await mongdb.updateOne('stock', 'stopProfitThreshold', { '_id': `${user}` }, { 'threshold': formData.threshold }, true)
        return body
    },
    /**
     * 查询自选可转债代码列表
     * @param {codes需要把全量的自选转债代码拼接起来发到后端} formData 
     * @param {*} user 
     */
    async saveOptCbs(formData, user) {
        const schema = Joi.object().keys({
            codes: Joi.string().regex(/^([0-9]{6},?)+$/).regex(/[^,]$/).required()
        })
        const result = Joi.validate({ codes: formData.codes }, schema)
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        if (result.error !== null) {
            throw result.error
        }
        const codes = formData.codes
        await mongdb.updateOne('stock', 'optCb', { '_id': `${user}` }, { 'cb': codes }, true)
        return body
    },
    /**
     * 
     * @param {查询用户自选转债} user 
     */
    async queryOptCbs(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const optCb = await mongdb.queryDoc('stock', 'optCb', { '_id': `${user}` })
        body.data = optCb
        return body
    },
    async queryUserInfo(user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        const userinfo = await mongdb.queryDoc('stock', 'userinfo', { '_id': `${user}` })
        body.data = userinfo
        return body
    },




}