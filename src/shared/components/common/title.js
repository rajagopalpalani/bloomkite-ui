import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({ title, metaDescription, metaKeyWords }) => {
    const appName = 'Bloomkite';
    const text = title ? `${title} | ${appName}` : appName;
    return (
        <Helmet>
            <title>{text}</title>
            {metaDescription && <meta name="description" content={metaDescription} />}
            {metaKeyWords && <meta name="keywords" content={metaKeyWords} />}
        </Helmet>
    );
};

export default Title;
