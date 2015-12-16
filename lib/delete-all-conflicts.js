module.exports = deleteAllConflicts

var async = require('async')
var log = require('npmlog')

function deleteAllConflicts (state, next) {
  async.eachLimit(state.conflictIdsAndRevions, 10, deleteConflict.bind(null, state), function (error) {
    next(error, state.result)
  })
}

function deleteConflict (state, conflict, next) {
  state.db.destroy(conflict.id, conflict.rev, function (error) {
    if (error && error.code === 'ENOTFOUND') {
      log.warn('delete', 'could not delete %s/%s', conflict.id, conflict.rev)
      log.warn('info', 'trying again ...')
      return deleteConflict(state, conflict, next)
    }

    next(error, next)
  })
}
