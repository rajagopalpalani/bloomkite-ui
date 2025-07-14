const setupApi = function (appEnv) {
    switch (appEnv) {
        case 'PROD':
            return 'https://api-prod.bloomkite.com/app';
        case 'STAGE':
            return 'https://api-prod.bloomkite.com/app';
        case 'DEV':
            return 'http://bloomkite-api-d.us-east-2.elasticbeanstalk.com/app';
        default:
            return 'http://bloomkite-api-d.us-east-2.elasticbeanstalk.com/app';
    };
};

module.exports = setupApi;
