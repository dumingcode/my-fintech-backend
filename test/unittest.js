const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')

const expect = chai.expect
const request = supertest(app.listen())

describe('开始测试indexInvest的GET请求', () => {

    it('测试/queryLxrIndexAllData.json请求', (done) => {
        request
            .get('/indexInvest/queryLxrIndexAllData.json')
            .expect(200)
            .end((err, res) => {

                //   expect(res.body.code).to.be.equal(1)
                //   expect(res.body.msg).to.be.equal('ok')
                //expect(res.body.data).to.be.an('object')
                done()
            })
    })
})

describe('POST /Bigdata Covers', function() {
    it('query sina stock API', function(done) {
        request
            .post('/bigdata/querySinaStock.json')
            .send('codes=600030,002014,000800,300104')
            .expect(200)
            .end(function(err, res) {
                done();
            });
    });
});

describe('GET /Bigdata Covers', function() {
    it('query sina stock API', function(done) {
        request
            .get('/bigdata/querySinaStockGet.json?codes=600030,002014,000800,300104')
            .expect(200)
            .end(function(err, res) {
                done();
            });
    });
});

describe('开始测试indexInvest的GET请求', () => {

    it('测试/queryLxrIndexDealDate.json请求', (done) => {
        request
            .get('/indexInvest/queryLxrIndexDealDate.json')
            .expect(200)
            .end((err, res) => {

                //   expect(res.body.code).to.be.equal(1)
                //   expect(res.body.msg).to.be.equal('ok')
                //expect(res.body.data).to.be.an('object')
                done()
            })
    })
})

describe('开始测试qmDealDate的GET请求', () => {

    it('测试/queryQmIndexDealDate.json请求', (done) => {
        request
            .get('/indexInvest/queryQmIndexDealDate.json')
            .expect(200)
            .end((err, res) => {

                //   expect(res.body.code).to.be.equal(1)
                //   expect(res.body.msg).to.be.equal('ok')
                //expect(res.body.data).to.be.an('object')
                done()
            })
    })
})