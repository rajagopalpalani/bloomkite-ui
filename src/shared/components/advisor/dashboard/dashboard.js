import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        showSaveButton={false}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <AdvisorLeftbar
                        userName={userName}
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                    />
                    <div className="col-10">
                        <div className="col-12">
                            <h1 className="header-margin"></h1>
                            <div>Sample DashBoard</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;