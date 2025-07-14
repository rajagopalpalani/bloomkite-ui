import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../../advisor/advisorLeftbar';
import { fetchAllFollowers, approveFollower, blockFollower, fetchFollowersRequest } from '../../../components/followers/Followers.actions';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.advId = null;
    }

    componentDidMount() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        if (bloomkiteUsername) {
            let { roleBasedId } = JSON.parse(bloomkiteUsername);
            this.advId = roleBasedId;
            this.props.getAllFollowers({ advId: roleBasedId, statusId: 1 });
        }
    }

    handleConfirmClick = (user) => {
        this.props.approveFollower({
            advId: this.advId,
            statusId: 1,
            userId: user.advId
        });
    };

    handleBlockClick = (user) => {
        this.props.blockFollower({
            advId: this.advId,
            userId: user.advId,
            blockedBy: this.advId,
            statusId: 1
        });
    };

    renderFollowerInfo = ({ imagePath, displayName }) => {
        return (
            <div className="d-flex flex-row align-items-center">
                <img className="rounded-circle" src={imagePath} width="55" />
                <div className="d-flex flex-column align-items-start ml-2">
                    <span className="font-weight-bold">{displayName}</span>
                    <span className="followers">1450 Followers</span>
                </div>
            </div>
        );
    };

    renderFollower = (item, i) => {
        return (
            <div key={`follower-${i}`} className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                {this.renderFollowerInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2">
                    <button onClick={() => this.handleBlockClick(item)} className="btn btn-outline-danger btn-sm" type="button">
                        block
                    </button>
                </div>
            </div>
        );
    };

    renderRequest = (item, i) => {
        return (
            <div key={`requests-${i}`} className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                {this.renderFollowerInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2">
                    <button onClick={() => this.handleConfirmClick(item)} className="btn btn-outline-primary btn-sm mr-2" type="button">
                        Confirm
                    </button>
                    <button onClick={() => this.handleBlockClick(item)} className="btn btn-outline-danger btn-sm" type="button">
                        Cancel
                    </button>
                </div>
            </div>
        );
    };

    formatUsers = () => {
        const { followers: data } = this.props;
        const { advisors: followersAdv, investors: followersInv } = data || {};
        const users = [...(followersAdv || []), ...(followersInv || [])];
        const followers = users.filter((item) => item.status === 'active');
        const requests = users.filter((item) => item.status === 'refollow');
        return {
            requests: users,
            followers
        };
    };

    render() {
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        const { followers, requests } = this.formatUsers();
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
                    <AdvisorLeftbar userName={userName} handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} showBrandTag={this.props.showBrandTag} />
                    <div className="col-10">
                        {requests && requests.length > 0 ? (
                            <div className="col-12 pt-4">
                                <h3>Requests</h3>
                                <div className="followers-list">{requests.map((item, i) => this.renderRequest(item, i))}</div>
                            </div>
                        ) : null}
                        <div className="col-12 pt-4">
                            <h3>Followers</h3>
                            <div className="followers-list">
                                {followers && followers.length > 0 ? followers.map((item, i) => this.renderFollower(item, i)) : <div className="pl-3">No Results Found</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { chatReducer } = state;
    const { followers, followersRequest } = chatReducer;
    return {
        followers,
        followersRequest
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllFollowers: bindActionCreators(fetchAllFollowers, dispatch),
        getFollowersRequest: bindActionCreators(fetchFollowersRequest, dispatch),
        blockFollower: bindActionCreators(blockFollower, dispatch),
        approveFollower: bindActionCreators(approveFollower, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
