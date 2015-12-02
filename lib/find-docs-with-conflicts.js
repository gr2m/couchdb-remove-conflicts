module.exports = findDocsWithConflicts

var _ = require('lodash')
var log = require('npmlog')

function findDocsWithConflicts (state, next) {
  state.docsWithConflicts = _.pluck(state.response.rows, 'doc').filter(hasConflict)
  state.result.docsWithConflicts += state.docsWithConflicts.length
  log.info('result', '%d docs have conflicts', state.docsWithConflicts.length)
  next(null, state)
}

function hasConflict (doc) {
  return !!doc._conflicts
}
