const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const Mode = {
  Dev: 'development',
  Prod: 'production',
};

module.exports = (env, argv) => {
  const mode = argv.mode ?? Mode.Dev;

  const processEnv = dotenv.config().parsed;
  processEnv.DEBUG = mode === Mode.Dev;

  return {
    mode,
    entry: {
      [processEnv.WIDGET_NAME]: path.resolve(__dirname, 'src/main.js'),
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
        'process.env': JSON.stringify(processEnv),
      }),
      mode === Mode.Dev && new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'demo/index.html',
        inject: false,
      })
    ],
  };
}