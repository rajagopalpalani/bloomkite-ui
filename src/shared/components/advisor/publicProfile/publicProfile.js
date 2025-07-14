import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import Particulars from '../../../containers/profile/particulars';

const PublicProfile = (props) => {
    const { advisorDetails } = props;
    const { userName } = advisorDetails || {};
    return (
        <div>
            <div className="col-12">
                <ProfileHeader
                    name={props.advisorDetails.displayName || (props.advisorDetails && props.advisorDetails.name)}
                    location={props.advisorDetails && props.advisorDetails.city}
                    designation={props.advisorDetails.designation}
                    showSaveButton={false}
                    onPublish={props.onPublish}
                    advisorDetails={props.advisorDetails}
                    publicAdvisorDetails={props.publicAdvisorDetails}
                />
            </div>
            <div className="row col-12  advisor-gap">
                <AdvisorLeftbar
                    userName={userName}
                    handleTabChange={props.handleTabChange}
                    currentTab={props.currentTab}
                    showBrandTag={props.showBrandTag}
                    parentPartyId={props.advisorDetails.parentPartyId != 0 ? props.advisorDetails.parentPartyId : ''}
                />
                <div className="col-10  nopadding">
                    <div className="col-12 center-page planning-right">
                        <Particulars hideProfileHeader={true} loaderHide={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
