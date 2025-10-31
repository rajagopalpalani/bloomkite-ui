import express from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { log } from 'winston';
//import dotenv from 'dotenv';

/**
 * Configures hot reloading and assets paths for local development environment.
 * Use the `npm start` command to start the local development server.
 *
 * @param app Express app
 */

//dotenv.config();

const configureDevelopment = (app) => {
    const clientConfig = require('../webpack/client');
    const serverConfig = require('../webpack/server');
    const { publicPath, path } = clientConfig.output;

    const multiCompiler = require('webpack')([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];

    app.use(publicPath, express.static(path));
    app.use(
        require('webpack-dev-middleware')(multiCompiler, {
            publicPath,
            writeToDisk(filePath) {
                // Write both server and client bundles and CSS files to disk
                return /app\.(server|client)\.(js|css)$/.test(filePath) || /vendors\.(js|css)$/.test(filePath) || /runtime\.js$/.test(filePath);
            }
        })
    );
    app.use(require('webpack-hot-middleware')(clientCompiler));
    
        // Client-side rendering only
        app.get('*', (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,shrink-to-fit=no">
                        <meta charset="utf-8">
                        <title>Bloomkite</title>
                        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" as="style" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" as="style">
                        <link rel="preload" href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" as="style">
                        <link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js" as="script">
                        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" as="script">
                        <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" as="script">
                        <link rel="preload" href="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js" as="script">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                        <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
                        <link href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" rel="stylesheet">
                        <link rel="shortcut icon" href="/favicon.png">
                        <link rel="stylesheet" href="/app.client.css">
                    </head>
                    <body>
                        <div id="react-root"></div>
                        <!-- Other libraries -->
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
                        <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
                        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                        <script type="text/javascript" src="/app.client.js"></script>
                    </body>
                </html>
            `);
        });
};

/**
 * Configures assets paths for production environment.
 * This environment is used in deployment and inside the docker container.
 * Use the `npm run build` command to create a production build.
 *
 * @param app Express app
 */
const configureProduction = (app) => {
    const publicPath = '/';
    const outputPath = join(__dirname, 'assets');

    app.use(publicPath, express.static(outputPath));
    
    // Client-side rendering only for production
    app.get('*', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,shrink-to-fit=no">
                    <meta charset="utf-8">
                    <title>Bloomkite</title>
                    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" as="style" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" as="style">
                    <link rel="preload" href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" as="style">
                    <link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js" as="script">
                    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" as="script">
                    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" as="script">
                    <link rel="preload" href="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js" as="script">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
                    <link href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.min.css" rel="stylesheet">
                    <link rel="shortcut icon" href="/favicon.png">
                    <link rel="stylesheet" href="/app.client.css">
                </head>
                <body>
                    <div id="react-root"></div>
                    <!-- Other libraries -->
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
                    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    <script src="/app.client.js"></script>
                </body>
            </html>
        `);
    });
};

const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';

log('info', `Configuring server for environment: ${process.env.NODE_ENV}...`);

// Disable CSP for local development to allow all domains
if (isDevelopment) {
    app.use(helmet({
        contentSecurityPolicy: false
    }));
} else {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'", 
                    "'unsafe-eval'", 
                    "'unsafe-inline'",
                    "https://ajax.googleapis.com",
                    "https://cdnjs.cloudflare.com",
                    "https://cdn.jsdelivr.net",
                    "https://code.jquery.com",
                    "https://checkout.razorpay.com",
                    "https://unpkg.com"
                ],
                styleSrc: [
                    "'self'", 
                    "'unsafe-inline'",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "https://code.jquery.com"
                ],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "ws:", "wss:", "http:", "https:", "http://ec2-54-91-87-30.compute-1.amazonaws.com:8080"],
                fontSrc: ["'self'", "https:", "data:"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'", "https://checkout.razorpay.com", "https://api.razorpay.com"],
            },
        },
    }));
}

// app.get('*.js', function (req, res, next) {
//     req.url = req.url + '.br';
//     res.set('Content-Encoding', 'br');
//     res.set('Content-Type', 'text/javascript');
//     next();
// });

app.set('port', process.env.PORT || 8080);

if (isDevelopment) {
    configureDevelopment(app);
} else {
    configureProduction(app);
}

app.listen(app.get('port'), () => log('info', `Server listening on port ${app.get('port')}...`));
