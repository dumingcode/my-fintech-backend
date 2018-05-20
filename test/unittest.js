const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')

const expect = chai.expect
const request = supertest( app.listen() )

describe( '开始测试indexInvest的GET请求', ( ) => {
  
  it('测试/queryLxrIndexAllData.json请求', ( done ) => {
      request
        .get('/indexInvest/queryLxrIndexAllData.json')
        .expect(200)
        .end(( err, res ) => {
            
        //   expect(res.body.code).to.be.equal(1)
        //   expect(res.body.msg).to.be.equal('ok')
          //expect(res.body.data).to.be.an('object')
          done()
        })
  })
})