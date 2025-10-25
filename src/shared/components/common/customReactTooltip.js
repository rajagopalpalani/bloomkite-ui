import React from 'react';
import { Tooltip } from 'react-tooltip';

const CustomReactTooltip = (props) => {
    return (
        <Tooltip className={props.className} id={props.id} variant={props.type} place={props.effect}>
            {props.children}
        </Tooltip>
    );
};

export default CustomReactTooltip;
