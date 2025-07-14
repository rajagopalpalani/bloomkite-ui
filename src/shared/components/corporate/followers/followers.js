import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import { fetchAllFollowers, approveFollower, blockFollower, fetchFollowersRequest, unFollowFollower } from '../../../components/followers/Followers.actions';
import FontIcon from '../../common/fontAwesomeIcon';
import { faCheckCircle, faCommentDots, faUserLock, faUserMinus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

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
            this.props.getFollowersRequest({ userId: roleBasedId, statusId: 1 });
        }
    }

    handleConfirmClick = (user) => {
        this.props.approveFollower({ advId: this.advId, userId: user.userId });
    };

    handleBlockClick = (user) => {
        this.props.blockFollower({
            advId: this.advId,
            userId: user.userId,
            blockedBy: this.advId,
            statusId: 1,
            type: 'followings'
        });
    };

    handleUnFollowClick = (user) => {
        this.props.unFollowFollower({
            advId: user.advId,
            userId: user.userId,
            type: 'followings'
        });
    };

    handleFollowerClick = () => {};

    handleFollowingClick = () => {};

    renderFollowerInfo = ({ profileImage, name: displayName, advId }) => {
        return (
            <div onClick={() => this.handleFollowerClick(advId)}>
                <div className="d-flex flex-row align-items-center">
                    <img className="rounded-circle" src={profileImage ? profileImage : '/images/avatar.png'} width="55" />
                </div>
                <div className="d-flex flex-column align-items-start ml-2">
                    <span className="font-weight-bold">{displayName}</span>
                </div>
            </div>
        );
    };

    renderFollowingInfo = ({ profileImage, name: displayName, userId }) => {
        return (
            <div onClick={() => this.handleFollowingClick(userId)}>
                <div className="d-flex flex-row align-items-center">
                    <img className="rounded-circle" src={profileImage ? profileImage : '/images/avatar.png'} width="55" />
                </div>
                <div className="d-flex flex-column align-items-start ml-2">
                    <span className="font-weight-bold">{displayName}</span>
                </div>
            </div>
        );
    };

    renderFollower = (item, i) => {
        return (
            <div key={`follower-${i}`} className="col-3 followers-padding">
                {this.renderFollowerInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2">
                    <button onClick={() => this.handleBlockClick(item)} className="btn btn-outline-danger btn-sm mr-2" type="button">
                        <FontIcon icon={faUserLock} />
                    </button>
                    <button className="btn btn-outline-info btn-sm mr-2" type="button">
                        <FontIcon icon={faCommentDots} />
                    </button>
                </div>
            </div>
        );
    };

    renderFollowing = (item, i) => {
        return (
            <div key={`follower-${i}`} className="col-3 followers-padding">
                {this.renderFollowingInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2">
                    <button onClick={() => this.handleUnFollowClick(item)} className="btn btn-outline-danger btn-sm" type="button">
                        <FontIcon icon={faUserMinus} />
                    </button>
                </div>
            </div>
        );
    };

    renderRequest = (item, i) => {
        return (
            <div key={`requests-${i}`} className="col-3 followers-padding">
                {this.renderFollowerInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2">
                    <button onClick={() => this.handleConfirmClick(item)} className="btn btn-outline-success btn-sm mr-2" type="button">
                        <FontIcon icon={faCheckCircle} />
                    </button>
                    <button onClick={() => this.handleBlockClick(item)} className="btn btn-outline-danger btn-sm mr-2" type="button">
                        <FontIcon icon={faWindowClose} />
                    </button>
                </div>
            </div>
        );
    };

    render() {
        const { advisorDetails, followers, followersRequest, currentTab, showBrandTag, handleTabChange, loading, onPublish } = this.props;
        const { userName } = advisorDetails || {};
        const contacts = (followers || []).filter((item) => item.status === 1);
        const requests = (followers || []).filter((item) => item.status === 4);
        const followings = (followersRequest || []).filter((item) => item.status === 1);
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        advisorDetails={advisorDetails}
                        userName={userName}
                        handleTabChange={this.handleTabChange}
                        currentTab={currentTab}
                        showBrandTag={showBrandTag}
                        onPublish={onPublish}
                        parentPartyId={advisorDetails.parentPartyId != 0 ? advisorDetails.parentPartyId : ''}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <CorporateLeftbar userName={userName} handleTabChange={handleTabChange} currentTab={currentTab} showBrandTag={showBrandTag} />
                    <div className="col-10">
                        <div className="col-12 center-page planning-right row">
                            {requests && requests.length > 0 ? (
                                <div className="col-12 pt-4 bg-white">
                                    <h3>Requests</h3>
                                    <div className="col-20 row">{requests.map((item, i) => this.renderRequest(item, i))}</div>
                                </div>
                            ) : null}
                            <div className="col-12 pt-4 bg-white">
                                <h3 className="followers-color">Followers</h3>
                                <div className="col-20 result-found row">
                                    {contacts && contacts.length > 0
                                        ? contacts.map((item, i) => this.renderFollower(item, i))
                                        : !loading && <div className="pl-4">No Results Found</div>}
                                </div>
                            </div>
                            <div className="col-12 pt-4 bg-white">
                                <h3 className="followers-color">Following</h3>
                                <div className="col-20 result-found row">
                                    {followings && followings.length > 0
                                        ? followings.map((item, i) => this.renderFollowing(item, i))
                                        : !loading && <div className="pl-4">No Results Found</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { followersReducer } = state;
    const { followers, followersRequest, loading } = followersReducer;
    return {
        followers,
        followersRequest,
        loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllFollowers: bindActionCreators(fetchAllFollowers, dispatch),
        getFollowersRequest: bindActionCreators(fetchFollowersRequest, dispatch),
        blockFollower: bindActionCreators(blockFollower, dispatch),
        approveFollower: bindActionCreators(approveFollower, dispatch),
        unFollowFollower: bindActionCreators(unFollowFollower, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
