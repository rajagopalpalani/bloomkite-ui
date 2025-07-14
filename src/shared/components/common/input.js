import React, { Component } from 'react';
import classNames from 'classnames';

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: props.value
        };        
    }

    onChange = (e) => {
        let { target: { value } } = e;        
        let { name } = this.props;
        value = Number(value);
        if (!Number.isNaN(value)){
            this.props.onChange(name, value, e.type);            
        }
    }

    onBlur = (e, forceChange = false) => {
        let { target: { value } } = e;        
        let { name } = this.props;
        value = Number(value);
        if (!Number.isNaN(value) && (value !== this.state.value || forceChange)){    
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
        let { name, value, size = 'sm', maxLength } = this.props;
        return (
            <input
                id={name}
                type="text" 
                className={classNames('form-control form-control', {size})}              
                value={value}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyDown={this.onEnter}
                maxLength={maxLength}
                onKeyPress={(e)=>this.props.onKeyPress(e)}
            />
        );
    }
}

export default Input;