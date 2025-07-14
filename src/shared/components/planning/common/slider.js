import React from 'react';
import RangeSlider from '../../common/rangeSlider';
import Switch from '../../common/switch';

const Slider = ({ options, onChange, onSwitchChange, value, getConfig,onKeyPress,maxLength, topControls = false }) => {
    let max = 10;
    let step = 1;
    let labels = {};

    if (getConfig && typeof getConfig === 'function') {
        const config = getConfig(options.value, options.isSwitchOn);
        max = config.max;
        step = config.step;
        labels = config.labels;
    }

    return (
        <div className="slidecontainer">
            <div className="header">
                <div className="title">
                    {options.title} {options.switchCss && <Switch name={options.title} checked={options.isSwitchOn} cssClass={options.switchCss} onChange={onSwitchChange} />}
                    {options.percent && ' %'}
                </div>
                {topControls && (
                    <div className="controls">
                        <input className={options.textCss} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
                    </div>
                )}
            </div>
            <div className="slider-holder">
                <RangeSlider min={options.min} max={max} value={options.value} step={step} onChange={onChange} labels={labels} size={topControls} />
                {!topControls && (
                    <div className="header">
                        <div className="controls">
                            {/* {options.switchCss == 'la-cr' ? (
                                <input className={options.textCss} type="text" value={value} readOnly />
                            ) : ( */}
                            <input className={options.textCss} type="text" value={value} maxLength={maxLength} onKeyPress={onKeyPress} onChange={(e) => onChange(e.target.value)} />
                            {/* )} */}
                            {/* {options.percent && ' %'} */}
                            {/* {options.switchCss && <Switch name={options.title} checked={options.isSwitchOn} cssClass={options.switchCss} onChange={onSwitchChange} />} */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slider;
