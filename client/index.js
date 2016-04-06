'use strict'

var diff = require('morphdom')
var statuses = require('statuses')
var htmlReg = /^\s*</

module.exports = function (opts) {
  return function renderHTML (ctx, next) {
    var res = ctx.res
    return next().then(function () {
      if (
        typeof res.body !== 'string' ||
        !htmlReg.test(res.body) ||
        statuses.redirect[res.status] ||
        statuses.empty[res.status] ||
        res.get('Location')
        ) return

      diff(document.documentElement, res.body)
    })
  }
}
