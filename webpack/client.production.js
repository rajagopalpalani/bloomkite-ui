const merge = require('webpack-merge');
const common = require('./common');
const { join } = require('path');
const path = require('path');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    name: 'client',
    target: 'web',
    entry: [join(__dirname, '../src/client/index')],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].chunk.[hash].js'
    },
    module: {
        rules: [
            {
                test: /(\.css|\.scss)$/,
                // exclude: /node_modules/,
                use: [
                    'isomorphic-style-loader',
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
                            plugins: (loader) => [require('postcss-import')()]
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
                // vendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'vendor'
                // }
            }
        }
    },
    plugins: [
        new LoadablePlugin({ filename: 'loadable-client.json', writeToDisk: true }),
        new ExtractCssChunksPlugin(),
        new StatsWebpackPlugin('stats.json'),
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new BrotliGzipPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});
