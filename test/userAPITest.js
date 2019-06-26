const supertest = require('supertest')
const app = require('../app')

const request = supertest(app.listen())

describe('User API', function () {
    describe('保存用户个人自选股列表', function () {
        it('query sina stock API', function (done) {
            request
                .post('/user/saveOptStocks.json')
                .set('Cookie', ['SESSIONID=f60bdcb8b472373a997dde2b687f3e0dbbeed6abc2720cd2'])
                .expect('Content-Type', /json/)
                .send('codes=600030,002014,000800,300104')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    expect(res.data).to.be.equal('hey')
                    return done()
                })
        })
    })

    describe('GET /Bigdata Covers', function () {
        it('query sina stock API', function (done) {
            request
                .get('/bigdata/querySinaStockGet.json?codes=600030,002014,000800,300104')
                .expect(200)
                .end(function (err, res) {
                    done()
                })
        })
    })
})