const nodeExternals = require('./node-externals');
const projectExternals = {
    './assets/stats.json': 'commonjs ./assets/stats.json',
    './assets/app.server.js': 'commonjs ./assets/app.server.js',
    'yet-another-react-lightbox': 'commonjs yet-another-react-lightbox'
};

module.exports = {
    ...nodeExternals,
    ...projectExternals
};
