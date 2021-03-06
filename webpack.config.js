require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./webpack-paths');

module.exports = {
  entry: [
    'babel-polyfill',
    paths.entry
  ],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: paths.output
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '.babelrc.js')
        }
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },

      {
        // test: /\.(webp)$/,
        test: /\.(webp|jpe?g|png)$/,
        use: 'file-loader'
      }// ,

      // {
      //   test: /\.(jpg|png)$/,
      //   loader: 'responsive-loader',
      //   options: {
      //     adapter: require('responsive-loader/sharp')
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.template.html')
    })
  ]
};
