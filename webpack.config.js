//jshint node: true, esversion: 6
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'public'),
  mode: 'development',
  entry: [
    './css/style.less',
    './js/main.js',
  ],
  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    })
],
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'public'),
        use: [
          'babel-loader',
      ]
      },
      { 
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
      ]
      },
      {
        test: /.hbs$/, 
        loader: 'handlebars-loader'
      }
    ]
  },
  devServer: {
    contentBase: "./public"
  }
};