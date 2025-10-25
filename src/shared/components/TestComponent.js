import React from 'react';

const TestComponent = () => {
    console.log('TestComponent rendering...');
    return (
        <div style={{ padding: '20px', border: '2px solid green', margin: '20px' }}>
            <h2>✅ Test Component Loaded Successfully!</h2>
            <p>This proves React is working correctly.</p>
            <p>Current time: {new Date().toLocaleString()}</p>
        </div>
    );
};

export default TestComponent;



