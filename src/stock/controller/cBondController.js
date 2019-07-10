const cBondService = require('../service/cBondService')
module.exports = {
    async queryCbondMa(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await cBondService.queryCbondMa(formData)
        if (!data) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }
}