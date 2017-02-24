import eslintStandardConfig from 'eslint-config-standard'
import format from 'prettier-eslint'
import fsReadFile from 'fs-readfile-promise'
import fsWriteFile from 'fs-writefile-promise/lib/node7'
import path from 'path'

function processFilePath({ file, encoding, filePath, eslintConfig, prettierOptions, logLevel, eslintPath, prettierPath }) {
  return new Promise((resolve, reject) => {
    fsReadFile(file, { encoding: encoding })
      .then(buffer => buffer.toString())
      .catch(err => { reject(err.message) })
      .then(source => {
        const fmtOptions = {
          text: source,
          filePath, eslintConfig, prettierOptions, logLevel, eslintPath, prettierPath
        }
        const formatted = format(fmtOptions)
        if (formatted !== source) {
          fsWriteFile(filepath, { encoding: encoding })
            .catch(err => reject(err.message))
            .then(() => { resolve('success!') })
        }
      })
      .catch(err => { reject(err.message) })
  })
}

class PrettierEslintPlugin {
  constructor (
    {
      encoding = 'utf-8',
      extensions = ['.js', '.jsx'],
      // prettier-eslint API
      filePath, eslintConfig, prettierOptions, logLevel, eslintPath,
      prettierPath, sillyLogs, config
    } = {}
  ) {
    // Encoding to use when reading / writing files
    this.encoding = encoding
    // Only process these files
    this.extensions = extensions
    // Expose prettier-eslint API
    this.filePath = filePath
    this.eslintConfig = eslintConfig || config
    this.prettierOptions = prettierOptions
    this.logLevel = logLevel
    this.eslintPath = eslintPath
    this.prettierPath = prettierPath
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      // Explore each chunk (build output):
      compilation.chunks.forEach(chunk => {
        // Explore each module within the chunk (built inputs):
        chunk.modules.forEach(module => {
          if (!module.fileDependencies) return
          // Explore each source file path that was included into the module
          module.fileDependencies.forEach(file => {
            // match extensions and exclude node modules
            if (
              this.extensions.indexOf(path.extname(file)) !== -1 &&
              file.indexOf('node_modules') === -1
            ) {
              processFilePath({
                file: file,
                encoding: this.encoding,

                filePath : this.filePath,
                eslintConfig : this.eslintConfig,
                prettierOptions : this.prettierOptions,
                logLevel : this.logLevel,
                eslintPath : this.eslintPath,
                prettierPath : this.prettierPath,
              })
              .then(() => { console.log('succeed') })
              .catch(err => { console.error(err) })
            }
          })
        })
      })
      callback()
    })
  }
}

exports.processFilePath = processFilePath
exports.PrettierEslintPlugin = PrettierEslintPlugin
