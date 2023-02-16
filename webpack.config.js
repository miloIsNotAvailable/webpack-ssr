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
    alias: {
      "@styles": path.join( __dirname, "styles" )
    },
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
  entry: {
    js: glob.sync("./src/**/*.tsx"),    
    // css: glob.sync("./styles/**/*.css"),  
  },
  output: {
    filename: 'bundle.[hash].[id]',
    path: path.join(__dirname, "build"),
    clean: true
  },
  devtool: 'inline-source-map',
  module: {
    // noParse: [ /tests/ ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /components/],
        resolve: {
          fullySpecified: false
        },
        use: ['swc-loader']
      },
      {
        test: /\.(tsx|ts)?$/,
        resolve: {
          fullySpecified: false
        },
        use: 'swc-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
                exportOnlyLocals: false,
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
                exportOnlyLocals: false,
              },
            },
          },
        ],

        exclude: /\.module\.css$/,
      },      
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
    new MiniCssExtractPlugin( {
      filename: "styles.css",
    } )
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};