module.exports = removeConflictsFromDatabase

var async = require('async')
var fetchAllDocs = require('./fetch-all-docs')
var findDocsWithConflicts = require('./find-docs-with-conflicts')
var findConflictIdsAndRevisions = require('./find-conflict-ids-and-revisions')
var deleteAllConflicts = require('./delete-all-conflicts')

function removeConflictsFromDatabase (state, next) {
  async.waterfall([
    function (_next) { _next(null, state) },
    fetchAllDocs,
    findDocsWithConflicts,
    findConflictIdsAndRevisions,
    deleteAllConflicts
  ], next)
}
