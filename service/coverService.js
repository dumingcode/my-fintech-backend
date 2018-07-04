const http = require('../util/http')
const config = require('../config/config')
module.exports = {

    /**
     * 从redis中获取全部指数估值数据
     * @return 指数的pe百分位 pb百分位 pe pb的绝对值
     */
    async fetchSinaStock(formData) {
        console.log(formData)
        let codes = formData.codes
        let codeArr = codes.split(',')
        let param = ''
        codeArr.forEach(code => {
            if (code.startsWith('6') && code.length == 6) {
                param += `sh${code},`
            } else if ((code.startsWith('0') || code.startsWith('3')) && code.length == 6) {
                param += `sz${code},`
            }
        });
        param = param.replace(/(.*)[,]$/, '$1');
        let lxrData = await http.get(`http://hq.sinajs.cn/list=${param}`)
        console.log(lxrData)
        return lxrData
    }


}