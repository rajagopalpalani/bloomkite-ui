const merge = require('webpack-merge');
const common = require('./common');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const extendedNodeExternals = require('../scripts/extended-node-externals');

module.exports = merge(common, {
    mode: 'production',
    target: 'node',
    externals: extendedNodeExternals,
    node: {
        __dirname: false,
        __filename: false
    },
    entry: {
        index: [join(__dirname, '../src/index')],
        chat: [join(__dirname, '../src/node-server/index')]
    },
    output: {
        filename: '[name].js',
        path: join(__dirname, '../public')
    },
    plugins: [
        new CopyPlugin([
            {
                from: join(__dirname, '../package.json'),
                to: join(__dirname, '../public/package.json')
            },
            {
                from: join(__dirname, '../sitemap.xml'),
                to: join(__dirname, '../public/sitemap.xml')
            },
            {
                from: join(__dirname, '../google374c4b78ea2a89d0.html'),
                to: join(__dirname, '../public/google374c4b78ea2a89d0.html')
            },
            {
                from: join(__dirname, '../robots.txt'),
                to: join(__dirname, '../public/robots.txt')
            }
        ])
    ]
});
