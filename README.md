# Prettier Eslint Webpack Plugin

Webpack plugin for [prettier-eslint](https://github.com/kentcdodds/prettier-eslint) which ESLint's settings is set to [JavaScript Standard Style](http://standardjs.com/)

## Install
```
yarn add prettier-eslint-webpack-plugin
```

### Usage


| *key*      | *type*          | *description*                                | *default*       |
|------------|-----------------|----------------------------------------------|-----------------|
| encoding   | ?String         | Encoding to use when reading / writing files | 'utf-8'         |
| extensions | ?Array          | Only process these file extensions           | ['.js', '.jsx'] |

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
      eslintConfig: eslintConfig
    })
    ...
  }
  ...
}
```

## Pull requests
Welcome

## Roadmap:
* Tests
* Add support for Flow

### Inspiration
* [prettier-eslint](https://github.com/kentcdodds/prettier-eslint)
* [prettier-webpack-plugin](https://github.com/hawkins/prettier-webpack-plugin)
* [eslint-config-standard](https://github.com/feross/eslint-config-standard)

### Licence

MIT. Copyright (c) Daniël Terwiel
