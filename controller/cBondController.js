const cBondService = require('../service/cBondService')
module.exports = {
    async queryCbondMa(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        try {

            let data = await cBondService.queryCbondMa(formData)
            if (data == null || data == undefined) {
                body.code = -1
                body.msg = 'data is null'
            } else {
                body.data = data
            }
            ctx.body = body

        } catch (error) {
            console.log(error)
            body.code = -1
            body.msg = error.toString()
            ctx.body = body
        }
    }


}