const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const Mode = {
  Dev: 'development',
  Prod: 'production',
};

const config = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
};

module.exports = (env, argv) => {
  config.mode = argv.mode ?? Mode.Dev;

  switch (config.mode) {
    case Mode.Dev: {
      config.plugins.push(new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'demo/index.html',
      }));

      break;
    }

    case Mode.Prod: {
      break;
    }
  }

  return config;
}