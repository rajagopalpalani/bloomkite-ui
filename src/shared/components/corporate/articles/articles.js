import React from 'react';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';

class Articles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <CorporateLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} />
                    <div className="col-10">
                        <div className="col-12">
                            <h1 className="header-margin"></h1>
                            <div>Sample Articles</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Articles;
