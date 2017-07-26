var path = require('path')

module.exports = function (env) {
  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      filename: 'scrollus.js',
      path: path.resolve(__dirname, 'lib'),
      library: 'scrollus',
      libraryTarget: 'var',
      libraryExport: 'default'
    }
  }
}
