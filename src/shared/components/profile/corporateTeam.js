import React from 'react';
import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routes';

const Company = (props) => {
    const { corporateLable, corporateUsername } = props;
    return (
        <div className="bloomkite-profile-aboutme">
            <h5 className="profile-title nomargin">
                <strong className="experts-head">Company</strong>
            </h5>
            <div className="awards col-lg-4 col-md-4 col-sm-12">
                <div className="bg-white padding15 profile-border">
                    <p className="nomargin aboutme-text">{corporateLable}</p>
                    <p className="nomargin aboutme-text">{corporateUsername}</p>
                    <Link to={routeConstants.CORPORTATE_PROFILE.replace(':corporateId', corporateUsername)} className="btn btn-primary team-view">
                        Company Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Company;
