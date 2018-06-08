const loader = require('../src/index.js')

describe('Errors', () => {
  test('Validation Error', () => {
    const err = () => loader.call({
      query: { publicPath: 1 },
      emitFile: true
    })

    expect(err).toThrow()
    expect(err).toThrowErrorMatchingSnapshot()
  })
})
