# Prettier Eslint Webpack Plugin

Webpack 2.* plugin for [prettier-eslint](https://github.com/kentcdodds/prettier-eslint)

## Install
```
yarn add prettier-eslint-webpack-plugin
```

### Usage


| *key*      | *type*          | *description*                                | *default*       |
|------------|-----------------|----------------------------------------------|-----------------|
| encoding   | ?String         | Encoding to use when reading / writing files | 'utf-8'         |
| extensions | ?Array          | Only process these file extensions           | ['.js', '.jsx'] |

Furthermore the entire [prettier-eslint](https://github.com/kentcdodds/prettier-eslint#options) API is exposed:

| *key*           | type                                                         | *description*                                                                                                                                                                                                                                                                                                                                                                       | *default*                                           |
|-----------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| filePath        | ?String                                                      | The path of the file being formatted can be used in leu of eslintConfig (eslint will be used to find the relevant config for the file).                                                                                                                                                                                                                                             | undefined                                           |
| eslintConfig    | ?Object                                                      | The config to use for formatting with ESLint. If this is provided, then filePath is not necessary.                                                                                                                                                                                                                                                                                  | [JavaScript Standard Style](http://standardjs.com/) |
| prettierOptions | ?Object                                                      | The options to pass for formatting with prettier. If not provided, prettier-eslint will attempt to create the options based on the eslintConfig (whether that's provided or derived via filePath). You can also provide some of the options and have the remaining options derived via your eslint config. This is useful for options like parser.                                  | undefined                                           |
| logLevel        | ?Enum: ['trace', 'debug', 'info', 'warn', 'error', 'silent'] | prettier-eslint does quite a bit of logging if you want it to. Pass this to set the amount of logs you want to see.                                                                                                                                                                                                                                                                 | process.env.LOG_LEVEL || 'warn'                     |
| eslintPath      | ?String                                                      | By default, prettier-eslint will try to find the relevant eslint (and prettier) module based on the filePath. If it cannot find one, then it will use the version that prettier-eslint has installed locally. If you'd like to specify a path to the eslint module you would like to have prettier-eslint use, then you can provide the full path to it with the eslintPath option. | undefined                                           |

### Example

Your `webpack.dev.js` file:

```javascript
import PrettierEslintPlugin from 'prettier-eslint-webpack-plugin'
import fs from 'fs'

...

const eslintConfig = fs.readFileSync('path/to/.eslintrc')

module.exports = {
  ...
  plugins: {
    ...
    new PrettierEslintPlugin({
      encoding: ['utf-16'],
      extensions: '.jsf00',
      eslintConfig: eslintConfig,
      logLevel: 'trace',
      prettierOptions: {
        singleQuote: false,
      }
    })
    ...
  }
  ...
}
```

## Pull requests
Welcome

### Inspiration
* [prettier-eslint](https://github.com/kentcdodds/prettier-eslint)
* [prettier-webpack-plugin](https://github.com/hawkins/prettier-webpack-plugin)
* [eslint-config-standard](https://github.com/feross/eslint-config-standard)

### Licence

MIT.
Copyright (c) Daniël Terwiel
