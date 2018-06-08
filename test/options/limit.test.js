const { webpack } = require('@webpack-utilities/test')

describe('Options', () => {
  describe('limit', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            name: '[hash].[ext]',
            limit: '10000'
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { source } = stats.toJson().modules[0]

      expect(source).toMatchSnapshot()
    })

    test('{Number}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            name: '[hash].[ext]',
            limit: 1000
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { source } = stats.toJson().modules[0]

      expect(source).toMatchSnapshot()
    })
  })
})
