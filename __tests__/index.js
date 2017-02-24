import path from 'path'
import * as PluginFile from './../'

test('passes parameters', () => {
  const formatMock = jest.fn()
  // const plugin = PluginFile.PrettierEslintPlugin({
  //   encoding: 'utf-16',
  //   extensions: ['.coffee', '.ts'],
  //   // Prettier ESlint API
  //   filePath: '/file/path/',
  //   eslintConfig: {
  //     parserOptions: {
  //       ecmaVersion: 7
  //     },
  //     rules: {
  //       semi: ['error', 'never']
  //     }
  //   },
  //   prettierOptions: {
  //     bracketSpacing: true,
  //   },
  //   logLevel: 'trace',
  //   eslintPath: '/eslint/path/',
  //   prettierPath: '/prettier/path/'
  // })

  PluginFile.processFilePath({
    filePath: '/file/path/',
    eslintConfig: {
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        semi: ['error', 'never']
      }
    },
    prettierOptions: {
      bracketSpacing: true,
    },
    logLevel: 'trace',
    eslintPath: '/eslint/path/'
  }).then(data => {
    expect(formatMock).toHaveBeenCalledWith({
      filePath: '/file/path/',
      eslintConfig: {
        parserOptions: {
          ecmaVersion: 7
        },
        rules: {
          semi: ['error', 'never']
        }
      },
      prettierOptions: {
        bracketSpacing: true,
      },
      logLevel: 'trace',
      eslintPath: '/eslint/path/'
    })
  })
})

describe('PrettierEslintPlugin', () => {
  const plugin = new PluginFile.PrettierEslintPlugin({
    encoding: 'utf-16',
    extensions: ['.coffee', '.ts'],
    // Prettier ESlint API
    filePath: '/file/path/',
    eslintConfig: {
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        semi: ['error', 'never']
      }
    },
    prettierOptions: {
      bracketSpacing: true,
    },
    logLevel: 'trace',
    eslintPath: '/eslint/path/',
    prettierPath: '/prettier/path/'
  })
  it('supports other encoding than utf-8', () => {
    expect(plugin.encoding).toBe('utf-16')
  })
  it('supports different file extensions', () => {
    expect(plugin.extensions).toEqual(['.coffee', '.ts'])
  })
  it('exposes Prettier ESlint API', () => {
    expect(plugin.filePath).toBe('/file/path/')
    expect(plugin.eslintConfig).toEqual({
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        semi: ['error', 'never']
      }
    })
    expect(plugin.prettierOptions).toEqual({
      bracketSpacing: true,
    })
    expect(plugin.logLevel).toBe('trace')
    expect(plugin.eslintPath).toBe('/eslint/path/')
    expect(plugin.prettierPath).toBe('/prettier/path/')
  })
})

describe('0.0.1 backwards compatibility', () => {
  it('is backwards compatible with 0.0.1', () => {
    const plugin = new PluginFile.PrettierEslintPlugin({
      config: {
        parserOptions: {
          ecmaVersion: 7
        },
        rules: {
          semi: ['error', 'never']
        }
      }
    })
    expect(plugin.eslintConfig).toEqual({
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        semi: ['error', 'never']
      }
    })
  })
})
