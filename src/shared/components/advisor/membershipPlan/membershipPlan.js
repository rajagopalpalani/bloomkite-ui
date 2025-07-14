import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import Loader from '../../common/loader';
import { fetchAllMembershipPlan, fetchSubscription, createOrderNumber, cancelSubscription, onPaid } from '../../../actions/membership';
import { connect } from 'react-redux';
import { membershipSelector } from '../../../selectors/membership';
import SubscriptionInvoice from '../../payment/subscriptionInvoice';
import moment from 'moment';
import PaymentResponse from '../../payment/paymentResponse';

class MembershipPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isYearly: false,
            plans: [],
            open: false,
            selectedPlan: {},
            planActivated: false,
            subscription: this.props.membership.subscription,
            openPayResponse: false,
            type: 'singlepayment',
            checked: false
        };
    }

    componentDidMount() {
        const { advisorDetails } = this.props;
        this.props.fetchSubscription({ advId: advisorDetails.advId });
        if (!this.props.membership.membershipPlans || this.props.membership.membershipPlans.length == 0) {
            this.props.fetchAllMembershipPlan({});
        }
        if (this.props.membership.membershipPlans && this.props.membership.membershipPlans.length !== 0) {
            const yearlyPlans = (this.props.membership.membershipPlans || []).filter((plan) => plan.period === 'yearly');
            this.setState({ plans: yearlyPlans });
        }
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.membership) != JSON.stringify(oldProps.membership)) {
            const yearlyPlans = (this.props.membership.membershipPlans || []).filter((plan) => plan.period === 'yearly');
            this.setState({ plans: yearlyPlans });
            const { subscription } = this.props.membership;
            if (subscription) {
                this.setState({ subscription });
            }
            const { subOrderNumber } = oldProps.membership;
            if (this.props.membership.subOrderNumber !== subOrderNumber) {
                this.setState({ open: true });
            }
            if (
                (this.props.membership.paymentClosed || this.props.membership.paymentFailure || this.props.membership.paymentSuccess) &&
                ((subscription && subscription.status !== 'active' && !subscription.singlePayment) || !subscription)
            ) {
                this.setState({ openPayResponse: true });
            }
        }
    }

    handleClosePayResponse = () => {
        this.setState({ openPayResponse: false });
        if (!this.props.membership.paymentSuccess) {
            this.props.onPaid({ type: 'default' });
        }
    };

    handleCheckBoxChange = () => {
        this.setState({ isYearly: !this.state.isYearly }, () => {
            const yearlyPlans = (this.props.membership.membershipPlans || []).filter((plan) => plan.period === 'yearly');
            const monthlyPlans = (this.props.membership.membershipPlans || []).filter((plan) => plan.period === 'monthly');
            this.setState({ plans: this.state.isYearly ? yearlyPlans : monthlyPlans });
        });
    };

    handleJoin = () => {
        let item = this.state.plans[0];
        let { advisorDetails } = this.props;
        let options = {
            emailId: advisorDetails.emailId,
            name: advisorDetails.name,
            phoneNumber: advisorDetails.phoneNumber,
            plan_id: item.plan_id,
            roleBasedId: advisorDetails.advId,
            type: 'subscription'
        };
        this.props.createOrderNumber(options);
        this.setState({ selectedPlan: item });
    };

    renderPlans = (item) => {
        const content = item.content.split(',');
        return (
            <div className="member-box">
                <h5 className="member-basic">{item.planName}</h5>
                <h4 className="member-cost">
                    {item.amount} {!this.state.isYearly ? '/month' : '/year'}
                </h4>
                <div className="member-border"></div>
                <ul className="member-log">
                    {content.map((item, i) => {
                        return (
                            <div key={i}>
                                <li className="member-details">{item}</li>
                            </div>
                        );
                    })}
                </ul>
                {!this.props.membership.subscription && (
                    <div className="join-btn">
                        <a className="join-btn1" onClick={() => this.handleJoin(item)}>
                            <span>Join</span>
                        </a>
                    </div>
                )}
                {this.props.membership.subscription &&
                    this.props.membership.subscription.status === 'created' &&
                    this.props.membership.subscription.razorpayPlanId == item.razorpayPlanId && (
                        <div className="join-btn">
                            <a className="join-btn1" onClick={() => this.handleJoin(item)}>
                                <span>Pay To Activate Plan</span>
                            </a>
                        </div>
                    )}
            </div>
        );
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCancelSubscription = () => {
        const { advisorDetails } = this.props;
        let options = {
            advId: advisorDetails.advId,
            cancel_at_cycle_end: 0,
            sub_id: this.props.membership.subscription.razorpaySubId
        };
        this.props.cancelSubscription(options);
        this.props.onPaid({ type: 'default' });
    };

    handleTypeChange = (e) => {
        const { checked } = e.target;
        this.setState({ checked: checked, type: this.state.type === 'subscription' ? 'singlepayment' : 'subscription' });
    };

    render() {
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        const { plans } = this.state;
        const { subscription } = this.props.membership;
        let createdPlan = null;
        if (subscription) {
            createdPlan = this.props.membership.membershipPlans.filter(
                (item) =>
                    item.razorpayPlanId === subscription.razorpayPlanId ||
                    (subscription.singlePayment && subscription.singlePayment.plan_id && item.razorpayPlanId === subscription.singlePayment.plan_id)
            )[0];
        }
        const planDescriptions = [
            'Get Your Profile Listed',
            'Create Financial Profilers',
            'Answer the Queries',
            'Have Followers Network',
            "Exchange of Contact's",
            'Access to Shared Plans',
            'Conversation Facility',
            'Articles Postings',
            'Promotional Activity',
            'Membership Validity – 365 Days',
            'Make Payment'
        ];
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
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            {(!subscription || (subscription && subscription.status === 'created')) && !this.props.membership.paymentSuccess && (
                                <div className="page-center bg-white">
                                    <div className="plan-center">
                                        {/* <div className="switch-align">
                                            <span className="switch-text"> Monthly </span>
                                            <span>
                                                <label className="switch1">
                                                    <input type="checkbox" onChange={this.handleCheckBoxChange} />
                                                    <span className="slider1"></span>
                                                </label>
                                            </span>
                                            <span className="switch-text"> Yearly </span>
                                            <span className="switch-text">
                                                <a className="offer-tag"> Save 20%</a>
                                            </span>
                                        </div> */}
                                        <div className="membership-title">
                                            <span>Simple Membership Pricing for Everyone</span>
                                            {/* {plans.map((item, i) => this.renderPlans(item, i))} */}
                                            <span className="switch-text price-left">2000 / Year</span>
                                            {/* {!subscription && (
                                                <span className="auto-renewal-align">
                                                    <input
                                                        className="signup-checkbox"
                                                        type="checkbox"
                                                        id="autoRenewal"
                                                        name="autoRenewal"
                                                        onChange={this.handleTypeChange}
                                                        checked={this.state.checked}
                                                    />
                                                    <label className="signup-check" htmlFor="autoRenewal">
                                                        <a>Auto Renewal</a>
                                                    </label>
                                                </span>
                                            )} */}
                                        </div>
                                        <div className="row">
                                            {planDescriptions.map((item, i) => (
                                                <div className="col-lg-3 text-center" key={'pland-' + i}>
                                                    {i !== 10 && (
                                                        <div className={i == 10 ? 'plan-cont plan-pay' : 'plan-cont'}>
                                                            <img className="plan-img" src={`./images/plan/${i + 1}.png`} />
                                                            <p className="plan-desc">{item}</p>
                                                        </div>
                                                    )}
                                                    {i === 10 && (
                                                        <div className={i == 10 ? 'plan-cont plan-pay' : 'plan-cont'}>
                                                            <a onClick={() => this.handleJoin()}>
                                                                <img className="plan-img" src={`./images/plan/${i + 1}.png`} />
                                                                <p className="plan-desc">{item}</p>
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {subscription && subscription.status !== 'created' && (
                                <div className="page-center bg-white">
                                    <div className="col-12 plan-order">
                                        <div className="col-6">
                                            <h4 className="plan-head">Plan Detail</h4>
                                            <div className="plan-detail plan-font">
                                                {createdPlan && (
                                                    <table className="table table-bordered">
                                                        <tr>
                                                            <td className="plan-font">Plan Name </td> <td className="plan-font"> {createdPlan.planName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="plan-font">Period </td> <td className="plan-font"> {createdPlan.period}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="plan-font">Amount </td> <td className="plan-font">{createdPlan.amount}</td>
                                                        </tr>
                                                    </table>
                                                )}
                                                {!subscription.singlePayment && (
                                                    <div className="plan-cancel">
                                                        <button className="btn btn-primary" onClick={this.handleCancelSubscription}>
                                                            Cancel Subscription
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <h4 className="plan-head">Subscription Detail</h4>
                                            <div className="plan-detail plan-font">
                                                <table className="table table-bordered">
                                                    {!subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Status </td> <td className="plan-font">{subscription.status}</td>
                                                        </tr>
                                                    )}
                                                    {subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Status </td> <td className="plan-font">active</td>
                                                        </tr>
                                                    )}
                                                    {!subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Subscription started at </td>{' '}
                                                            <td className="plan-font">{moment(new Date(subscription.start_at * 1000)).format('DD-MM-YYYY')}</td>
                                                        </tr>
                                                    )}
                                                    {subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Subscription started at </td>{' '}
                                                            <td className="plan-font">{moment(new Date(subscription.singlePayment.subStartedAt)).format('DD-MM-YYYY')}</td>
                                                        </tr>
                                                    )}
                                                    {!subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Total paid count </td> <td className="plan-font">{subscription.paid_count}</td>
                                                        </tr>
                                                    )}
                                                    {!subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Next due </td>
                                                            <td className="plan-font">{moment(new Date(subscription.current_end * 1000)).format('DD-MM-YYYY')}</td>
                                                        </tr>
                                                    )}
                                                    {subscription.singlePayment && (
                                                        <tr>
                                                            <td className="plan-font">Next due </td>
                                                            <td className="plan-font">{moment(new Date(subscription.singlePayment.subEndAt)).format('DD-MM-YYYY')}</td>
                                                        </tr>
                                                    )}
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {subscription && subscription.status === 'created' && this.props.membership.paymentSuccess && (
                                <div className="page-center bg-white">
                                    <div className="paid-info"> Please wait, It will take some time to activate your plan</div>
                                </div>
                            )}
                            {this.state.open && (
                                <SubscriptionInvoice
                                    advisorDetails={advisorDetails}
                                    selectedPlan={this.state.selectedPlan}
                                    handleClose={this.handleClose}
                                    subscription={this.state.subscription}
                                    open={this.state.open}
                                    type={this.state.type}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {this.state.openPayResponse && <PaymentResponse openPopup={this.state.openPayResponse} onCloseModal={this.handleClosePayResponse} type={this.state.type} />}
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => membershipSelector(state);
export default connect(mapStateToProps, { fetchAllMembershipPlan, fetchSubscription, createOrderNumber, cancelSubscription, onPaid })(MembershipPlan);
