const http = require('../util/http')
const config = require('../config/config')
const iconv = require('iconv-lite');

function isIntNum(val) {
    var regPos = /^\d+$/; // 非负整数
    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}
module.exports = {

    /**
     * 从redis中获取全部指数估值数据
     * @return 指数的pe百分位 pb百分位 pe pb的绝对值
     */
    async fetchSinaStock(formData) {
        let codes = formData.codes
        codes = codes.replace(/，/g, ",")
        let codeArr = codes.split(',')
        let param = ''
        codeArr.forEach(code => {
            if (isIntNum(code) && code.startsWith('6') && code.length == 6) {
                param += `sh${code},`
            } else if (isIntNum(code) && (code.startsWith('0') || code.startsWith('3')) && code.length == 6) {
                param += `sz${code},`
            }
        });
        if (!param) {
            throw new Error("输入股票代码错误!");
        }
        param = param.replace(/(.*)[,]$/, '$1');
        let lxrData = await http.get(`http://hq.sinajs.cn/list=${param}`, _responseType = 'arraybuffer')
        const buf = new Buffer(lxrData.data, 'binary')
        let retData = iconv.decode(buf, 'GBK')
        let retArr = retData.split(';')
        let jsonArr = []
        retArr.forEach(data => {
                let arr = data.split('=')
                let codeStr = arr[0]


                if (arr[1]) {
                    let str = arr[1].substr(1)
                    let ret = {}
                    ret['name'] = str.split(',')[0]
                    ret['code'] = codeStr.substr(codeStr.length - 6)
                    ret['open'] = parseFloat(str.split(',')[1])
                    ret['price'] = parseFloat(str.split(',')[3])
                    ret['close'] = parseFloat(str.split(',')[3])
                    ret['high'] = parseFloat(str.split(',')[4])
                    ret['low'] = parseFloat(str.split(',')[5])
                    ret['time'] = `${str.split(',')[30]} ${str.split(',')[31]}`
                    jsonArr.push(ret)
                }
            })
            // console.log(jsonArr)

        return jsonArr
    }


}