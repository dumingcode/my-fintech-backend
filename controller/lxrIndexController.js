const lxrIndexService = require('../service/lxrIndexService')
module.exports = {
    async queryLxrIndexAllData(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let lxrData = await lxrIndexService.fetchLxrAllIndexData();
        let qmData = await lxrIndexService.fetchQmAllIndexData();
        let lxrJson = JSON.parse(lxrData)
        let qmJson = JSON.parse(qmData)
        let data = JSON.stringify(Object.assign(lxrJson, qmJson))


        if (data == null || data == undefined) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    async queryLxrIndexDealDate(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await lxrIndexService.queryLxrIndexDealDate();

        if (data == null || data == undefined) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    },
    async queryQmIndexDealDate(ctx) {
        let body = {
            code: 1,
            msg: 'ok',
            data: null
        }
        let data = await lxrIndexService.queryQmIndexDealDate();

        if (data == null || data == undefined) {
            body.code = -1
            body.msg = 'data is null'
        } else {
            body.data = data
        }
        ctx.body = body
    }

}