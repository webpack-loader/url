const { webpack } = require('@webpack-utilities/test')

describe('Options', () => {
  describe('context', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /(png|jpg|svg)/,
          options: {
            context: `${__dirname}`
          }
        }
      }

      const stats = await webpack('fixture.js', config)
      const { source } = stats.toJson().modules[0]

      expect(source).toMatchSnapshot()
    })
  })
})
