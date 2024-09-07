const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/index.ts',
  devtool: "source-map",
  output: {
    filename: 'glib.min.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};