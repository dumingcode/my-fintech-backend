const coverService = require('../service/coverService')
module.exports = {
    async querySinaStock(ctx) {
        let formData = ctx.request.body
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        try {

            let data = await coverService.fetchSinaStock(formData)
            console.log(data)



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
            body.msg = 'exception'
            ctx.body = body
        }
    },
    async querySinaStockGet(ctx) {
        let formData = ctx.request.query
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        try {

            let data = await coverService.fetchSinaStock(formData)
            console.log(data)



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
            body.msg = 'exception'
            ctx.body = body
        }
    }


}