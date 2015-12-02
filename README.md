# couchdb-remove-conflicts

> CLI tool to remove all conflicts from a CouchDB database

## CLI Usage

```bash
# npm install --global couchdb-remove-conflicts
couchdb-remove-conflicts <url>
```

## Module Usage

```js
var couchdbRemoveConflicts = require('couchdb-remove-conflicts')
couchdbRemoveConflicts(url, function (error, result) {
  if (error) {
    throw error
  }

  console.log(result)
})
```

## <url> option

The `<url>` CLI argument or `couchdbRemoveConflicts(url, callback)` option must
be a URL of a CouchDB database or CouchDB root.

Examples

- `http://localhost:5984/dbname`  
  deletes all conflicts in `dbname`
- `http://username:password@couch.example.com/dbname`  
  deletes all conflicts in `dbname`, authenticates with `username:password`
- `http://username:password@couch.example.com`  
  deletes all conflicts in all databases at the given CouchDB url

## How it work

The `url` option gets passed to [nano](https://github.com/dscape/nano#nano). If
the `url` is a CouchDB root, then all databases are fetched (one by one),
otherwise only the one for the passed URL.

For each database, all docs are fetched with `?include_docs=true&conflicts=true`
and then separate `DELETE /<dbname>/<docid>?rev=<rev>` requests are sent for
every conflict, with max. 100 requests at once.

## TODOs

- [ ] add tests :)
- [ ] add options to limit series of `DELETE` requests and database handling
- [ ] allow to pass in username & password as `{auth: { username, password } }`

## License

Apache-2
