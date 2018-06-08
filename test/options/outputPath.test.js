const { webpack } = require('@webpack-utilities/test')

describe('Options', () => {
  describe('outputPath', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            outputPath: 'output_path/'
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { assets, source } = stats.toJson().modules[0]

      expect({ assets, source }).toMatchSnapshot()
    })

    test('{Function}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            outputPath(url) {
              return `output_path_fn/${url}`
            }
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { assets, source } = stats.toJson().modules[0]

      expect({ assets, source }).toMatchSnapshot()
    })
  })
})
