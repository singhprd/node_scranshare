var webpack = require('webpack');

config = {
  entry: ['./client/src/index.js'],
  output: {
    filename: "bundle.js",
    path: "./client/build"
  },
  // devtool: 'source-map', 
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/, 
      loader: 'babel', 
      query: {
        presets: ['react', 'es2015'],
      }
    }]
  }
};

module.exports = config;