import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
    fetchDashboardCount,
    fetchByAdvisorID,
    fetchByPublicAdvisorID,
    fetchProductList,
    fetchAllServiceAndBrand,
    fetchRemunerationList,
    fetchServiceList,
    fetchBrandList,
    fetchLicenseList
} from '../actions/advisor';
import { fetchByInvestorId } from '../actions/investor';
import ProfilePopup from '../components/profilePopup/profilePopup';
import { advisorSelector } from '../selectors/advisor';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: [],
            openPopup: false,
            redirect: false,
            profileRedirect: false
        };
    }
    componentDidMount() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        if (bloomkiteUsername) {
            let { roleBasedId } = JSON.parse(bloomkiteUsername);
            let options = { roleBasedId };
            this.props.fetchDashboardCount(options);
            this.props.fetchByAdvisorID(roleBasedId);
            this.props.fetchByInvestorId(roleBasedId);
            this.props.fetchByPublicAdvisorID(roleBasedId);
            this.props.fetchProductList();
            this.props.fetchAllServiceAndBrand();
            this.props.fetchRemunerationList();
            this.props.fetchServiceList();
            this.props.fetchLicenseList();
            this.props.fetchBrandList();
        }
    }
    componentDidUpdate(oldProps) {
        if (this.props.advisorDetails != oldProps.advisorDetails) {
            this.setState({ openPopup: true });
        }
    }

    handleClose = () => {
        this.setState({ openPopup: false });
    };
    planClick = () => {
        this.setState({ redirect: true });
    };
    profileClick = () => {
        this.setState({ profileRedirect: true });
    };

    render() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        const { roleId } = JSON.parse(bloomkiteUsername);
        const { dashboard } = this.props;
        const roleProfiles = ['/advisor', '/investor', '/corporate'];

        return (
            <div>
                {/* {advisorDetails && advisorDetails.advId && <ProfilePopup openPopup={this.state.openPopup} handleClose={this.handleClose}></ProfilePopup>} */}
                <div className="row dashboard-home">
                    <p className="dashboard-head col-lg-12">Welcome to Bloomkite your new workspace!</p>
                    <div className="col-lg-12  row">
                        <div className="col-sm-3 dashboard-profile0">
                            <div>
                                <h5 className="profile-center">1. Create Profile</h5>
                                {/* <p className="profile-content1">Provide Information on qualification, Experience and Services offerings</p> */}
                            </div>
                        </div>
                        <div className="col-sm-3 dashboard-profile1">
                            <div>
                                <h5 className="profile-center">2. Membership</h5>
                                {/* <p className="profile-content2">Pay for your membership plan for getting profile listed</p> */}
                            </div>
                        </div>
                        <div className="col-sm-3 dashboard-profile2">
                            <div>
                                <h5 className="profile-center">3. Get Listed</h5>
                                {/* <p className="profile-content3">Profile is listed for prospective clients and create financial plans</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row dashboard-home dashboard-main">
                    <Link className="col-md-6 nopadding" to={roleProfiles[roleId - 1]} title="Edit your profile">
                        <span className="profile-dashboard">
                            <span className="dashboard-profile"> Profile </span>
                            <img className="dashboard-profileimg" src="/images/profile_checklist.png" alt="banner" />
                        </span>
                    </Link>
                    <Link className="col-md-6 nopadding" to="/planning-list" title="Manage your plans">
                        <span className="profile-dashboard profile-right">
                            <span className="dashboard-profile">
                                Plan <span className="plan-para">All files are secured</span>
                            </span>

                            <img className="dashboard-profileimg" src="/images/plans.png" alt="plan" float="right" />
                        </span>
                    </Link>
                </div>
                <div className="col-lg-12 row">
                    <div className={`${roleId == 2 ? 'col-md-6  nopadding planned-user' : 'col-sm-3 profile-footer1'}`}>
                        <h5 className={`${roleId == 2 ? 'dashboard-planned3' : 'dashboard-planned'}`}>Planned Goals</h5>
                        {dashboard && <h1 className={`${roleId == 2 ? 'dashboard-planned2' : 'dashboard-no1'}`}>{dashboard.plannedUser}</h1>}
                    </div>
                    <div className={`${roleId == 2 ? 'col-md-6 nopadding following-user' : 'col-sm-3 profile-footer2'}`}>
                        <h5 className={`${roleId == 2 ? 'dashboard-following1' : 'dashboard-goals'}`}>Following</h5>
                        {dashboard && <h1 className={`${roleId == 2 ? 'dashboard-following2' : 'dashboard-no2'}`}>{dashboard.following}</h1>}
                    </div>
                    {!(roleId == 2) && (
                        <div className="col-sm-3 profile-footer3">
                            <h5 className="dashboard-planned1">Shared Plan</h5>
                            {dashboard && <h1 className="dashboard-no3">{dashboard.sharedPlan}</h1>}
                        </div>
                    )}
                    {!(roleId == 2) && (
                        <div className="col-sm-3 profile-footer4">
                            <h5 className="dashboard-goals1">Followers</h5>
                            {dashboard && <h1 className="dashboard-no4">{dashboard.followers}</h1>}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => advisorSelector(state);

export default connect(mapStateToProps, {
    fetchDashboardCount,
    fetchByAdvisorID,
    fetchByInvestorId,
    fetchByPublicAdvisorID,
    fetchProductList,
    fetchAllServiceAndBrand,
    fetchRemunerationList,
    fetchServiceList,
    fetchBrandList,
    fetchLicenseList
})(DashBoard);
