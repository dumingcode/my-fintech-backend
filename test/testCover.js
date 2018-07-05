const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')

const expect = chai.expect
const request = supertest(app.listen())

describe('POST /Bigdata Covers', function() {
    it('query sina stock API', function(done) {
        request
            .post('/bigdata/querySinaStock.json')
            .send('codes=600030,002014,000800,300104')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
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
                if (err) return done(err);
                done();
            });
    });
});