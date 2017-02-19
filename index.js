const format = require('prettier-eslint')
const fs = require('fs')
const path = require('path')
const config = require('eslint-config-standard')

module.exports = class PrettierPlugin {
  constructor (options) {
    options = options || {}

    // Encoding to use when reading / writing files
    this.encoding = options.encoding || 'utf-8'

    // Only process these files
    this.extensions = options.extensions || ['.js', '.jsx']

    // option to override ESlint StandardJS configuration
    this.config = options.config || config
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      // Explore each chunk (build output):
      compilation.chunks.forEach(chunk => {
        // Explore each module within the chunk (built inputs):
        chunk.modules.forEach(module => {
          if (!module.fileDependencies) return
          // Explore each source file path that was included into the module
          module.fileDependencies.forEach(filepath => {
            // match extensions and exclude node modules
            if (
              this.extensions.indexOf(path.extname(filepath)) !== -1 &&
              filepath.indexOf('node_modules') === -1
            ) {
              // Read the file
              fs.readFile(filepath, this.encoding, (err, source) => {
                if (err) throw new Error(err)
                const formatted = format({
                  text: source,
                  eslintConfig: config,
                })
                if (formatted !== source) {
                  fs.writeFile(filepath, formatted, this.endcoding, err => {
                    if (err) throw new Error(err)
                  })
                }
              })
            }
          })
        })
      })
      callback()
    })
  }
}
