const supertest = require('supertest')
const assert = require('assert')
const app = require('../../app')
const expect = require('chai').expect

const requestCookie = supertest.agent(app.listen())
const request = supertest(app.listen())

describe('User API', function () {
    describe('模拟登陆', function () {
        it('happy path，期待返回cookie', function (done) {
            requestCookie
                .get('/auth/loginTest')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(302)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
    })
    describe('保存用户个人自选股列表', function () {
        it('参数codes为空，期待正常返回', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .post('/user/saveOptStocks.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'codes': '600030,002014,000800,300104' })
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('codes格式输入错误-包含英文，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,00x00,300010' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-股票代码不为6位数字，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,0000,300010' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-最后一位多了个逗号，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,002100,' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-中间2个逗号间不存在股票代码，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,,002100' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-最开始是一个逗号，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': ',600030,002014,002100' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('happy path 正确设置自选股代码，期待返回的自选股代码同参数中的相同', function (done) {
            requestCookie
                .post('/user/saveOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,000800,300104' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    assert.equal((res.body.data)[0].stock, '600030,002014,000800,300104')
                    return done()
                })
        })
    })

    describe('查询用户个人自选股列表', function () {
        it('happy path ，期待得到正确结果600030,002014,000800,300104', function (done) {
            requestCookie
                .get('/user/queryOptStocks.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    assert.equal((res.body.data)[0].stock, '600030,002014,000800,300104')
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryOptStocks.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('保存用户设置的网格参数信息', function () {
        it('happy path，期待返回200状态 返回的网格信息参数与设置的一样', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'gap': 5, 'low': 2000 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    assert.equal((res.body.data)[0].code, '399500')
                    assert.equal((res.body.data)[0].gap, 5)
                    assert.equal((res.body.data)[0].low, 2000)
                    return done()
                })
        })
        it('用户未登陆，期待返回401错误', function (done) {
            request
                .post('/user/saveOptGridInfo.json')
                .send({ 'code': '399500', 'gap': 5, 'low': 2000 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('参数输入错误-code未输入，期待返回500状态 ', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'gap': 5, 'low': 2000 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-gap输入不为数字，期待返回200状态 返回的网格信息参数与设置的一样', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'gap': '34s' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-gap输入不超过允许范围，期待返回200状态 返回的网格信息参数与设置的一样', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'gap': '340' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-gap输入不为数字，期待返回200状态 返回的网格信息参数与设置的一样', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'low': '34s' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-gap输入不超过允许范围，期待返回200状态 返回的网格信息参数与设置的一样', function (done) {
            requestCookie
                .post('/user/saveOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'low': '-20' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
    })


    describe('查询用户设定的指数网格数据信息', function () {
        it('happy path ，期待得到正确结果', function (done) {
            requestCookie
                .get('/user/queryOptGridInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    expect(res.body.data).to.not.have.lengthOf(0)
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryOptStocks.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('查询用户设定的个股止盈补仓数据信息', function () {
        it('happy path ，期待得到正确结果', function (done) {
            requestCookie
                .get('/user/queryOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    // expect(res.body.data).to.not.have.lengthOf(0)
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryOptStockDealDetail.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('保存用户设置的个股止盈止损信息', function () {

        it('用户未登陆，期待返回401错误', function (done) {
            request
                .post('/user/saveOptStockDealDetail.json')
                .send({ 'code': '399500', 'coverTime': 5, 'profitTime': 5 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('参数输入错误-code未输入，期待返回500状态 ', function (done) {
            requestCookie
                .post('/user/saveOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'coverTime': 5, 'profitTime': 5 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-coverTime输入不为数字，期待返回500状态', function (done) {
            requestCookie
                .post('/user/saveOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'coverTime': '34s' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-profitTime输入不为数字，期待返回500状态', function (done) {
            requestCookie
                .post('/user/saveOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'profitTime': 'xx' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('参数输入错误-止盈次数和止损次数都不输入，期待返回500状态', function (done) {
            requestCookie
                .post('/user/saveOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('happy path，期待返回200状态 返回的个股止盈补仓数据条数大于1', function (done) {
            requestCookie
                .post('/user/saveOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '399500', 'coverTime': 5, 'profitTime': 5 })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    expect(res.body.data).to.not.have.lengthOf(0)
                    return done()
                })
        })

    })

    describe('保存用户个人自选转债列表', function () {
        it('参数codes为空，期待返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .post('/user/saveOptCbs.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'codes': '600030,002014,000800,300104' })
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('codes格式输入错误-包含英文，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,00x00,300010' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-股票代码不为6位数字，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,0000,300010' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-最后一位多了个逗号，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,002100,' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-中间2个逗号间不存在股票代码，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,,002100' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('codes格式输入错误-最开始是一个逗号，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': ',600030,002014,002100' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })
        it('happy path 正确设置自选股代码，期待返回的自选股代码同参数中的相同', function (done) {
            requestCookie
                .post('/user/saveOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'codes': '600030,002014,000800,300104' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    assert.equal((res.body.data)[0].cb, '600030,002014,000800,300104')
                    return done()
                })
        })
    })
    describe('查询用户个人自选转债列表', function () {
        it('happy path ，期待得到正确结果600030,002014,000800,300104', function (done) {
            requestCookie
                .get('/user/queryOptCbs.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    assert.equal((res.body.data)[0].cb, '600030,002014,000800,300104')
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryOptCbs.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('查询用户设定的个股止盈阈值', function () {
        it('happy path ，状态200 返回正确结果', function (done) {
            requestCookie
                .get('/user/queryStopProfitThreshold.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    // expect(res.body.data).to.not.have.lengthOf(0)
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryStopProfitThreshold.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('保存用户设置个股止盈阈值', function () {
        it('happy path，状态200 返回正确结果', function (done) {
            request
                .post('/user/saveStopProfitThreshold.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'threshold': 30 })
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('参数threshold为空，期待返回500错误', function (done) {
            requestCookie
                .post('/user/saveStopProfitThreshold.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .post('/user/saveStopProfitThreshold.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'codes': '600030,002014,000800,300104' })
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('codes格式输入错误-包含英文，期待拦截请求返回500错误', function (done) {
            requestCookie
                .post('/user/saveStopProfitThreshold.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'threshold': '3d' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })

    })

    describe('查询用户个人信息', function () {
        it('happy path ，状态200 返回正确结果', function (done) {
            requestCookie
                .get('/user/queryUserInfo.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    return done()
                })
        })

        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/queryUserInfo.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })

    describe('删除用户设定的个股止盈止损信息', function () {
        it('happy path，状态200 返回正确结果', function (done) {
            requestCookie
                .delete('/user/delOptStockDealDetail.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'code': '600030' })
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    return done()
                })
        })
        it('参数code为空，期待返回500错误', function (done) {
            requestCookie
                .delete('/user/delOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    return done()
                })
        })
        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .delete('/user/delOptStockDealDetail.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send({ 'code': '600030' })
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('code格式输入错误-包含英文，期待拦截请求返回500错误', function (done) {
            requestCookie
                .delete('/user/delOptStockDealDetail.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .send({ 'code': '3d' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, -1)
                    return done()
                })
        })

    })


    describe('用户登出', function () {
        it('happy path ，状态200 返回正确结果', function (done) {
            requestCookie
                .get('/user/logout.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.code, 1)
                    assert.equal(res.body.msg, 'ok')
                    return done()
                })
        })
        it('退出状态下再次登出,期待返回401错误', function (done) {
            requestCookie
                .get('/user/logout.json')
                //.set('Cookie', ['SESSIONID=5181a0e5f5fde416a154a15e5f2d74f3baf7e4bcc56ce604'])
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
        it('用户cookie为空，期待返回401错误', function (done) {
            request
                .get('/user/logout.json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    assert.equal(res.body.msg, '用户未登陆')
                    return done()
                })
        })
    })



})