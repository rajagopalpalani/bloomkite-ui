// Server-side stub for yet-another-react-lightbox
// This prevents ESM module errors during server-side rendering
import React from 'react';

const LightboxStub = (props) => {
    // Return null on server-side to avoid hydration mismatches
    return null;
};

export default LightboxStub;
