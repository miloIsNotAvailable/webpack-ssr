const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
var glob = require("glob");
const path = require( "path" )

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', ".ts"],
    modules: [
      'node_modules'
    ],
    fallback: {
      "msw": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "timers": false,
      "crypto": false,
    }
  },
  target: 'node',
  entry: {
    js: glob.sync("./src/render.tsx"),    
    // css: glob.sync("../styles/**/*.css"),  
  },
  output: {
    filename: 'bundle-server.js',
    path: path.join(__dirname, "dist"),
    clean: true,
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  devtool: 'inline-source-map',
  module: {
    // noParse: [ /tests/ ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        resolve: {
          fullySpecified: false
        },
        use: ['swc-loader']
      },
      {
        test: /\.(tsx)?$/,
        resolve: {
          fullySpecified: false
        },
        use: 'swc-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          // { loader: },
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local", 
                auto: true,
                exportGlobals: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
                // localIdentContext: path.resolve(__dirname, "src"),
                localIdentHashSalt: "my-custom-hash",
                // namedExport: true,
                exportLocalsConvention: "camelCase",
                exportOnlyLocals: true,
              },
            },
          },
        ],

        // include: /\.module\.css$/,
      },
      // {
      //   test: /\.css$/,
      //   use: [  "css-loader" ],
        
      //   exclude: /\.module\.css$/,
      // },      
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          { loader: 'ignore-loader' }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    //   favicon: 'public/favicon.ico'
    }),
    new Dotenv(),
    // new MiniCssExtractPlugin( {
    //   filename: "../../../build/styles.css"
    // } )
  ],
};