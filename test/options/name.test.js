const { webpack } = require('@webpack-utilities/test')

describe('Options', () => {
  describe('name', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            name: '[hash].[ext]'
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { source } = stats.toJson().modules[0]

      expect(source).toMatchSnapshot()
    })

    test('{Function}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            name() {
              return '[hash].[ext]'
            }
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { source } = stats.toJson().modules[0]

      expect(source).toMatchSnapshot()
    })
  })
})
