const lxrIndexService = require('../service/lxrIndexService')
module.exports = {
    async queryLxrIndexAllData(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        try {
            let data = await lxrIndexService.fetchLxrAllIndexData();
           
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