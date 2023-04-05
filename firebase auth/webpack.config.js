const path = require('path')

module.exports = {
  mode: 'development',
  entry: './scripts/auth.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true
}

// * Run 'npm run build'