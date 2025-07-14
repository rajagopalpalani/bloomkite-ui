import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import ProfileHeader from '../profileHeader';
import { fetchFollowersRequest } from '../followers/Followers.actions';
import { planningMessage } from '../../constants/planningConstant';
// import { query } from 'express';
// import { url } from 'stylus';
// import { maxLength} from '../constants/commonRules';
import { createCalcQuery } from '../../actions/planning';
import CustomModal from '../common/customModal';
import OtpPopup from '../../components/otp/otpPopup';
import { sendOtp } from '../../actions/accountDetails/sendOtp';

class PlanSharePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partyId: 0,
            postedToPartyId: [],
            query: '',
            referenceId: '',
            url: '',
            plans: [],
            checked: true,
            otpType: '',
            phoneNumber: '',
            openOtpPopup: false,
            disabled: true,
            planData: this.props.planData,
            financial: false,
            loan: false,
            investment: false,
            goal: false,
            riskprofile: false
        };
        this.handleChecked = this.handleChecked.bind(this);
        this.handlePlanChecked = this.handlePlanChecked.bind(this);
        this.advId = null;
    }

    componentDidMount() {
        if (window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'))) {
            const { roleBasedId, partyId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
            this.advId = roleBasedId;
            const referenceId = window.localStorage.getItem('referenceId');
            const url = window.location.href;
            this.setState({ partyId, referenceId, url });
        }
    }

    componentDidUpdate(oldProps) {
        if (this.props.planData !== oldProps.planData) {
            this.setState({ planData: this.props.planData });
        }
    }

    handleChecked = (partyId, e) => {
        //for postedToPartyId//
        if (e.target.checked) {
            const postedToPartyId = [...this.state.postedToPartyId, partyId];
            this.setState((state) => ({ postedToPartyId: postedToPartyId }));
        } else {
            const newId = [...this.state.postedToPartyId];
            newId.splice(newId.indexOf(partyId), 1);
            this.setState((state) => ({ postedToPartyId: newId }));
        }
        setTimeout(() => {
            if (this.state.plans.length > 0 && this.state.postedToPartyId.length > 0) {
                this.setState({ disabled: false });
            }
        }, 1000);
    };

    handleTeamChecked = (partyId, e) => {
        //for postedToPartyId//
        if (e.target.checked) {
            const postedToPartyId = [...this.state.postedToPartyId, partyId];
            this.setState((state) => ({ postedToPartyId: postedToPartyId }));
        } else {
            const newId = [...this.state.postedToPartyId];
            newId.splice(newId.indexOf(partyId), 1);
            this.setState((state) => ({ postedToPartyId: newId }));
        }
        setTimeout(() => {
            if (this.state.plans.length > 0 && this.state.postedToPartyId.length > 0) {
                this.setState({ disabled: false });
            }
        }, 1000);
    };

    handlePlanChecked = (e) => {
        if (e.target.checked) {
            var plans = [...this.state.plans, e.target.id];
            this.setState((state) => ({ plans: plans }));
        } else {
            const newPlans = [...this.state.plans];
            newPlans.splice(newPlans.indexOf(e.target.id), 1);
            this.setState((state) => ({ plans: newPlans }));
        }
        setTimeout(() => {
            if (this.state.plans.length > 0 || this.state.postedToPartyId.length > 0) {
                this.setState({ disabled: false });
            }
        }, 1000);
    };

    handleChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    handleShare = () => {
        const { referenceId, currentPlans, currentPlanTab } = this.props;
        if (referenceId && !currentPlanTab) {
            //for planningLanding//
            let options = {
                partyId: this.state.partyId,
                postedToPartyId: this.state.postedToPartyId,
                query: this.state.query,
                url: this.state.url,
                referenceId: referenceId,
                plans: this.state.plans,
                checked: this.state.checked
            };
            this.props.createCalcQuery(options);
        } else if (!referenceId && !currentPlanTab) {
            //for planningPage//
            let plans = [currentPlans];
            let options = {
                partyId: this.state.partyId,
                postedToPartyId: this.state.postedToPartyId,
                query: this.state.query,
                url: this.state.url,
                referenceId: this.state.referenceId,
                plans: plans,
                checked: this.state.checked
            };
            this.props.createCalcQuery(options);
        } else {
            //for planningTab//
            let plans = [currentPlanTab];
            let options = {
                partyId: this.state.partyId,
                postedToPartyId: this.state.postedToPartyId,
                query: this.state.query,
                url: this.state.url,
                referenceId: this.state.referenceId,
                plans: plans,
                checked: this.state.checked
            };
            this.props.createCalcQuery(options);
        }
        this.setState({ plans: [], postedToPartyId: [], otpType: '' });
        this.props.onCloseModal();
    };

    capitalize(name) {
        return name && name.replace(/\b(\w)/g, (s) => s.toUpperCase());
    }

    handleFollowingClick = () => {};

    renderFollowingInfo = ({ profileImage, name: displayName, userId, partyId, i }) => {
        return (
            <div className="d-flex flex-row align-items-center" onClick={() => this.handleFollowingClick(userId)}>
                <input
                    className="signup-checkbox checkbox-margin"
                    type="checkbox"
                    id={`${partyId}-follower-${i}`}
                    name="followers"
                    onChange={(e) => this.handleChecked(partyId, e)}
                />
                <img className="rounded-circle" src={profileImage ? profileImage : '/images/avatar.png'} width="55" height="55" />
                <div className="d-flex flex-column align-items-start ml-2">
                    <label htmlFor={`${partyId}-follower-${i}`} className="font-weight-bold">
                        {this.capitalize(displayName)}
                    </label>
                </div>
            </div>
        );
    };

    renderFollowing = (item, i) => {
        return (
            <div key={`${item.partyId}-follower-${i}`} className="col-4">
                {this.renderFollowingInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2"></div>
            </div>
        );
    };

    renderTeamInfo = ({ profileImage, name: displayName, userId, partyId, i }) => {
        return (
            <div className="d-flex flex-row align-items-center" onClick={() => this.handleFollowingClick(userId)}>
                <input
                    className="signup-checkbox checkbox-margin"
                    type="checkbox"
                    id={`${partyId}-follower-${i}`}
                    name="followers"
                    onChange={(e) => this.handleTeamChecked(partyId, e)}
                />
                <img className="rounded-circle" src={profileImage ? profileImage : '/images/avatar.png'} width="55" height="55" />
                <div className="d-flex flex-column align-items-start ml-2">
                    <label htmlFor={`${partyId}-follower-${i}`} className="font-weight-bold">
                        {this.capitalize(displayName)}
                    </label>
                </div>
            </div>
        );
    };

    renderTeam = (item, i) => {
        return (
            <div key={`${item.partyId}-follower-${i}`} className="col-5">
                {this.renderTeamInfo(item)}
                <div className="d-flex flex-row align-items-center mt-2"></div>
            </div>
        );
    };

    renderPlan = () => {
        return (
            <div className="d-flex flex-row align-items-center mt-2">
                {this.props.riskprofile && (
                    <div className="planShareCheckbox">
                        <input
                            className="signup-checkbox checkbox-margin"
                            type="checkbox"
                            id={`${this.state.referenceId}-riskprofile-${1}`}
                            name="riskprofile"
                            value={riskprofile}
                            onChange={this.handlePlanChecked}
                        />
                        <label htmlFor={`${this.state.referenceId}-riskprofile-${1}`}>{planningMessage.riskProfile}</label>
                    </div>
                )}
                {this.props.goal && (
                    <div className="planShareCheckbox">
                        <input className="signup-checkbox checkbox-margin" type="checkbox" id={`${this.state.referenceId}-goal-${2}`} name="goal" value={goal} onChange={this.handlePlanChecked} />
                        <label htmlFor={`${this.state.referenceId}-goal-${2}`}>{planningMessage.goals}</label>
                    </div>
                )}
                {this.props.financial && (
                    <div className="planShareCheckbox">
                        <input className="signup-checkbox checkbox-margin" type="checkbox" id={`${this.state.referenceId}-financial-${3}`} name="financial" value={financial} onChange={this.handlePlanChecked} />
                        <label htmlFor={`${this.state.referenceId}-financial-${3}`}>{planningMessage.financial}</label>
                    </div>
                )}
                {this.props.investment && (
                    <div className="planShareCheckbox">
                        <input className="signup-checkbox checkbox-margin" type="checkbox" id={`${this.state.referenceId}-investment-${4}`} name="investment" value={investment} onChange={this.handlePlanChecked} />
                        <label htmlFor={`${this.state.referenceId}-investment-${4}`}>{planningMessage.investments}</label>
                    </div>
                )}
                {this.props.loan && (
                    <div className="planShareCheckbox">
                        <input className="signup-checkbox checkbox-margin" type="checkbox" id={`${this.state.referenceId}-loan-${5}`} name="loan" value={loan} onChange={this.handlePlanChecked} />
                        <label htmlFor={`${this.state.referenceId}-loan-${5}`}>{planningMessage.homeLoan}</label>
                    </div>
                )}
            </div>
        );
    };

    renderCheckBox = () => {
        return (
            <div className="col-12">
                <input className="signup-checkbox checkbox-margin" type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
                <span className="font-weight-bold">{planningMessage.shareTerms}</span>
            </div>
        );
    };

    handleOtp = (otpType) => {
        const { roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        const isInvestor = roleId == 2;
        const options = {
            phoneNumber: isInvestor ? this.props.investorDetails.phoneNumber : this.props.advisorDetails.phoneNumber
        };
        this.setState({ otpType, phoneNumber: options.phoneNumber });
        this.props.sendOtp(options);
        this.onOpenOtpModal();
    };

    onOpenOtpModal = () => {
        this.setState({ openOtpPopup: true });
    };

    onCloseOtpModal = () => {
        this.setState({ openOtpPopup: false });
    };

    render() {
        const {
            advisorDetails,
            savedPlans,
            followersRequest,
            currentTab,
            showBrandTag,
            loading,
            referenceId,
            currentPlans,
            isGoalChosen,
            currentPlanTab,
            role,
            team,
            goal,
            investment,
            financial,
            loan,
            riskprofile
        } = this.props;
        const { userName } = advisorDetails || {};
        const followings = (followersRequest || []).filter((item) => item.status === 1);
        return (
            <div className="modal-design">
                <CustomModal open={this.props.openPopup} showCloseIcon={false} closeOnOverlayClick={true} height="17px" width="17px">
                    {/* <div className="col-12">
                        <ProfileHeader
                            advisorDetails={advisorDetails}
                            userName={userName}
                            handleTabChange={this.handleTabChange}
                            currentTab={currentTab}
                            showBrandTag={showBrandTag}
                        />
                    </div> */}
                    <OtpPopup
                        openPopup={this.state.openOtpPopup}
                        roleName={'planning'}
                        phoneNumber={this.state.phoneNumber}
                        onCloseModal={this.onCloseOtpModal}
                        handleSharePlan={this.handleShare}
                        otpType={this.state.otpType}
                    />
                    <div className={`${this.state.planData && followings.length > 0 ? 'row col-12 advisor-gap-info model-share-popup' : 'row col-12 advisor-gap-info'}`}>
                        <div className="col-10">
                            <div className="col-12 pt-4">
                                {this.state.planData && followings.length > 0 && (
                                    <div className="planning-share-modal">
                                        <h3>Select Your Plan</h3>
                                        <div className="col-12 row share-planlist">
                                            {!savedPlans.goal && !savedPlans.loan && !savedPlans.finance && !savedPlans.riskProfile && !savedPlans.investment
                                                ? 'No Plans Saved'
                                                : this.renderPlan()}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {followings.length > 0 && <h3>Following Advisors</h3>}
                                    <div className="col-20 row">
                                        {followings && followings.length > 0 ? followings.map((item, i) => this.renderFollowing(item, i)) : !loading && 'No Results Found'}
                                    </div>
                                    {role == 3 && team && team.length > 0 && followings.length > 0 && <h3>Team Members</h3>}
                                    <div className="col-20 row">{followings.length > 0 && team && team.map((item, i) => this.renderTeam(item, i))}</div>
                                    {role == 2 && (
                                        <div className="col-12 box-align">
                                            <div className="form-group row">{role && role == 2 && followings.length > 0 && this.renderCheckBox()}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 row modal-footer-info">
                            <div className="col-2 box-align">
                                {followings && followings.length > 0 && (
                                    <button type="button" className="btn btn-primary-info" disabled={this.state.disabled} onClick={() => this.handleOtp('sharePlan')}>
                                        Share
                                    </button>
                                )}
                            </div>
                            <div className="col-1 box-align">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </CustomModal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { followersReducer, advisorReducer, investorReducer } = state;
    const { followersRequest, loading } = followersReducer;
    const { advisorDetails } = advisorReducer;
    const { investorDetails } = investorReducer;
    return {
        followersRequest,
        loading,
        advisorDetails,
        investorDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFollowersRequest: bindActionCreators(fetchFollowersRequest, dispatch),
        createCalcQuery: bindActionCreators(createCalcQuery, dispatch),
        sendOtp: bindActionCreators(sendOtp, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSharePopUp);
