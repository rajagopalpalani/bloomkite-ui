import React from 'react';
import ReactTooltip from 'react-tooltip';

const CustomReactTooltip = (props) => {
    return (
        <ReactTooltip className={props.className} id={props.id} type={props.type} effect={props.effect}>
            {props.children}
        </ReactTooltip>
    );
};

export default CustomReactTooltip;
