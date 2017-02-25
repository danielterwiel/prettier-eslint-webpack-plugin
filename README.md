# Prettier Eslint Webpack Plugin

Webpack 2.* plugin for [prettier-eslint](https://github.com/kentcdodds/prettier-eslint) which ESLint's settings is set to [JavaScript Standard Style](http://standardjs.com/)

## Install
```
yarn add prettier-eslint-webpack-plugin
```

### Usage


| *key*      | *type*          | *description*                                | *default*       |
|------------|-----------------|----------------------------------------------|-----------------|
| encoding   | string          | Encoding to use when reading / writing files | 'utf-8'         |
| extensions | array           | Only process these file extensions           | ['.js', '.jsx'] |

Furthermore the entire [prettier-eslint](https://github.com/kentcdodds/prettier-eslint#options) API is exposed in the exact same way.

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
      encoding: 'utf-16',
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

## Roadmap:
* Add Flow type support

### Inspiration
* [prettier-eslint](https://github.com/kentcdodds/prettier-eslint)
* [prettier-webpack-plugin](https://github.com/hawkins/prettier-webpack-plugin)
* [eslint-config-standard](https://github.com/feross/eslint-config-standard)

### Licence

MIT. Copyright (c) Daniël Terwiel
