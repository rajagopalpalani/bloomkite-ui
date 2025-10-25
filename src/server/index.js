import React from 'react';
import ReactDOM from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
// Removed @loadable/server import - using direct rendering for React 16 compatibility
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import createDocument from './document';
import configureStore from '../shared/core/configureStore';
import App from '../shared/App';
import withTitle from '../shared/components/withTitle';
// Removed individual component imports - using App component instead

const isProd = process.env.ENV == 'PROD';

// Removed StaticRoute - using direct Route components

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) =>
    async (req, res) => {
        try {
            const preloadedState = {
                environment: process.env.ENV
            };
            const store = configureStore(preloadedState) || {};
            const AppComponent = (
                <HelmetProvider>
                    <Provider store={store}>
                        <StaticRouter location={req.url} context={{}}>
                            <App />
                        </StaticRouter>
                    </Provider>
                </HelmetProvider>
            );

            // Render the app to string
            const appString = ReactDOM.renderToString(AppComponent);
            
            // Simple bundle handling for React 16 compatibility
            const js = [];
            const styles = [];

            //const footerString = ReactDOM.renderToString(<Footer />);
            const helmet = {};

            const prodMeta = isProd ? `<meta name="google-site-verification" content="j-Yoc7N14nRcIZ1buA9UWC05ctd6XX13baJ25woDiC4" />` : '';

            const googleTracking = isProd
                ? `<script async src="https://www.googletagmanager.com/gtag/js?id=G-2D3E834K3X" type="text/javascript"></script>
                    <script type="text/javascript">
                    window.dataLayer = window.dataLayer || []; 
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date()); gtag('config', 'G-2D3E834K3X');
                </script>`
                : '';
            // const chunkNames = flushChunkNames();
            // const { js, styles } = flushChunks(clientStats, { chunkNames });
            const document = createDocument({
                appString,
                js,
                prodMeta,
                googleTracking,
                styles,
                helmet,
                preloadedState: JSON.stringify(preloadedState)
            });

            res.set('Content-Type', 'text/html').end(document);
        } catch (e) {
            console.error(e);
        }
    };

// export default serverRenderer; // Already exported above
