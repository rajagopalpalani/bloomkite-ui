import React from 'react';
import classnames from 'classnames';

export default function Switch(props) {
    let { name } = props;
    name = name.replace(/ /g, '_');
    const title = props.cssClass == 'la-cr' ? (props.checked ? 'In Lakhs' : 'In Crores') : props.checked ? 'In Year/s' : 'In Month/s';
    return (
        <div className={classnames('mt-square', props.cssClass)}>
            <input id={name} type="checkbox" checked={props.checked} onChange={props.onChange} />
            <label htmlFor={name} title={title}></label>
        </div>
    );
}
