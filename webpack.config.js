const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerExtractPlugin = require('css-minimizer-webpack-plugin');
const TraserWebpackPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');

module.exports = (env) => {
   const isProduction = env.production;

   const optimizeJs = isProduction ? 'main.[contenthash].js' : 'main.js';
   const optimizeCss = isProduction ? 'main.[contenthash].css' : 'main.css';

   return {
      mode: isProduction ? 'production' : 'development',

      entry: './src/app/index.js',

      output: {
         filename: optimizeJs,
         path: path.resolve(__dirname, 'dist'),
      },

      resolve: {
         extensions: ['.js', ',jsx', '.scss'],
      },

      devtool: 'source-map',

      optimization: {
         minimizer: [
            new CssMinimizerExtractPlugin(),
            new TraserWebpackPlugin(),
         ],
      },

      plugins: [
         new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
               removeAttributeQuotes: isProduction,
               collapseWhitespace: isProduction,
               removeComments: isProduction,
            },
         }),

         new CleanWebpackPlugin(),

         new MiniCssExtractPlugin({
            filename: './src/style/main.scss',
            filename: optimizeCss,
         }),
      ],

      module: {
         rules: [
            {
               test: /\.css$/,
               use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
               test: /\.s[ca]ss$/,
               use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },

            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,

               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env', '@babel/preset-react'],
                  },
               },
            },
         ],
      },
   };
};
