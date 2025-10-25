import React, { Component } from 'react';
import ReactSlider from 'react-slider';

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
                <ReactSlider
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={this.onChange}
                    className="horizontal-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .horizontal-slider {
                            width: 100%;
                            height: 20px;
                        }
                        .slider-track {
                            top: 0;
                            height: 4px;
                            background: #007bff;
                            border-radius: 2px;
                        }
                        .slider-thumb {
                            top: -8px;
                            width: 20px;
                            height: 20px;
                            background: #007bff;
                            border: 2px solid #007bff;
                            border-radius: 50%;
                            cursor: pointer;
                            outline: none;
                        }
                        .slider-thumb:hover {
                            box-shadow: 0 0 0 5px rgba(0, 123, 255, 0.25);
                        }
                    `
                }} />
            </div>
        );
    }
}

export default RangeSlider;
