/**
 * Bloomkite Application Entry Point
 * 
 * This is the main entry file for the Bloomkite application.
 * It handles both development and production environments with client-side rendering only.
 */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('winston');

// Create Express app
const app = express();

// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 8080;

// Configure logging
logger.configure({
    level: 'info',
    format: logger.format.combine(
        logger.format.timestamp(),
        logger.format.errors({ stack: true }),
        logger.format.json()
    ),
    transports: [
        new logger.transports.Console({
            format: logger.format.combine(
                logger.format.colorize(),
                logger.format.simple()
            )
        })
    ]
});

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://ajax.googleapis.com",
                "https://cdnjs.cloudflare.com",
                "https://cdn.jsdelivr.net",
                "https://code.jquery.com",
                "https://checkout.razorpay.com"
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
            frameSrc: ["'none'"],
        },
    },
}));

// Development configuration - Webpack dev server
if (isDevelopment) {
    logger.info('Configuring development environment with webpack dev server...');
    
    // Import webpack and middleware
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    
    // Load webpack configurations
    const clientConfig = require('../webpack/client');
    const serverConfig = require('../webpack/server');
    
    // Create webpack compiler
    const multiCompiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];
    
    // Configure webpack dev middleware
    app.use(webpackDevMiddleware(multiCompiler, {
        publicPath: clientConfig.output.publicPath,
        writeToDisk(filePath) {
            // Write both server and client bundles and CSS files to disk
            return /app\.(server|client)\.(js|css)$/.test(filePath) || /vendors\.(js|css)$/.test(filePath) || /runtime\.js$/.test(filePath);
        }
    }));
    
    // Configure webpack hot middleware
    app.use(webpackHotMiddleware(clientCompiler));
    
    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, '../public')));
    
    // Development HTML template - Client-side rendering only
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
                    <link rel="stylesheet" href="/app.main.css">
                </head>
                <body>
                    <div id="react-root"></div>
                    <!-- CDN Libraries -->
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
                    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    <!-- React Bundle -->
                    <script type="text/javascript" src="/app.main.js"></script>
                </body>
            </html>
        `);
    });
} else {
    // Production configuration - Client-side rendering only
    logger.info('Configuring production environment...');
    
    // Serve static files from dist directory (webpack build output)
    app.use(express.static(path.join(__dirname, '../dist')));
    
    // Production HTML template - Client-side rendering only
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
                    <link rel="stylesheet" href="/app.main.css">
                </head>
                <body>
                    <div id="react-root"></div>
                    <!-- CDN Libraries -->
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
                    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
                    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    <!-- React Bundle -->
                    <script type="text/javascript" src="/app.main.js"></script>
                </body>
            </html>
        `);
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Application error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
    logger.info(`Bloomkite server running on port ${PORT}`);
    logger.info(`Environment: ${isDevelopment ? 'development' : 'production'}`);
    logger.info(`Client-side rendering only`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
    });
});

module.exports = app;