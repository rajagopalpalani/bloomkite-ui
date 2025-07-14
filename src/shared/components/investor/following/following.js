import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';
import { fetchAllFollowers, fetchFollowersRequest, unFollowFollower } from '../../../components/followers/Followers.actions';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../../common/fontAwesomeIcon';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.invId = null;
    }

    componentDidMount() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        if (bloomkiteUsername) {
            let { roleBasedId } = JSON.parse(bloomkiteUsername);
            this.invId = roleBasedId;
            this.props.getAllFollowers({ invId: roleBasedId, statusId: 1 });
            this.props.getFollowersRequest({ userId: roleBasedId, statusId: 1 });
        }
    }

    handleUnFollowClick = (user) => {
        this.props.unFollowFollower({
            advId: user.advId,
            userId: user.userId,
            type: 'followings'
        });
    }

    handleFollowingClick = () => { }

    renderFollowingInfo = ({ profileImage, name: displayName, userId }) => {
        return (
            <div onClick={() => this.handleFollowingClick(userId)} >
                <div className="d-flex flex-row align-items-center">
                    <img className="rounded-circle" src={profileImage ? profileImage : "/images/avatar.png"} width="55" />
                </div>
                <div className="d-flex flex-column align-items-start ml-2" >
                    <span className="font-weight-bold">{displayName}</span>
                </div>
            </div>
        );
    }

    renderFollowing = (item, i) => {
        return (
            <div key={`follower-${i}`} className="col-3 followers-padding">
                {this.renderFollowingInfo(item)}
                <div
                    className="d-flex flex-row align-items-center mt-2"
                >
                    <button onClick={() => this.handleUnFollowClick(item)} className="btn btn-outline-danger btn-sm" type="button"><FontIcon icon={faUserMinus} /></button>
                </div>
            </div>
        );
    }

    render() {
        const { investorDetails, followersRequest, currentTab, showBrandTag, handleTabChange, loading } = this.props;
        const { userName } = investorDetails || {};
        const followings = (followersRequest || []).filter((item) => item.status === 1);
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        investorDetails={investorDetails}
                        userName={userName}
                        handleTabChange={this.handleTabChange}
                        currentTab={currentTab}
                        showBrandTag={showBrandTag}
                        parentPartyId={investorDetails.parentPartyId != 0 ? investorDetails.parentPartyId : ''}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <InvestorLeftbar
                        userName={userName}
                        handleTabChange={handleTabChange}
                        currentTab={currentTab}
                        showBrandTag={showBrandTag}
                    />
                    <div className="col-10">
                        <div className="col-12 center-page planning-right row">
                            <div className="col-12 pt-4 bg-white">
                                <h3>Following</h3>
                                <div className="col-20 result-found row">
                                    {followings && followings.length > 0 ?
                                        followings.map((item, i) => this.renderFollowing(item, i)) :
                                        !loading && 'No Results Found'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { followersReducer } = state;
    const { followers, followersRequest, loading } = followersReducer;
    return {
        followers,
        followersRequest,
        loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllFollowers: bindActionCreators(fetchAllFollowers, dispatch),
        getFollowersRequest: bindActionCreators(fetchFollowersRequest, dispatch),
        unFollowFollower: bindActionCreators(unFollowFollower, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
