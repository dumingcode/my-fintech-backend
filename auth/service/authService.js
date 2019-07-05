const mongdb = require('../../db/mongdb')
const Joi = require('@hapi/joi')
const dayjs = require('dayjs')

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
            location: Joi.string().allow('')
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
            password: Joi.string().required(),
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }
        const loginUser = await mongdb.queryDoc('stock', 'userinfo', { '_id': `local_${formData.username}`, 'pwd': formData.password })
        if (loginUser.length > 0) {
            return true
        }
        return false
    }


}