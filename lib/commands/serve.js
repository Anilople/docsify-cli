const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const lrserver = require('livereload')
const chalk = require('chalk')
const util = require('../util/index')

var exists = util.exists
var resolve = util.resolve

module.exports = function (path, port) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exists(indexFile)) {
    const msg = '\nNo docs found, please run ' + chalk.inverse('docsify init') + ' first.\n'
    console.log(msg)
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(port)
  lrserver.createServer({
    exts: ['md']
  }).watch(path)

  const msg = '\nServing ' + chalk.inverse(`${path}`) + ' now.\n' +
              'Listening at ' + chalk.inverse(`http://localhost:${port}`) + '\n'
  console.log(msg)
}