const { webpack } = require('@webpack-utilities/test')

describe('Loader', () => {
  test('Defaults', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {}
      }
    }

    const stats = await webpack('fixture.js', config)
    const { source } = stats.toJson().modules[0]

    expect(source).toMatchSnapshot()
  })
})
