import React, { Component } from 'react';
import { formatMoney } from '../../helpers/planningHelper';
import classNames from 'classnames';

class CurrencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            value: props.value
        };
    }

    toggleFocus = (e) => {
        this.setState({
            isFocused: true
        });
    }

    onChange = (e) => {
        let { target: { value } } = e;
        let { name, type = 'int' } = this.props;
        value = value.replace(/,/g, '')
        if (type !== 'decimal') {
            value = Number(value);
        }
        if (!Number.isNaN(value)) {
            this.props.onChange(name, value, e.type);
        }
    }

    onBlur = (e, forceChange = false) => {
        this.setState({
            isFocused: false
        });
        let { target: { value } } = e;
        let { name } = this.props;
        value = Number(value);
        if (!Number.isNaN(value) && (value !== this.state.value || forceChange)) {
            this.props.onChange(name, value, 'blur');
            this.setState({
                value
            });
        }
    }

    onEnter = (e) => {
        if (e.key === 'Enter') {
            this.onBlur(e, true);
        }
    }

    render() {
        let { name, value, size = 'lg', disabled } = this.props;
        let { isFocused } = this.state;
        if (!isFocused) {
            value = formatMoney(value.toString());
        }

        return (
            <input
                id={name}
                type="text"
                className={classNames('form-control form-control', { size })}
                value={value}
                onChange={this.onChange}
                onFocus={this.toggleFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onEnter}
                disabled={disabled}
            />
        );
    }
}

export default CurrencyInput;