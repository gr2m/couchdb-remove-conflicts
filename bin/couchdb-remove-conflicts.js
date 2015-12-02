#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var main = require('../index')

main({
  url: argv._[0]
}, function (error, state) {
  if (error) {
    return console.error(error)
  }

  console.log('DONE.')
  console.log(JSON.stringify(state.result, null, 2))
})
