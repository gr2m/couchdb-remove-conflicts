module.exports = fetchAllDocs

var log = require('npmlog')

function fetchAllDocs (state, next) {
  state.db.list({
    include_docs: true,
    conflicts: true
  }, function (error, response) {
    if (error) {
      return next(error)
    }

    state.response = response
    state.result.docs += state.response.rows.length
    log.info('result', '%d docs found', state.response.rows.length)
    next(error, state)
  })
}
