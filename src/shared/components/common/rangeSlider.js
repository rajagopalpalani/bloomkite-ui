import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class RangeSlider extends Component {
    constructor(props) {
        super(props);
    }

    getLabelItems(props) {
        const { labels } = props;
        const labelItems = {};
        if (labels) {
            for (let index = 0; index < labels.length; index++) {
                const value = labels[index];
                labelItems[value] = value.toString();
            }
        }
        return labelItems;
    }

    onChange = (value) => {
        if (!Number.isInteger(value)) {
            value = value.toFixed(2);
        }
        this.props.onChange(Number(value));
    };

    render() {
        const { value, min, max, step = 1 } = this.props;
        
        return (
            <div className={!this.props.size ? 'slider half-slider' : 'slider full-slider'}>
                <InputRange formatLabel={(value) => `${value}`} maxValue={max} minValue={min} step={step} value={value} onChange={this.onChange} />
            </div>
        );
    }
}

export default RangeSlider;
