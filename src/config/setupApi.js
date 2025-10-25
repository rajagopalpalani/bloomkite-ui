const setupApi = function (appEnv) {
    switch (appEnv) {
        case 'PROD':
            return 'https://api-prod.bloomkite.com/app';
        case 'STAGE':
            return 'https://api-prod.bloomkite.com/app';
        case 'DEV':
            return 'http://localhost:8080';
        default:
            return 'http://localhost:8080';
    };
};

module.exports = setupApi;
