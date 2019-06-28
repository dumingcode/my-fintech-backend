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
            profile_image_url: Joi.string(),
            uid: Joi.string().required(),
            location: Joi.string()
        })
        const result = Joi.validate(formData, schema)
        if (result.error !== null) {
            throw result.error
        }

        formData.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
        await mongdb.updateOne('stock', 'userinfo', { '_id': `${formData.uid}` }, { 'user': formData }, true)
        return true
    }


}