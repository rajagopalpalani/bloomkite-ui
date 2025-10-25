import React, { Component, useState } from 'react';

// Import existing components for testing
import MinimalTest from './MinimalTest';
import TestComponent from './TestComponent';

// Create additional test components
const ButtonTest = () => {
    const [count, setCount] = useState(0);
    
    return React.createElement('div', {
        style: { 
            padding: '20px', 
            border: '2px solid #28a745', 
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
        }
    }, [
        React.createElement('h3', { key: 'title' }, 'Button Component Test'),
        React.createElement('p', { key: 'count' }, `Count: ${count}`),
        React.createElement('button', {
            key: 'button',
            onClick: () => setCount(count + 1),
            style: {
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
            }
        }, 'Increment'),
        React.createElement('button', {
            key: 'reset',
            onClick: () => setCount(0),
            style: {
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }
        }, 'Reset')
    ]);
};

const FormTest = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form submitted: ${JSON.stringify(formData)}`);
    };
    
    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };
    
    return React.createElement('div', {
        style: { 
            padding: '20px', 
            border: '2px solid #ffc107', 
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: '#fffbf0'
        }
    }, [
        React.createElement('h3', { key: 'title' }, 'Form Component Test'),
        React.createElement('form', {
            key: 'form',
            onSubmit: handleSubmit,
            style: { display: 'flex', flexDirection: 'column', gap: '10px' }
        }, [
            React.createElement('input', {
                key: 'name',
                type: 'text',
                placeholder: 'Name',
                value: formData.name,
                onChange: handleChange('name'),
                style: {
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }
            }),
            React.createElement('input', {
                key: 'email',
                type: 'email',
                placeholder: 'Email',
                value: formData.email,
                onChange: handleChange('email'),
                style: {
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }
            }),
            React.createElement('button', {
                key: 'submit',
                type: 'submit',
                style: {
                    padding: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }, 'Submit')
        ])
    ]);
};

const ListTest = () => {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [newItem, setNewItem] = useState('');
    
    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem]);
            setNewItem('');
        }
    };
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    
    return React.createElement('div', {
        style: { 
            padding: '20px', 
            border: '2px solid #6f42c1', 
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: '#f8f5ff'
        }
    }, [
        React.createElement('h3', { key: 'title' }, 'List Component Test'),
        React.createElement('div', {
            key: 'input',
            style: { display: 'flex', gap: '10px', marginBottom: '10px' }
        }, [
            React.createElement('input', {
                key: 'text',
                type: 'text',
                value: newItem,
                onChange: (e) => setNewItem(e.target.value),
                placeholder: 'Add new item',
                style: {
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    flex: 1
                }
            }),
            React.createElement('button', {
                key: 'add',
                onClick: addItem,
                style: {
                    padding: '8px 16px',
                    backgroundColor: '#6f42c1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }
            }, 'Add')
        ]),
        React.createElement('ul', {
            key: 'list',
            style: { listStyle: 'none', padding: 0 }
        }, items.map((item, index) => 
            React.createElement('li', {
                key: index,
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    border: '1px solid #eee',
                    marginBottom: '5px',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                }
            }, [
                React.createElement('span', { key: 'text' }, item),
                React.createElement('button', {
                    key: 'remove',
                    onClick: () => removeItem(index),
                    style: {
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }
                }, 'Remove')
            ])
        ))
    ]);
};

export default class ComponentShowcase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeComponent: 'all'
        };
    }

    render() {
        const { activeComponent } = this.state;
        
        const components = {
            minimal: MinimalTest,
            test: TestComponent,
            button: ButtonTest,
            form: FormTest,
            list: ListTest
        };
        
        const renderComponent = (name, Component) => {
            if (activeComponent === 'all' || activeComponent === name) {
                return React.createElement('div', { key: name }, React.createElement(Component));
            }
            return null;
        };
        
        return React.createElement('div', {
            style: { 
                padding: '20px', 
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f8f9fa',
                minHeight: '100vh'
            }
        }, [
            React.createElement('header', {
                key: 'header',
                style: {
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
            }, [
                React.createElement('h1', {
                    key: 'title',
                    style: { margin: '0 0 20px 0', color: '#333' }
                }, '🧪 React Component Testing Showcase'),
                React.createElement('p', {
                    key: 'description',
                    style: { margin: '0 0 20px 0', color: '#666' }
                }, 'Test individual React components in isolation'),
                React.createElement('div', {
                    key: 'filters',
                    style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }
                }, [
                    React.createElement('button', {
                        key: 'all',
                        onClick: () => this.setState({ activeComponent: 'all' }),
                        style: {
                            padding: '8px 16px',
                            backgroundColor: activeComponent === 'all' ? '#007bff' : '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }
                    }, 'All Components'),
                    ...Object.keys(components).map(name => 
                        React.createElement('button', {
                            key: name,
                            onClick: () => this.setState({ activeComponent: name }),
                            style: {
                                padding: '8px 16px',
                                backgroundColor: activeComponent === name ? '#007bff' : '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }
                        }, name.charAt(0).toUpperCase() + name.slice(1))
                    )
                ])
            ]),
            React.createElement('main', {
                key: 'main',
                style: { display: 'flex', flexDirection: 'column', gap: '20px' }
            }, Object.entries(components).map(([name, Component]) => 
                renderComponent(name, Component)
            ))
        ]);
    }
}
