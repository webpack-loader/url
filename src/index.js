const path = require('path')
const mime = require('mime')
const schema = require('./options.json')

const { validateOptions } = require('@webpack-utilities/schema')
const { getOptions, resource } = require('@webpack-utilities/loader')

function loader (src) {
  const options = getOptions(this) || {}

  validateOptions(schema, options, 'URL Loader')

  const context = options.context || this.rootContext

  const url = resource.getName(this, options.name, {
    context,
    content: src,
    regExp: options.regExp
  })

  let outputPath = url

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url)
    } else {
      outputPath = path.posix.join(options.outputPath, url)
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url)
    } else if (options.publicPath.endsWith('/')) {
      publicPath = options.publicPath + url
    } else {
      publicPath = `${options.publicPath}/${url}`
    }

    publicPath = JSON.stringify(publicPath)
  }

  if (options.limit && src.length < parseInt(options.limit, 10)) {
    if (typeof src === 'string') {
      src = Buffer.from(src)
    }

    return `export default ${JSON.stringify(
      `data:${mime.getType(url) || ''};base64,${src.toString('base64')}`
    )};`
  } else {
    this.emitFile(outputPath, src)

    return `export default ${publicPath};`
  }
}

module.exports = loader
module.exports.raw = true
