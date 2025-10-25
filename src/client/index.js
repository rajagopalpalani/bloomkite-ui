import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../shared/App';
import '../shared/styles/index.css';

console.log('Client bundle loaded');
console.log('React version:', React.version);

// Global debug function
window.debugReact = () => {
    console.log('=== React Debug Info ===');
    console.log('React available:', typeof React !== 'undefined');
    console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');
    console.log('React version:', React?.version);
    console.log('ReactDOM version:', ReactDOM?.version);
    console.log('React root element:', document.getElementById('react-root'));
    console.log('React root content:', document.getElementById('react-root')?.innerHTML);
    console.log('========================');
};

// Make React available globally for React DevTools
window.React = React;
window.ReactDOM = ReactDOM;

/**
 * Renders a react component into the #react-root div container.
 */
const renderApp = () => {
    console.log('Starting React app render...');
    const rootElement = document.getElementById('react-root');
    if (rootElement) {
        console.log('React root element found:', rootElement);
        try {
            const root = ReactDOM.createRoot(rootElement);
            root.render(React.createElement(App));
            console.log('✅ React app rendered successfully!');
        } catch (error) {
            console.error('❌ Error rendering React app:', error);
            // Fallback rendering
            rootElement.innerHTML = `
                <div style="padding: 20px; border: 2px solid #dc3545; border-radius: 8px; margin: 20px;">
                    <h2>React Rendering Error</h2>
                    <p>Error: ${error.message}</p>
                    <p>Time: ${new Date().toLocaleString()}</p>
                </div>
            `;
        }
    } else {
        console.error('❌ React root element not found!');
    }
};

// Render the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}

// Hot Module Replacement support
if (module.hot) {
    module.hot.accept('../shared/App', () => {
        console.log('Hot reloading App component...');
        const NextApp = require('../shared/App').default;
        const rootElement = document.getElementById('react-root');
        if (rootElement) {
            const root = ReactDOM.createRoot(rootElement);
            root.render(React.createElement(NextApp));
        }
    });
}
