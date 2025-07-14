import React from 'react';
import { ErrorMessage } from 'formik';

const Error = ({ name }) => (
    <div className="error-message">
        <ErrorMessage
            name={name}
        />
    </div>
);

export default Error;