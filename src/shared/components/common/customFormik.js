import React from 'react';
import { Formik } from 'formik';

const CustomFormik = (props) => {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
            innerRef={props.innerRef}
            enableReinitialize={props.enableReinitialize}>
            {props.children}
        </Formik>
    );
};

export default CustomFormik;
