import React from 'react';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import Loader from '../../common/loader';
import Particulars from '../../../containers/profile/particulars';
import { getProfileByUserName } from '../../../actions/profile';
import { connect } from 'react-redux';
import { profileSelector } from '../../../selectors/profile';

class PublicProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        if (JSON.stringify(this.props.profile) !== JSON.stringify(oldProps.profile) && this.props.publicAdvisorDetails) {
            this.props.getProfileByUserName(this.props.advisorDetails.userName);
        }
    }

    componentDidMount() {
        if (this.props.advisorDetails && this.props.advisorDetails.userName) {
            this.props.getProfileByUserName(this.props.advisorDetails.userName);
        }
    }

    render() {
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        showSaveButton={false}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                        publicAdvisorDetails={this.props.publicAdvisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <CorporateLeftbar
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right">
                            <Particulars hideProfileHeader={true} />
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}
const mapStateToProps = (state) => profileSelector(state);
export default connect(mapStateToProps, {
    getProfileByUserName
})(PublicProfile);
