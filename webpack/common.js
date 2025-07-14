const { join } = require('path');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');

const appEnv = process.env.ENV || 'DEV';
const API = require('../src/config/setupApi')(appEnv);

module.exports = {
    output: {
        path: join(__dirname, '../public/assets'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js'],
        modules: [join(__dirname, '../node_modules'), join(__dirname, '../src')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: `[name].[ext]`
                }
            },
            { test: /\.xml$/, loader: 'xml-loader' }
        ]
    },
    plugins: [
        new WebpackBar(),
        new Webpack.DefinePlugin({
            __API__: JSON.stringify(API),
            __ENV__: JSON.stringify(appEnv)
        }),
        new CopyWebpackPlugin([
            { from: join(__dirname, '../src/images'), to: 'images' },
            {
                from: join(__dirname, '../sitemap.xml'),
                to: join(__dirname, 'sitemap.xml')
            }
        ])
    ]
};
