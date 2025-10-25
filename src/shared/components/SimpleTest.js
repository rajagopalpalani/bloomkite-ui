import React from 'react';

const SimpleTest = () => {
    console.log('🎨 SimpleTest component rendering...');
    console.log('📅 SimpleTest render time:', new Date().toLocaleString());
    
    return React.createElement('div', {
        style: {
            padding: '20px',
            backgroundColor: '#e7f3ff',
            border: '3px solid #007bff',
            borderRadius: '8px',
            fontFamily: 'Arial, sans-serif',
            margin: '20px'
        }
    }, [
        React.createElement('h1', { 
            key: 'title',
            style: { color: 'blue', margin: '0 0 20px 0' }
        }, '🚀 Simple React Test'),
        React.createElement('p', { 
            key: 'status',
            style: { color: 'green', fontSize: '18px', margin: '0 0 20px 0' }
        }, 'React application is working!'),
        React.createElement('p', { 
            key: 'time',
            style: { color: '#666', fontSize: '14px' }
        }, `Loaded at: ${new Date().toLocaleString()}`),
        React.createElement('button', {
            key: 'button',
            onClick: () => alert('Button clicked!'),
            style: {
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }
        }, 'Test Button')
    ]);
};

export default SimpleTest;
