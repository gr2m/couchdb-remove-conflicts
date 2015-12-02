module.exports = findConflictIdsAndRevisions

var log = require('npmlog')

function findConflictIdsAndRevisions (state, next) {
  state.conflictIdsAndRevions = []
  state.docsWithConflicts.forEach(function (doc) {
    doc._conflicts.forEach(function (rev) {
      state.conflictIdsAndRevions.push({
        id: doc._id,
        rev: rev
      })
    })
  })

  state.result.conflicts += state.conflictIdsAndRevions.length
  log.info('result', '%d conflicts total', state.conflictIdsAndRevions.length)
  next(null, state)
}
