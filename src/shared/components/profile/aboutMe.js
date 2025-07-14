import React from 'react';

const AboutMe = (props) => {
    const { text } = props;
    if (!text) {
        return null;
    }
    return (
        <div className="bloomkite-profile-aboutme">
            <h5 className="profile-title"><strong className="experts-head">About Me</strong></h5>
            <div className="row nopadding nomargin">
                <p className="nomargin aboutme-text">{text}</p>
            </div>
        </div>
    );
};

export default AboutMe;
