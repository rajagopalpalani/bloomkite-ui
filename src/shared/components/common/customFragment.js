import React, { Fragment } from 'react';

const CustomFragment = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export default CustomFragment;