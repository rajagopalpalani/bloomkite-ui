import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loader from '../../components/common/loader';
import { planningSelector } from '../../selectors/planning';
import FontIcon from '../../components/common/fontAwesomeIcon';
import {
    fetchFinancialPlanning,
    fetchLoanPlanning,
    fetchPlanByReference,
    addPlan,
    modifyPlan,
    deletePlan,
    fetchPlanByPartyId,
    fetchRiskPlanning,
    fetchRiskQuestionaireList,
    fetchInvestmentPlanning,
    downloadPlanPdf,
    fetchSharedPlanByPostedPartyId,
    fetchSharedByRefId
} from '../../actions/planning';
import { fetchGoalPlanning } from '../../actions/myGoal';
import { fetchTeam } from '../../actions/teamSignup';
import { fetchByAdvisorID } from '../../actions/advisor';
import { fetchByInvestorId } from '../../actions/investor';
import LandingPopup from '../../components/landingPopup';
import EditLandingPopup from '../../components/editPopup';
import { planningMessage } from '../../constants/planningConstant';
// import MainHeader from '../../components/MainHeader';
// import Footer from '../../components/home/footer';
import OtpPopup from '../../components/otp/otpPopup';
import { sendOtp } from '../../actions/accountDetails/sendOtp';
import PlanSharePopUp from '../../components/PlanningShare/PlanSharePopUp';
import { faDownload, faEdit, faShare, faTrash, faTasks, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import ContactPopup from '../../components/Contact/contactPopup';
import { fetchFollowersRequest } from '../../components/followers/Followers.actions';

class PlanningLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            editMode: false,
            planUserCount: 50,
            selectEmployee: 'all',
            selectEmployeeShared: '',
            isEdit: false,
            currentPlanUser: {},
            phoneNumber: '',
            currentPlans: [],
            refId: '',
            currentTab: 1,
            postedPartyId: '',
            sharedPlans: [],
            isSharedPlan: false,
            openOtpPopup: false,
            isContactPopup: false,
            otpType: '',
            sharePlanUser: {},
            downloadEvent: {},
            downloadType: '',
            downloadPlanUser: {},
            financial: false,
            loan: false,
            investment: false,
            goal: false,
            riskprofile: false,
            savedPlans: []
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    popupOpen = (i) => {
        this.setState({ isContactPopup: !this.state.isContactPopup, contactIndex: i });
    };

    componentDidMount() {
        if (window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'))) {
            const { roleBasedId, partyId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
            let isInvestor = roleId == 2;
            if (isInvestor) {
                this.props.fetchByInvestorId(roleBasedId);
            } else {
                this.props.fetchByAdvisorID(roleBasedId);
            }
            this.props.fetchPlanByPartyId(partyId);
            this.props.fetchSharedPlanByPostedPartyId(partyId);
            this.props.fetchFollowersRequest({ userId: roleBasedId, statusId: 1 });
            this.props.fetchTeam(partyId);
            this.setState({ postedPartyId: partyId, partyId, planUserCount: isInvestor ? 1 : this.state.planUserCount, currentRole: roleId });
        }
    }

    handleAddPlan = (options) => {
        this.props.addPlan(options);
    };

    handleUpdatePlan = (options) => {
        this.props.modifyPlan(options);
    };

    handleShareManagePlanning = (item) => {
        const { referenceId, plans } = item;
        const plan = { ...item };
        plan.selectedPlan = plans.split(',');
        if (plan.selectedPlan.includes('goal')) {
            this.props.fetchGoalPlanning(referenceId);
            plan.currentTab = 1;
        }

        if (plan.selectedPlan.includes('financial')) {
            this.props.fetchFinancialPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 2;
            }
        }
        if (plan.selectedPlan.includes('investment')) {
            this.props.fetchInvestmentPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 4;
            }
        }
        if (plan.selectedPlan.includes('loan')) {
            this.props.fetchLoanPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 5;
            }
        }
        localStorage.setItem('selectedPlan', JSON.stringify(plan));
        localStorage.setItem('referenceId', plan.referenceId);
        this.props.history.push(`/planning/${plan.referenceId}`, { plan });
    };

    handleManagePlanning = (planUser) => {
        const { referenceId, selectedPlan } = planUser;
        const plan = { ...planUser };
        plan.selectedPlan = selectedPlan.split(',');

        if (plan.selectedPlan.includes('goal')) {
            this.props.fetchGoalPlanning(referenceId);
            plan.currentTab = 1;
        }
        if (plan.selectedPlan.includes('financial')) {
            this.props.fetchFinancialPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 2;
            }
        }
        if (plan.selectedPlan.includes('riskprofile')) {
            this.props.fetchRiskPlanning(referenceId);
            // this.props.fetchRiskQuestionaireList();
            if (!plan.currentTab) {
                plan.currentTab = 3;
            }
        }
        if (plan.selectedPlan.includes('investment')) {
            this.props.fetchInvestmentPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 4;
            }
        }
        if (plan.selectedPlan.includes('loan')) {
            this.props.fetchLoanPlanning(referenceId);
            if (!plan.currentTab) {
                plan.currentTab = 5;
            }
        }
        localStorage.setItem('selectedPlan', JSON.stringify(plan));
        localStorage.setItem('referenceId', plan.referenceId);
        this.props.history.push(`/planning/${plan.referenceId}`, { plan });
    };

    handleEdit = (planUser) => {
        setTimeout(() => {
            this.props.fetchSharedByRefId(planUser.referenceId);
        }, 500);
        this.setState({ isEdit: true }, () => {
            this.setState({ planUser });
        });
    };

    downloadHandler = () => {
        let e = this.state.downloadEvent;
        let type = this.state.downloadType;
        let planUser = this.state.downloadPlanUser;
        e.preventDefault();
        const { advisorDetails } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const advisorName = `${label}${displayName}`;
        this.props.downloadPlanPdf({
            type,
            name: advisorName,
            plan: planUser
        });
        this.setState({
            otpType: ''
        });
    };

    handleDelete = () => {
        let planUser = this.state.currentPlanUser;
        const { advisorDetails } = this.props;
        if (advisorDetails && advisorDetails.advType == 2) {
            planUser.partyId = 0;
        }
        this.props.deletePlan(planUser);
        this.setState({
            otpType: ''
        });
    };

    handleEmployeeChange = (e) => {
        this.setState({ selectEmployee: e.target.value });
    };

    handleEmployeeShareChange = (e) => {
        this.props.fetchSharedPlanByPostedPartyId(e.target.value);
        this.setState({ selectEmployeeShared: e.target.value });
    };

    handleOtp = (otpType) => {
        this.setState({
            otpType: otpType
        });
        const { roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        let isInvestor = roleId == 2;
        if (isInvestor) {
            let options = {
                phoneNumber: this.props.investorDetails.phoneNumber
            };
            this.setState({ phoneNumber: this.props.investorDetails.phoneNumber });
            this.props.sendOtp(options);
            this.onOpenOtpModal();
        } else {
            let options = {
                phoneNumber: this.props.advisorDetails.phoneNumber
            };
            this.setState({ phoneNumber: this.props.advisorDetails.phoneNumber });
            this.props.sendOtp(options);
            this.onOpenOtpModal();
        }
    };

    deletePlanUser = (planIndex) => {
        let currentPlanUser = this.props.planUsers.find((a) => a.planId == planIndex);
        this.setState({ currentPlanUser });
        setTimeout(() => {
            this.props.fetchSharedByRefId(currentPlanUser.referenceId);
        }, 500);
    };

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onOpenOtpModal = () => {
        this.setState({ openOtpPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false, isContactPopup: false });
    };

    onCloseOtpModal = () => {
        this.setState({ openOtpPopup: false });
    };

    handleShare = (planUser) => {
        const { referenceId, selectedPlan } = planUser;
        const plan = { ...planUser };
        plan.selectedPlan = selectedPlan.split(',');
        let currentPlans = plan.selectedPlan;
        let refId = plan.referenceId;
        const { roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        let isInvestor = roleId == 2;
        if (isInvestor) {
            let plans = this.props.investorDetails.planDetailList.filter((item) => item.referenceId == referenceId)[0];
            this.setState({
                currentPlans: currentPlans,
                savedPlans: plans,
                refId: refId,
                otpType: '',
                goal: plans.goal,
                financial: plans.finance,
                loan: plans.loan,
                investment: plans.investment,
                riskprofile: plans.riskProfile
            });
        } else {
            let plans = this.props.advisorDetails.planDetailList.filter((item) => item.referenceId == referenceId)[0];
            this.setState({
                currentPlans: currentPlans,
                savedPlans: plans,
                refId: refId,
                otpType: '',
                goal: plans.goal,
                financial: plans.finance,
                loan: plans.loan,
                investment: plans.investment,
                riskprofile: plans.riskProfile
            });
        }
        this.onOpenModal();
    };

    renderSharedPlans = (item) => {
        const sharedPlans = [...this.state.sharedPlans, item];
        this.setState({ sharedPlans: sharedPlans });
        return <div>{this.state.sharedPlans}</div>;
    };

    render() {
        let showUsers;
        let showUsersDone = false;
        const { sharedPlans, mySharedPlansByRef } = this.props;
        const { advisorDetails } = this.props;
        const { investorDetails } = this.props;
        return (
            <div>
                {this.state.openOtpPopup && (
                    <OtpPopup
                        openPopup={this.state.openOtpPopup}
                        roleName={'planning'}
                        phoneNumber={this.state.phoneNumber}
                        onCloseModal={this.onCloseOtpModal}
                        handleDeletePlan={this.handleDelete}
                        downloadHandler={this.downloadHandler}
                        otpType={this.state.otpType}
                    />
                )}
                <div className="main-container">
                    <div className="center-landing planning-grey-center">
                        <div className="row nomargin nopadding">
                            <div className="col-12">
                                {this.props.planUsers == 0 && (
                                    <button type="button" className="landing-btn" data-toggle="modal" data-target="#planModal">
                                        {planningMessage.planningAdd}
                                    </button>
                                )}
                            </div>
                            <div className="left-advisor-sidebar-static-myplan">
                                {sharedPlans && sharedPlans.length > 0 && (
                                    <ul>
                                        <li className={classNames('plan-button', { active: this.state.currentTab == 1, 'no-active': this.state.currentTab != 1 })}>
                                            <a className="my-share-plan" onClick={() => this.handleTabChange(1)}>
                                                My Plans
                                            </a>
                                        </li>
                                        <li className={classNames('plan-button', { active: this.state.currentTab == 2, 'no-active': this.state.currentTab != 2 })}>
                                            <a className="my-share-plan" onClick={() => this.handleTabChange(2)}>
                                                Shared Plans
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            {this.state.currentTab == 1 && (
                                <div className="col-12">
                                    <div className="col-12 plan-controls">
                                        <div className="col-12">
                                            {this.props.planUsers && this.props.planUsers.length < this.state.planUserCount && this.props.planUsers != 0 && (
                                                <button type="button" className="landing-btn" data-toggle="modal" data-target="#planModal">
                                                    {planningMessage.planningAdd}
                                                </button>
                                            )}
                                            {this.props.planUsers && this.props.planUsers.length > 0 && (
                                                <div className="planning-title">
                                                    {this.state.currentRole == 3 && (
                                                        <span className="ml-2">
                                                            <select value={this.state.selectEmployee ? this.state.selectEmployee : ''} onChange={this.handleEmployeeChange}>
                                                                <option className="select-option" value="all">
                                                                    {planningMessage.planningSelect}
                                                                </option>
                                                                <option className="select-option" value="0">
                                                                    {planningMessage.planningSelf}
                                                                </option>
                                                                {this.props.teamDetails &&
                                                                    this.props.teamDetails.map((teamMember, teamIndex) => {
                                                                        return (
                                                                            <option className="select-option" key={'team-member-' + teamIndex} value={teamMember.partyId}>
                                                                                {teamMember.name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {this.props.planUsers && this.props.planUsers.length > 0 && (
                                            <div className="row nomargin nopadding">
                                                <table className="landing-table">
                                                    <thead>
                                                        <tr className="landing-table-align landing-border-width">
                                                            <th>{planningMessage.planningTableName}</th>
                                                            {this.state.currentRole == 3 && <th>{planningMessage.planningTableEmployeeName}</th>}
                                                            <th>{planningMessage.planningTableRef}</th>
                                                            <th>{planningMessage.planningTableAge}</th>
                                                            <th>{planningMessage.planningTableTitle}</th>
                                                            <th>{planningMessage.planningTableAction}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.planUsers.map((planUser, userIndex) => {
                                                            showUsers = this.state.selectEmployee == 'all' ? true : this.state.selectEmployee == planUser.partyId;
                                                            if (showUsers) {
                                                                showUsersDone = true;
                                                            }
                                                            let plannedUser = planUser.selectedPlan ? planUser.selectedPlan.split(',') : [];
                                                            let teamMember;
                                                            if (planUser.partyId) {
                                                                teamMember =
                                                                    this.props.teamDetails &&
                                                                    this.props.teamDetails.length > 0 &&
                                                                    this.props.teamDetails.find((team) => team.partyId == planUser.partyId);
                                                            }
                                                            return (
                                                                showUsers && (
                                                                    <tr key={'planUser-' + userIndex} className="landing-table-bg">
                                                                        <td>{planUser.name}</td>
                                                                        {this.state.currentRole == 3 && <td>{planUser.partyId ? (teamMember ? teamMember.name : '') : 'Self'}</td>}
                                                                        <td>{planUser.referenceId}</td>
                                                                        <td>{planUser.age}</td>
                                                                        <td>
                                                                            {plannedUser &&
                                                                                plannedUser.length > 0 &&
                                                                                plannedUser.map((plan, index) => {
                                                                                    return (
                                                                                        <span className="plan-name" key={'plan-key-' + index}>{`${plan}${
                                                                                            index == plannedUser.length - 1 ? '' : ', '
                                                                                        }`}</span>
                                                                                    );
                                                                                })}
                                                                        </td>
                                                                        <td className="landing-manage">
                                                                            <ul className="landing-button-manage">
                                                                                <li>
                                                                                    <a
                                                                                        className="btn btn-primary"
                                                                                        title={'Manage Plan'}
                                                                                        onClick={() => {
                                                                                            this.handleManagePlanning(planUser);
                                                                                        }}>
                                                                                        <FontIcon icon={faTasks} />
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a
                                                                                        className="btn btn-primary ml-2"
                                                                                        title={'Edit Plan'}
                                                                                        data-toggle="modal"
                                                                                        data-target="#planEditModal"
                                                                                        onClick={() => this.handleEdit(planUser)}>
                                                                                        <FontIcon icon={faEdit} />
                                                                                    </a>
                                                                                </li>
                                                                                <li className="dropdown ml-2 download-dropdown">
                                                                                    <button
                                                                                        className="btn btn-primary dropdown-toggle"
                                                                                        title={'Download Plan'}
                                                                                        type="button"
                                                                                        id="dropdownMenuButton"
                                                                                        data-toggle="dropdown"
                                                                                        aria-haspopup="true"
                                                                                        aria-expanded="false">
                                                                                        <FontIcon icon={faDownload} />
                                                                                    </button>
                                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                        <ul>
                                                                                            <li className={!plannedUser.includes('goal') && 'displayHide'}>
                                                                                                <a
                                                                                                    className="dropdown-item"
                                                                                                    title={'Download Goals Plan'}
                                                                                                    onClick={(e) => {
                                                                                                        this.setState({
                                                                                                            downloadEvent: e,
                                                                                                            downloadType: 'goals',
                                                                                                            downloadPlanUser: planUser
                                                                                                        });
                                                                                                        this.handleOtp('downloadPlan');
                                                                                                    }}>
                                                                                                    Goals
                                                                                                </a>
                                                                                            </li>
                                                                                            <li className={!plannedUser.includes('riskprofile') && 'displayHide'}>
                                                                                                <a
                                                                                                    className="dropdown-item"
                                                                                                    title={'Download Risk Profile Plan'}
                                                                                                    onClick={(e) => {
                                                                                                        this.setState({
                                                                                                            downloadEvent: e,
                                                                                                            downloadType: 'riskprofile',
                                                                                                            downloadPlanUser: planUser
                                                                                                        });
                                                                                                        this.handleOtp('downloadPlan');
                                                                                                    }}>
                                                                                                    Risk Profile
                                                                                                </a>
                                                                                            </li>
                                                                                            <li className={!plannedUser.includes('financial') && 'displayHide'}>
                                                                                                <a
                                                                                                    className="dropdown-item"
                                                                                                    title={'Download Finance Plan'}
                                                                                                    onClick={(e) => {
                                                                                                        this.setState({
                                                                                                            downloadEvent: e,
                                                                                                            downloadType: 'finance',
                                                                                                            downloadPlanUser: planUser
                                                                                                        });
                                                                                                        this.handleOtp('downloadPlan');
                                                                                                    }}>
                                                                                                    Finance
                                                                                                </a>
                                                                                            </li>
                                                                                            <li className={!plannedUser.includes('investment') && 'displayHide'}>
                                                                                                <a
                                                                                                    className="dropdown-item"
                                                                                                    title={'Download Investment Plan'}
                                                                                                    onClick={(e) => {
                                                                                                        this.setState({
                                                                                                            downloadEvent: e,
                                                                                                            downloadType: 'investment',
                                                                                                            downloadPlanUser: planUser
                                                                                                        });
                                                                                                        this.handleOtp('downloadPlan');
                                                                                                    }}>
                                                                                                    Investment
                                                                                                </a>
                                                                                            </li>
                                                                                            <li className={!plannedUser.includes('loan') && 'displayHide'}>
                                                                                                <a
                                                                                                    className="dropdown-item"
                                                                                                    title={'Download Loan Plan'}
                                                                                                    onClick={(e) => {
                                                                                                        this.setState({
                                                                                                            downloadEvent: e,
                                                                                                            downloadType: 'loan',
                                                                                                            downloadPlanUser: planUser
                                                                                                        });
                                                                                                        this.handleOtp('downloadPlan');
                                                                                                    }}>
                                                                                                    Loan
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </li>
                                                                                <li>
                                                                                    <a
                                                                                        className="btn btn-primary ml-2"
                                                                                        title={'Share Plan'}
                                                                                        onClick={() => {
                                                                                            this.setState({
                                                                                                sharePlanUser: planUser
                                                                                            });
                                                                                            this.handleShare(planUser);
                                                                                        }}>
                                                                                        <FontIcon icon={faShare} />
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a
                                                                                        className="btn btn-danger ml-2"
                                                                                        data-toggle="modal"
                                                                                        data-target="#planDeleteModal"
                                                                                        title={'Delete Plan'}
                                                                                        onClick={() => this.deletePlanUser(planUser.planId)}>
                                                                                        <FontIcon icon={faTrash} />
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            );
                                                        })}
                                                        {!showUsers && !showUsersDone && (
                                                            <tr key={'planUser-0'} className="landing-table-bg text-center">
                                                                <td colSpan="6">No users found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {this.state.openPopup && (
                                <PlanSharePopUp
                                    openPopup={this.state.openPopup}
                                    referenceId={this.state.refId}
                                    planData={this.state.currentPlans}
                                    onCloseModal={this.onCloseModal}
                                    advisorDetails={advisorDetails}
                                    role={this.state.currentRole}
                                    team={this.props.teamDetails}
                                    savedPlans={this.state.savedPlans}
                                    goal={this.state.goal}
                                    investment={this.state.investment}
                                    financial={this.state.financial}
                                    loan={this.state.loan}
                                    riskprofile={this.state.riskprofile}
                                    investorDetails={investorDetails}
                                    followersRequest={this.props.followersRequest}
                                />
                            )}
                            {this.state.currentTab == 2 && (
                                <div className="col-12">
                                    <div className="col-12 plan-controls">
                                        <div className="col-12">
                                            <div className="planning-title">
                                                {this.state.currentRole == 3 && (
                                                    <span className="ml-2">
                                                        <select type="select" onChange={this.handleEmployeeShareChange}>
                                                            <option value={this.state.postedPartyId}>{planningMessage.planningSelf}</option>
                                                            {this.props.teamDetails &&
                                                                this.props.teamDetails.map((teamMember, teamIndex) => {
                                                                    return (
                                                                        <option key={teamIndex} value={teamMember.partyId}>
                                                                            {teamMember.name}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </select>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row nomargin nopadding">
                                            <table className="landing-table">
                                                <thead>
                                                    <tr className="landing-table-align landing-border-width">
                                                        <th>{planningMessage.planningTableName}</th>
                                                        <th>{planningMessage.planningTableInvName}</th>
                                                        <th>{planningMessage.planningTableRef}</th>
                                                        <th>{planningMessage.planningTableAge}</th>
                                                        <th>{planningMessage.planningTableTitle}</th>
                                                        <th>{planningMessage.planningTableAction}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sharedPlans &&
                                                        sharedPlans.length > 0 &&
                                                        sharedPlans.map((item, i) => {
                                                            const sharedPlans = item.plans ? item.plans.split(',') : [];
                                                            showUsers = this.state.selectEmployeeShared == item.postedPartyId;
                                                            return (
                                                                <tr key={'item-' + i} className="landing-table-bg">
                                                                    <td>{item.planName}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.referenceId}</td>
                                                                    <td>{item.age}</td>
                                                                    <td>
                                                                        {sharedPlans &&
                                                                            sharedPlans.length > 0 &&
                                                                            sharedPlans.map((plan, index) => {
                                                                                return (
                                                                                    <span className="plan-name" key={'plan-key-' + index}>{`${plan}${
                                                                                        index == sharedPlans.length - 1 ? '' : ', '
                                                                                    }`}</span>
                                                                                );
                                                                            })}
                                                                    </td>
                                                                    <td className="landing-manage">
                                                                        <ul className="landing-button-manage">
                                                                            <li>
                                                                                <a
                                                                                    className="btn btn-primary"
                                                                                    title={'Manage Plan'}
                                                                                    onClick={() => {
                                                                                        this.handleShareManagePlanning(item);
                                                                                    }}>
                                                                                    <FontIcon icon={faTasks} />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                {item.phoneNumber != null && (
                                                                                    <a
                                                                                        className="btn btn-primary ml-2"
                                                                                        title={'Investor Contact'}
                                                                                        onClick={() => this.popupOpen(i)}>
                                                                                        <FontIcon icon={faAddressBook} />
                                                                                    </a>
                                                                                )}
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {this.state.isContactPopup && (
                            <ContactPopup
                                openPopup={() => this.popupOpen()}
                                sharedContact={this.props.sharedPlans}
                                showCloseIcon={true}
                                onCloseModal={this.onCloseModal}
                                contactIndex={this.state.contactIndex}
                            />
                        )}
                    </div>
                    <div className="modal fade" id="planDeleteModal" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title text-center">{'Delete Plan'}</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        &times;
                                    </button>
                                </div>
                                {(!mySharedPlansByRef || mySharedPlansByRef.length == 0) && (
                                    <div>
                                        <div className="modal-body product-popup-content">{`Are you sure want to delete this plan?`}</div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleOtp('deletePlan')}>
                                                Delete
                                            </button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {mySharedPlansByRef && mySharedPlansByRef.length > 0 && (
                                    <div className="modal-body product-popup-content">{`You cannot delete because you already shared this plan`}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {this.props.advisorDetails && (
                        <EditLandingPopup
                            handleUpdatePlan={this.handleUpdatePlan}
                            parentPartyId={this.props.advisorDetails.parentPartyId == 0 ? this.state.partyId : this.props.advisorDetails.parentPartyId}
                            partyId={this.state.partyId}
                            selectedUser={this.state.planUser}
                        />
                    )}
                    {this.props.advisorDetails && (
                        <LandingPopup
                            handleAddPlan={this.handleAddPlan}
                            parentPartyId={this.props.advisorDetails.parentPartyId == 0 ? this.state.partyId : this.props.advisorDetails.parentPartyId}
                            partyId={this.state.partyId}
                        />
                    )}
                    {this.props.investorDetails && (
                        <EditLandingPopup
                            handleUpdatePlan={this.handleUpdatePlan}
                            parentPartyId={this.state.partyId}
                            partyId={this.state.partyId}
                            selectedUser={this.state.planUser}
                        />
                    )}
                    {this.props.investorDetails && <LandingPopup handleAddPlan={this.handleAddPlan} parentPartyId={this.state.partyId} partyId={this.state.partyId} />}
                </div>
                <Loader loading={this.props.isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => planningSelector(state);

export default connect(mapStateToProps, {
    fetchFinancialPlanning,
    fetchLoanPlanning,
    fetchGoalPlanning,
    fetchRiskPlanning,
    fetchRiskQuestionaireList,
    fetchInvestmentPlanning,
    fetchByAdvisorID,
    addPlan,
    modifyPlan,
    deletePlan,
    fetchPlanByReference,
    fetchPlanByPartyId,
    fetchByInvestorId,
    fetchTeam,
    downloadPlanPdf,
    fetchSharedPlanByPostedPartyId,
    fetchSharedByRefId,
    sendOtp,
    fetchFollowersRequest
})(PlanningLanding);
