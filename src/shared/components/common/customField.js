import React from 'react';
import { Field } from 'formik';

const CustomField = (props) => {
    return (
        <Field name={props.name} className={props.className} type={props.type} onKeyPress={props.onKeyPress} onFocus={props.onFocus} as={props.as} validate={props.onChange}>
            {props.children}
        </Field>
    );
};

export default CustomField;
