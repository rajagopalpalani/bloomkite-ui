import React, { Component } from 'react';
import classNames from 'classnames';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    onChange = (e) => {
        let { target: { value } } = e;
        let { name } = this.props;
        this.setState({
            value
        }, () => {
            this.props.onChange(name, value, 'blur');
        });
    }

    onBlur = (e) => {
        let { target: { value } } = e;
        let { name } = this.props;
        if (value !== this.state.value) {
            this.props.onChange(name, value, 'blur');
        }
    }

    render() {
        let { name, value, options, size = 'sm' } = this.props;

        let items = [];
        for (let index = 0; index < options.length; index++) {
            let item = options[index];
            if (typeof item === 'string') {
                items.push({
                    value: item,
                    text: item
                });
            } else {
                items.push(item);
            }
        }

        return (
            <select
                id={name}
                value={value}
                className={classNames('form-control form-control', {size})}
                onChange={this.onChange}
                onBlur={this.onBlur}
            >
                {items.map(p => (<option key={p.value} value={p.value}>{p.text}</option>))}
            </select>
        );
    }
}

export default Select;