const mongdb = require('../../db/mongdb')
const Joi = require('@hapi/joi')
const dayjs = require('dayjs')
const http = require('../../util/http')
const config = require("../../config")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = {
    /**
     * 查询自选可转债代码列表
     * @param {codes需要把全量的自选转债代码拼接起来发到后端} formData 
     * @param {*} user 
     */
    async saveUserInfo(formData) {
        const schema = Joi.object().keys({
            nickName: Joi.string(),
            profile_image_url: Joi.string().allow(''),
            uid: Joi.string().required(),
            location: Joi.string().allow(''),
            register_time: Joi.number().allow(''),
            gender: Joi.number().allow('')
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }

        formData.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
        await mongdb.updateOne('stock', 'userinfo', { '_id': `${formData.uid}` }, { 'user': formData }, true)
        return true
    },
    /**
     * 判断本地登陆用户是否能正常登陆
     * @param {*} formData 
     */
    async isLoginValid(formData) {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            pwd: Joi.string().required(),
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        const loginUser = await mongdb.queryDoc('stock', 'userinfo', { '_id': `local_${formData.username}`, 'pwd': formData.pwd })
        if (loginUser.length > 0) {
            return true
        }
        return false
    },
    async wxLogin(code, fullUserInfo) {
        try {
          // 获取 session
          const appid = config.wx.appId
          const appSecret = config.secureConfig.wxAuth.appSecret
          const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&js_code=${code}&secret=${appSecret}&appid=${appid}`
          const ret = await http.get(url)
          
          let sessionData = ret.data
          console.log(sessionData.session_key)
          console.log(sessionData.openid)
          if (!sessionData.openid) {
            return { errno: sessionData.errcode, errmsg: sessionData.errmsg, data: null }
          }
    
          // 验证用户信息完整性
          const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData.toString() + sessionData.session_key).digest('hex')
          if (fullUserInfo.signature !== sha1) {
            return { errno: 400, errmsg: `signature 校验不一致`, data: null }
          }
    
          // 解析用户数据
          const wechatUserInfo = await this.decryptUserInfoData(sessionData.session_key, fullUserInfo.encryptedData, fullUserInfo.iv)
          return wechatUserInfo
        } catch (e) {
          return { errno: 400, errmsg: '微信登录失败：' + e.message, data: null };
        }
      },
        /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = ''
    try {
      const _sessionKey = Buffer.from(sessionKey, 'base64')
      encryptedData = Buffer.from(encryptedData, 'base64')
      iv = Buffer.from(iv, 'base64');
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      const userInfo = JSON.parse(decoded)
      if (userInfo.watermark.appid !== config.wx.appId) {
        return { errno: 400, errmsg: 'watermark appid 错误', data: null }
      }

      // 解析后的数据格式
      // { openId: 'oILjs0JEDIZzaWVc_sJW2k3fhp1k',
      //   nickName: '明天',
      //   gender: 1,
      //   language: 'zh_CN',
      //   city: 'Shenzhen',
      //   province: 'Guangdong',
      //   country: 'China',
      //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/9Otwibfa5VXR0ntXdlX84dibbulWLJ0EiacHeAfT1ShG2A7LQa2unfbZVohsWQlmXbwQGM6NnhGFWicY5icdxFVdpLQ/132',
      //   watermark: { timestamp: 1542639764, appid: 'wx262f4ac3b1c477dd' } }
      return { errno: 0, errmsg: '', data: userInfo }
    } catch (err) {
      return { errno: 500, errmsg: '解析用户数据错误：' + err.message, data: null }
    }
  }
}