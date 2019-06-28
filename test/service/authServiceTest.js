const assert = require('assert')
const authService = require('../../auth/service/authService')
const expect = require('chai').expect

describe('authService Test', function () {
    describe('测试登陆成功后保存用户信息数据', function () {
        it('uid为空，预期结果：异常提醒无法正常存储用户数据', async function () {
            const userInfo = {
                'nickName': 'duming',
                'location': 'beijing',
                'profile_image_url': 'http://tp1.sinaimg.cn/1404376560/50/0/1',
                'uid': ``
            }
            try {
                await authService.saveUserInfo(userInfo)
            } catch (err) {
                expect(err['name']).to.be.equal('ValidationError')
            }
        })
    })
    describe('测试登陆成功后保存用户信息数据', function () {
        it('happy path，预期结果：成功将用户数据存储到mongodb中', async function () {
            const userInfo = {
                'nickName': 'duming',
                'location': 'beijing',
                'profile_image_url': 'http://tp1.sinaimg.cn/1404376560/50/0/1',
                'uid': `test`
            }
            assert.equal(await authService.saveUserInfo(userInfo), true)
        })
    })
})