'use strict'

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var serverViews = require('../server')
var clientViews = require('../client')

describe('Rill/HTML', function () {
  it('should work on the server', function (done) {
    var view = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>content</body>
      </html>
    `

    var request = agent(Rill()
      .use(serverViews())
      .get('/', function (ctx, next) {
        ctx.res.body = view
      }).listen().unref())

    request
      .get('/')
      .expect(200)
      .expect(function (res) {
        var body = res.text.split('</body>')[0].split('>').pop()
        assert.equal(
          body,
          'content'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
      .end(done)
  })

  it('should work on the client', function (done) {
    var view1 = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>content</body>
      </html>
    `

    var view2 = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test2</title>
        </head>
        <body>content2</body>
      </html>
    `

    var request = agent(Rill()
      .use(clientViews())
      .get('/1', function (ctx, next) {
        ctx.res.body = view1
      })
      .get('/2', function (ctx, next) {
        ctx.res.body = view2
      })
      .listen().unref())

    request
      .get('/1')
      .expect(200)
      .expect('content-type', 'text/html; charset=UTF-8')
      .expect(function () {
        assert.equal(document.title, 'Test')
        assert.equal(document.body.innerHTML.trim(), 'content')
      })
      .end(function (err) {
        if (err) return done(err)
        request
          .get('/2')
          .expect(200)
          .expect('content-type', 'text/html; charset=UTF-8')
          .expect(function () {
            assert.equal(document.title, 'Test2')
            assert.equal(document.body.innerHTML.trim(), 'content2')
          })
          .end(done)
      })
  })
})
