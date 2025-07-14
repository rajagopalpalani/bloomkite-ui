import React from 'react';
import { FieldArray } from 'formik';

const CustomFieldArray = (props) => {
    return (
        <FieldArray name={props.name} render={props.render}>
            {props.children}
        </FieldArray>
    );
};

export default CustomFieldArray;
