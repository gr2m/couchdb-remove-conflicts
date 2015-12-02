module.exports = couchdbRemoveConflicts

var async = require('async')
var nano = require('nano')
var log = require('npmlog')

var removeConflictsFromDatabase = require('./lib/remove-conflicts-from-database')

log.level = process.env.LOG_LEVEL || 'info'

function couchdbRemoveConflicts (state, next) {
  state.db = nano(state.url)
  state.result = {
    docs: 0,
    docsWithConflicts: 0,
    conflicts: 0
  }

  if (state.db.config.db) {
    return removeConflictsFromDatabase(state, next)
  }

  var baseUrl = state.url.replace(/\/?$/, '')
  log.info('couch', 'Loading all databases from %s', baseUrl)
  state.db.db.list(function (error, dbNames) {
    if (error) {
      return next(error)
    }

    state.result.dbs = dbNames.length
    log.info('couch', '%d databases found', state.result.dbs)

    async.eachSeries(dbNames, function (name, _next) {
      state.url = baseUrl + '/' + encodeURIComponent(name)
      log.info('db', 'Looking for conflicts in %s', state.url)
      state.db = nano(state.url)
      removeConflictsFromDatabase(state, _next)
    }, function (error) {
      next(error, state.result)
    })
  })
}
