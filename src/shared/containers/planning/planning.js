import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/userHeader';
import Loader from '../../components/common/loader';
import MyGoal from '../../components/planning/financial/myGoal';
import CashFlow from '../../components/planning/financial/cashflow/index';
import Networth from '../../components/planning/financial/networth/index';
import Priorities from '../../components/planning/financial/priorities';
import Insurance from '../../components/planning/financial/insurance';
import RiskProfile from '../../components/planning/financial/riskProfile';
import FutureValue from '../../components/planning/investment/futureValue';
import TargetValue from '../../components/planning/investment/targetValue';
import RateFinder from '../../components/planning/investment/rateFinder';
import TenureFinder from '../../components/planning/investment/tenureFinder';
import EMICalculator from '../../components/planning/loan/emiCalculator';
import EMICapacity from '../../components/planning/loan/emiCapacity';
import PartialPayments from '../../components/planning/loan/partialPayments';
import ChangeInEMI from '../../components/planning/loan/changeInEmi';
import ChangeInInterest from '../../components/planning/loan/changeInInterest';
import { planningSelector } from '../../selectors/planning';
import { fetchLoanPlanning, fetchFinancialPlanning, fetchRiskPlanning, fetchPlanByReference, fetchInvestmentPlanning } from '../../actions/planning';
import { calculateEmiChange, clearEmiChange } from '../../actions/changeInEmi';
import { calculateInterestChange, clearInterestChange } from '../../actions/changeInInterest';
import { calculateEmi, clearEmiCalculator } from '../../actions/emiCalculator';
import { calculateEmiCapacity, clearEmiCapacity } from '../../actions/emiCapacity';
import { calculatePartialPayments, clearPartialPayments } from '../../actions/partialPayments';
import { fetchByAdvisorID } from '../../actions/advisor';
import Investment from '../../components/planning/investment';
import Finance from '../../components/planning/financial';
import Loan from '../../components/planning/loan';
import { clearFutureValue } from '../../actions/futureValue';
import { clearTargetValue } from '../../actions/targetValue';
import { clearRateFinder } from '../../actions/rateFinder';
import { clearTenureFinder } from '../../actions/tenureFinder';
import { fetchSharedByPartyIdAndRefId, clearCashflowValue, clearNetworthValue, clearPrioritiesValue, clearInsuranceValue } from '../../actions/planning';
// setTimeout is available globally in both Node.js and browsers

class Planning extends Component {
    constructor(props) {
        super(props);

        let selectedPlan = '';
        let plan = {};
        let currentTab = '';
        if (props.location && props.location.state) {
            let { plan } = props.location.state;
            currentTab = plan.currentTab;
            selectedPlan = plan.selectedPlan;
            plan = plan;
        }
        this.state = {
            currentRole: '',
            name: '',
            currentTab,
            selectedPlan,
            plan,
            advisorDetails: {},
            isGoalPlan: false,
            isFinancePlan: false,
            isInvestPlan: false,
            isLoanPlan: false,
            sharedTab: {}
        };
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails)) {
            this.setState({
                advisorDetails: this.props.advisorDetails,
                productList: this.props.productList,
                serviceList: this.props.serviceList,
                remunerationList: this.props.remunerationList,
                licenseList: this.props.licenseList
            });
        }
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    handleShowChat = (mySharedPlans) => {
        mySharedPlans.map((item) => {
            const { plans } = item;
            const plan = { ...item };
            plan.selectedPlan = plans.split(',');
            if (plan.selectedPlan.includes('goal')) {
                this.setState({ isGoalPlan: true });
            }
            if (plan.selectedPlan.includes('financial')) {
                this.setState({ isFinancePlan: true });
            }
            if (plan.selectedPlan.includes('investment')) {
                this.setState({ isInvestPlan: true });
            }
            if (plan.selectedPlan.includes('loan')) {
                this.setState({ isLoanPlan: true });
            }
        });
    };

    componentDidMount() {
        this.props.clearFutureValue();
        this.props.clearTargetValue();
        this.props.clearRateFinder();
        this.props.clearTenureFinder();
        this.props.clearEmiCalculator();
        this.props.clearEmiCapacity();
        this.props.clearPartialPayments();
        this.props.clearEmiChange();
        this.props.clearInterestChange();
        this.props.clearCashflowValue();
        this.props.clearNetworthValue();
        this.props.clearInsuranceValue();
        this.props.clearPrioritiesValue();
        const { roleBasedId, partyId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        const { location, fetchByAdvisorID } = this.props;
        fetchByAdvisorID(roleBasedId);
        let plan = null;
        if (location.state) {
            plan = location.state.plan;
        }
        // else {
        //     let selectedPlan = window.localStorage.getItem('selectedPlan');
        //     if (selectedPlan) {
        //         plan = JSON.parse(selectedPlan);
        //     }
        // }
        this.setState({ currentTab: plan.currentTab, selectedPlan: plan.selectedPlan, plan: plan, currentRole: roleId });
        if (!!!this.props.planUsers && this.props.location.state.plan.selectedPlan.includes('financial')) {
            this.props.fetchFinancialPlanning(this.props.location.state.plan.referenceId);
        }
        if (!!!this.props.planUsers && this.props.location.state.plan.selectedPlan.includes('riskprofile')) {
            this.props.fetchRiskPlanning(this.props.location.state.plan.referenceId);
        }
        if (!!!this.props.planUsers && this.props.location.state.plan.selectedPlan.includes('investment')) {
            this.props.fetchInvestmentPlanning(this.props.location.state.plan.referenceId);
        }
        if (!!!this.props.planUsers && this.props.location.state.plan.selectedPlan.includes('loan')) {
            this.props.fetchLoanPlanning(this.props.location.state.plan.referenceId);
            this.props.calculateInterestChange();
            this.props.calculateEmiChange();
            this.props.calculateEmi();
            this.props.calculateEmiCapacity();
            this.props.calculatePartialPayments();
        }
        let referenceId = this.props.location.state.plan.referenceId;
        let options = { partyId: partyId, referenceId: referenceId };
        this.props.fetchSharedByPartyIdAndRefId(options);

        setTimeout(() => {
            if (plan.postedToPartyId) {
                this.setState({ sharedTab: plan });
            }
            this.handleShowChat(this.props.mySharedPlans);
        }, 3000);
    }

    render() {
        const { cashFlowSummary, advisorDetails, networthSummary, priorities, insurance, networth, cashFlow } = this.props;
        return (
            <div className="main-container pt-1">
                {/* <Header
                    active={1}
                    logout={this.logout}
                    role={this.state.currentRole}
                    name={this.props.advisorDetails && this.props.advisorDetails.name && this.props.advisorDetails.name}
                /> */}
                {this.state.currentTab == 1 && (
                    <MyGoal
                        handleTabChange={this.handleTabChange}
                        currentTab={this.state.currentTab}
                        advisorDetails={this.state.advisorDetails}
                        selectedPlan={this.state.selectedPlan}
                        plan={this.state.plan}
                        isSharedPlan={this.state.isGoalPlan}
                        sharedTab={this.state.sharedTab}
                        role={this.state.currentRole}
                    />
                )}
                {this.state.currentTab == 2 && (
                    <Finance
                        handleTabChange={this.handleTabChange}
                        currentTab={this.state.currentTab}
                        selectedPlan={this.state.selectedPlan}
                        plan={this.state.plan}
                        cashFlowSummary={cashFlowSummary}
                        advisorDetails={advisorDetails}
                        networthSummary={networthSummary}
                        insurance={insurance}
                        priorities={priorities}
                        cashFlow={cashFlow}
                        networth={networth}
                        isSharedPlan={this.state.isFinancePlan}
                        sharedTab={this.state.sharedTab}
                        role={this.state.currentRole}
                    />
                )}
                {this.state.currentTab == 3 && (
                    <RiskProfile handleTabChange={this.handleTabChange} currentTab={this.state.currentTab} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />
                )}
                {this.state.currentTab == 4 && (
                    <Investment
                        handleTabChange={this.handleTabChange}
                        currentTab={this.state.currentTab}
                        selectedPlan={this.state.selectedPlan}
                        plan={this.state.plan}
                        isSharedPlan={this.state.isInvestPlan}
                        sharedTab={this.state.sharedTab}
                        role={this.state.currentRole}
                    />
                )}
                {this.state.currentTab == 5 && (
                    <Loan
                        handleTabChange={this.handleTabChange}
                        currentTab={this.state.currentTab}
                        selectedPlan={this.state.selectedPlan}
                        plan={this.state.plan}
                        isSharedPlan={this.state.isLoanPlan}
                        sharedTab={this.state.sharedTab}
                        role={this.state.currentRole}
                    />
                )}
                {this.state.currentTab == 6 && (
                    <CashFlow handleTabChange={this.handleTabChange} currentTab={2} selectedPlan={this.state.selectedPlan} plan={this.state.plan} loading={this.props.loading} />
                )}
                {this.state.currentTab == 7 && (
                    <Networth handleTabChange={this.handleTabChange} currentTab={2} selectedPlan={this.state.selectedPlan} plan={this.state.plan} loading={this.props.loading} />
                )}
                {this.state.currentTab == 8 && (
                    <Priorities handleTabChange={this.handleTabChange} currentTab={2} selectedPlan={this.state.selectedPlan} plan={this.state.plan} loading={this.props.loading} />
                )}
                {this.state.currentTab == 9 && (
                    <Insurance handleTabChange={this.handleTabChange} currentTab={2} selectedPlan={this.state.selectedPlan} plan={this.state.plan} loading={this.props.loading} />
                )}
                {this.state.currentTab == 10 && <FutureValue handleTabChange={this.handleTabChange} currentTab={4} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />}
                {this.state.currentTab == 11 && <TargetValue handleTabChange={this.handleTabChange} currentTab={4} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />}
                {this.state.currentTab == 12 && <RateFinder handleTabChange={this.handleTabChange} currentTab={4} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />}
                {this.state.currentTab == 13 && (
                    <TenureFinder handleTabChange={this.handleTabChange} currentTab={4} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />
                )}
                {this.state.currentTab == 14 && (
                    <EMICalculator handleTabChange={this.handleTabChange} currentTab={5} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />
                )}
                {this.state.currentTab == 15 && <EMICapacity handleTabChange={this.handleTabChange} currentTab={5} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />}
                {this.state.currentTab == 16 && (
                    <PartialPayments handleTabChange={this.handleTabChange} currentTab={5} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />
                )}
                {this.state.currentTab == 17 && <ChangeInEMI handleTabChange={this.handleTabChange} currentTab={5} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />}
                {this.state.currentTab == 18 && (
                    <ChangeInInterest handleTabChange={this.handleTabChange} currentTab={5} selectedPlan={this.state.selectedPlan} plan={this.state.plan} />
                )}
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => planningSelector(state);

export default connect(mapStateToProps, {
    fetchLoanPlanning,
    fetchRiskPlanning,
    fetchFinancialPlanning,
    fetchInvestmentPlanning,
    fetchPlanByReference,
    fetchByAdvisorID,
    calculateInterestChange,
    calculateEmiChange,
    calculateEmi,
    calculateEmiCapacity,
    calculatePartialPayments,
    clearFutureValue,
    clearTargetValue,
    clearRateFinder,
    clearTenureFinder,
    clearEmiCalculator,
    clearEmiCapacity,
    clearPartialPayments,
    clearEmiChange,
    clearInterestChange,
    fetchSharedByPartyIdAndRefId,
    clearCashflowValue,
    clearInsuranceValue,
    clearPrioritiesValue,
    clearNetworthValue
})(Planning);
