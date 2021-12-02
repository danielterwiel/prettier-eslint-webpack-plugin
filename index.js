const prettier = require("prettier");
var format = require('prettier-eslint')
const fs = require("fs");
var path = require('path')

const PRETTIER_ESLINT_PLUGIN = 'PrettierEslintPlugin';
const DEFAULT_ENCODING = "utf-8";
const DEFAULT_EXTENSIONS = prettier.getSupportInfo
  ? prettier
      .getSupportInfo()
      .languages.map(l => l.extensions)
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
  : [
      ".css",
      ".graphql",
      ".js",
      ".json",
      ".jsx",
      ".less",
      ".sass",
      ".scss",
      ".ts",
      ".tsx",
      ".vue",
      ".yaml",
    ];

function processFilePath({ fileCurrent, encoding, filePath, eslintConfig, prettierOptions, logLevel, eslintPath, prettierPath }) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileCurrent, encoding, (err, source) => {
      if (err) {
          return reject(err);
      }
      
      try{
        const fmtOptions = {
          text: source,
          filePath, eslintConfig, prettierOptions, logLevel, eslintPath, prettierPath
        }

        const formatted = format(fmtOptions)

        if (formatted !== source) {
          fs.writeFile(fileCurrent, prettierSource, this.encoding, err => {
            if (err) {
              return reject(err);
            }
            resolve('success!');
          });
        } else {
          resolve('success!');
        }
      }
      catch(err){
        return reject(err);
      }
    });
  })
}

class PrettierEslintPlugin {
  constructor (
    {
      encoding = DEFAULT_ENCODING,
      extensions = DEFAULT_EXTENSIONS,
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
    compiler.hooks.emit.tapAsync(PRETTIER_ESLINT_PLUGIN, (compilation, callback) => {
      const promises = [];
      if (!compilation.fileDependencies) return;
      compilation.fileDependencies.forEach(fileCurrent=> {
        if (this.extensions.indexOf(path.extname(fileCurrent)) === -1 && 
        fileCurrent.indexOf('node_modules') === -1 ) {
          return;
        }

        promises.push(
          processFilePath({
            fileCurrent: fileCurrent,
            encoding: this.encoding,

            filePath : this.filePath,
            eslintConfig : this.eslintConfig,
            prettierOptions : this.prettierOptions,
            logLevel : this.logLevel,
            eslintPath : this.eslintPath,
            prettierPath : this.prettierPath,
          })
        );
      });
  
      Promise.all(promises).then(() => {
        callback();
      }).catch(err => {
        callback(err);
      });
    });
  }
}

exports.processFilePath = processFilePath
exports.PrettierEslintPlugin = PrettierEslintPlugin
