const authService = require('../service/authService')
const config = require("../../config")
const tokenUtil = require('../../util/tokenUtil')
const dayjs = require('dayjs')
module.exports = {
    async loginByWeixin(ctx) {
        let body = {
            code: 0,
            msg: 'ok',
            data: null
        }
        const formObj = ctx.request.body
        const { errno, errmsg, data: userInfo } = await authService.wxLogin(formObj.code , formObj.userInfo)
        if (errno !== 0) {
            return {
                code: errno,
                msg: errmsg,
                data: null
            }
          }
        ctx.session.user = `wx${userInfo.openId}`
        ctx.session.userInfo = {
            'nickName': userInfo.nickName,
            'location': '',
            'register_time': parseInt(new Date().getTime() / 1000),
            'profile_image_url': userInfo.avatarUrl || '',
            'gender': userInfo.gender || 1, // 性别 0：未知、1：男、2：女
            'uid': `wx${userInfo.openId}`
        }
        await authService.saveUserInfo(ctx.session.userInfo)
        const token =  tokenUtil.createToken(ctx.session.user)
        body.data = {'token':token,'userInfo':ctx.session.userInfo}
        ctx.body = body
    }
}