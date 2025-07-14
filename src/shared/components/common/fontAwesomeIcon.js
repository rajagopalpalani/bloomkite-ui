import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontIcon = (props) => {
    return <FontAwesomeIcon className={props.className} icon={props.icon} />;
};

export default FontIcon;
