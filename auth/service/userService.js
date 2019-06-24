const mongdb = require('../../db/mongdb')


module.exports = {
    /**
     * 
     * @param {存储用户的自选股} formData 
     */
    async saveOptStocks(formData, user) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        if (!formData) { body.code = -1; body.msg = '参数为空'; return body }
        let codes = formData.codes
        if (!codes) { body.code = -1; body.msg = '自选股代码为空'; return body }
        await mongdb.updateOne('stock', 'optStock', { '_id': `${user}` }, { 'stock': codes }, upsertVal = true)
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
    }

    // 查询可转债数据信息
    // queryOptCb
    // saveOptCb

    // 操作网格数据信息
    // queryGridInfo
    // saveGridInfo 





}