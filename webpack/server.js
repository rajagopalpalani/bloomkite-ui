const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const path = require('path');
const nodeExternals = require('../scripts/node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    entry: [join(__dirname, '../src/server/index')],
    // devtool: 'inline-source-map',
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                use: [
                    "isomorphic-style-loader",
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
    plugins: [
        new LoadablePlugin({ filename: 'loadable-server.json', writeToDisk: true }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
});
