const eslintFormatter = require('react-dev-utils/eslintFormatter')
const PATHS = require('../../paths')

module.exports = function CreateESLintLoader() {
  return {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    use: [
      {
        options: { formatter: eslintFormatter },
        loader: require.resolve('eslint-loader')
      }
    ],
    include: PATHS.SRC
  }
}
