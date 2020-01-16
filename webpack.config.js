const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /.*.spec.ts/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

const umd = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chronometric.umd.js',
    library: 'chronometric',
    libraryTarget: 'umd'
  },
  ...config,
};

const window = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chronometric.window.js',
    library: 'chronometric',
    libraryTarget: 'window'
  },
  ...config,
}

module.exports = [umd, window];
