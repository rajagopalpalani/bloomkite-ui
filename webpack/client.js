const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');
const { join } = require('path');
const path = require('path');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    name: 'client',
    target: 'web',
    entry: [
        'webpack-hot-middleware/client',
        join(__dirname, '../src/client/index')
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].chunk.[hash].js'
    },
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                // exclude: /node_modules/,
                use: [
                    "isomorphic-style-loader",
                    ExtractCssChunksPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]',
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'src', 'scss')],
                            sourceMap: true
                        }
                    }
                ]

            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'bootstrap'
        },
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                }
            }
        }
    },
    plugins: [
        new LoadablePlugin({ filename: 'loadable-client.json', writeToDisk: true }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractCssChunksPlugin()
    ]
});
