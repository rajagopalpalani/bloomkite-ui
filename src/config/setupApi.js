const setupApi = function (appEnv) {
    switch (appEnv) {
        case 'PROD':
            return 'http://ec2-54-91-87-30.compute-1.amazonaws.com:8080/';
        case 'STAGE':
            return 'http://ec2-54-91-87-30.compute-1.amazonaws.com:8080/';
        case 'DEV':
            return 'http://ec2-54-91-87-30.compute-1.amazonaws.com:8080/';
        default:
            return 'http://localhost:8080';
    };
};

module.exports = setupApi;
