const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
  mode: isProduction ? 'production' : 'development',

  // Enable persistent caching for faster rebuilds
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },

  entry: {
    main: path.resolve(__dirname, 'src/client/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'app.[name].js' : '[name].js',
    chunkFilename: isProduction ? '[name].chunk.js' : '[name].chunk.js',
    clean: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@containers': path.resolve(__dirname, 'src/shared/containers'),
      '@images': path.resolve(__dirname, 'src/images')
    },
    // Cache module resolution results
    cacheWithContext: false
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Enable Babel cache for faster rebuilds
            cacheDirectory: true,
            cacheCompression: false, // Faster builds, slightly larger cache
            presets: [
              ['@babel/preset-env', { 
                targets: { browsers: ['last 2 versions'] },
                // Use loose mode for faster compilation
                loose: true
              }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-class-properties',
              '@babel/plugin-transform-private-methods'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: isDevelopment ? '[local]' : '[hash:base64:8]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('postcss-import')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },
      {
        test: /\.xml$/,
        use: 'xml-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : false
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: 'images',
          // Only copy changed files
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: '.',
          globOptions: {
            // Ignore old build files - they will be generated fresh by webpack
            ignore: ['**/index.html', '**/app.client.js', '**/app.server.js', '**/app.client.css', '**/vendors.js', '**/runtime.js']
          },
          // Only copy changed files
          noErrorOnMissing: true
        }
      ]
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_APP_ENV': JSON.stringify(process.env.REACT_APP_ENV || 'development'),
      __API__: JSON.stringify(require('./src/config/setupApi')(process.env.ENV || 'DEV')),
      __ENV__: JSON.stringify(process.env.ENV || 'DEV')
    }),

    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: 'app.[name].css',
        chunkFilename: '[name].chunk.css'
      })
    ] : [
      new webpack.HotModuleReplacementPlugin()
    ])
  ],

  optimization: {
    // Use moduleIds: 'deterministic' for better caching
    moduleIds: 'deterministic',
    // Only minimize in production
    minimize: isProduction,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    // Use faster minification in development
    ...(isProduction ? {} : {
      usedExports: false
    })
  },

  // Faster source maps for development, no source maps for production builds
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,

  devServer: {
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    open: false, // Disable auto-open for faster startup
    // Optimize compilation performance
    webSocketServer: 'ws',
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
};
