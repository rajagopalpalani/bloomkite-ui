import React from 'react';

const MinimalTest = () => {
    console.log('MinimalTest component rendering...');
    return React.createElement('div', {
        style: { 
            padding: '20px', 
            border: '2px solid red', 
            margin: '20px',
            backgroundColor: '#fff3cd',
            color: '#856404'
        }
    }, [
        React.createElement('h2', { key: 'title' }, '🔥 Minimal React Test'),
        React.createElement('p', { key: 'msg' }, 'If you see this, React is working!'),
        React.createElement('p', { key: 'time' }, `Time: ${new Date().toLocaleString()}`)
    ]);
};

export default MinimalTest;




