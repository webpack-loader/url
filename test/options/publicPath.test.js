const { webpack } = require('@webpack-utilities/test')

describe('Options', () => {
  describe('publicPath', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            publicPath: 'public_path/'
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { assets, source } = stats.toJson().modules[0]

      expect({ assets, source }).toMatchSnapshot()
    })

    test('{String} - URL', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            publicPath: 'https://cdn.com/'
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
            publicPath(url) {
              return `public_path_fn/${url}`
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
