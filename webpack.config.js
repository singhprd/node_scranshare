var webpack = require('webpack');

config = {
  entry: ['babel-polyfill', 'whatwg-fetch', './client/src/index.js'],
  output: {
    filename: "bundle.js",
    path: "./client/build"
  },
  devtool: 'source-map', 
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
  },
  plugins: [  
  new webpack.ProvidePlugin({
    Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    React: 'react'

  }),
  ]
};

module.exports = config;