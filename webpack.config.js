const path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { watch } = require('fs');
var alias = {
    
  };
  
  // load the secrets

  
  var fileExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'eot',
    'otf',
    'svg',
    'ttf',
    'woff',
    'woff2',
  ];
  

  
  var options = {
    
  devtool: process.env.NODE_ENV === 'production' ? false : 'sourcemap',
  context: path.resolve(__dirname, 'src'),
  entry: {

    foreground:path.join(__dirname, 'src',  'index-foreground.js'),
    //playground:path.join(__dirname, 'src',  'index-playground.js'),
    content: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    popup: path.join(__dirname, 'src','Popup', 'index.js', ),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'steamp.js'),
    contentScript: path.join(__dirname, 'src', 'steamf.js'),
    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
        {
          // look for .css or .scss files
          test: /\.(css|scss)$/,
          // in the `src` directory
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
          type: 'asset/resource',
          exclude: /node_modules/,
          // loader: 'file-loader',
          // options: {
          //   name: '[name].[ext]',
          // },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: /node_modules/,
        },
        { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
        
        {
          test: /\.js$/,
          include: /content/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-object-rest-spread',
                [
                  'transform-react-jsx',
                  {
                    pragma: 'h',
                    useBuiltIns: true
                  }
                ]
              ]
            }
          }
        },
      ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    
new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    filename: 'popup.html',
    chunks: ['popup'],
    cache: false,
  }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'manifest.json', to: '[name].[ext]' },
            { from: 'setter.js', to: '[name].[ext]' },
            // { from: 'src/background.js', to: '[name].[ext]' },
            { from: 'icons/*.png', to: '[name].[ext]' }
        ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    concatenateModules: true,
    minimizer:
      process.env.NODE_ENV === 'production' ? [new UglifyJsPlugin()] : undefined
  },
  watch:true
  
}

module.exports = options;
