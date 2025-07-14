import React, { Component } from 'react';
import PlanningHeader from './planningHeader';
import PlanningLeftbar from './planningLeftside';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { planningMessage } from '../../constants/planningConstant';
import FutureValueWithoutLogin from '../../components/planning/investment/futureValueWithoutLogin';
import TargetValueWithoutLogin from '../../components/planning/investment/targetValueWithoutLogin';
import RateFinderWithoutLogin from '../../components/planning/investment/rateFinderWithoutLogin';
import TenureFinderWithoutLogin from '../../components/planning/investment/tenureFinderWithoutLogin';
import PlanningLeftBarWithOutLogin from './planningLeftBarWithOutLogin';
import PdfInvestment from './pdfInvestment';
import PlanSharePopUp from '../PlanningShare/PlanSharePopUp';
import FutureValue from '../planning/investment/futureValue';
import TargetValue from '../planning/investment/targetValue';
import RateFinder from '../planning/investment/rateFinder';
import TenureFinder from '../planning/investment/tenureFinder';
const INVESTMENTS = ['Future Value', 'Target Value', 'Rate Finder', 'Tenure Finder'];

class Investment extends Component {
    constructor(props) {
        super(props);
        let selectedPlan = 'loan,investment,goal,finance';
        this.state = {
            investmentNames: INVESTMENTS.map((p) => {
                return {
                    value: p,
                    selected: false
                };
            }),
            selectedPlan,
            selectedInvestment: 'Future Value',
            isInvestmentChosen: false,
            openPopup: false,
            // isSharedPlan: true
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    chooseInvestment = (e, investment, selectedInvestment) => {
        selectedInvestment = e.target.value;
        this.setState({ isInvestmentChosen: true, selectedInvestment }, () => { });
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, futureValue, targetValue, rateFinder, tenureFinder } = this.props;
        let futureVal = {
            invAmount: futureValue.invAmount,
            duration: futureValue.duration,
            annualGrowth: futureValue.annualGrowth,
            totalPayment: futureValue.totalPayment
        };
        let targetVal = {
            futureValue: targetValue.futureValue,
            duration: targetValue.duration,
            rateOfInterest: targetValue.rateOfInterest,
            totalPayment: targetValue.totalPayment
        };
        let rateFind = {
            futureValue: rateFinder.futureValue,
            presentValue: rateFinder.presentValue,
            duration: rateFinder.duration,
            rateOfInterest: rateFinder.rateOfInterest
        };
        let tenureFind = {
            futureValue: tenureFinder.futureValue,
            presentValue: tenureFinder.presentValue,
            rateOfInterest: tenureFinder.rateOfInterest,
            tenure: tenureFinder.tenure
        };
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (this.props.plan) {
            if (displayName) {
                return (
                    <PdfInvestment
                        futureValue={futureVal}
                        targetValue={targetVal}
                        rateFinder={rateFind}
                        tenureFinder={tenureFind}
                        plan={plan}
                        name={name}
                        fileName="Investment" />
                );
            }
            return null;
        }
    };

    render() {
        let { isSharedPlan, sharedTab } = this.props;
        const selectedItems = [];
        if (this.props.investmentDetails && this.props.investmentDetails.futureValue) {
            selectedItems.push('Future Value')
        }
        if (this.props.investmentDetails && this.props.investmentDetails.rateFinder) {
            selectedItems.push('Rate Finder');
        }
        if (this.props.investmentDetails && this.props.investmentDetails.tenureFinder) {
            selectedItems.push('Tenure Finder');
        }
        if (this.props.investmentDetails && this.props.investmentDetails.targetValue) {
            selectedItems.push('Target Value');
        }
        return (
            <div>
                {this.props.plan ? (
                    <div>
                        <div className="col-12">
                            {/* {this.props.plan && <PlanningHeader handleSave={this.handleSave} name={this.props.plan.name}>

                                <span className="planbar-Btn">
                                    <button type="button" className="savegoal-Btn" onClick={() => this.onOpenModal()}>
                                        <i className="fa fa-share-alt"></i>
                                        {planningMessage.share}
                                    </button>
                                    {this.state.openPopup && <PlanSharePopUp openPopup={this.state.openPopup} currentPlans = "investment" onCloseModal={this.onCloseModal}></PlanSharePopUp>}
                                </span>
                                {this.renderPdfLink()}
                            </PlanningHeader>} */}
                        </div>
                        <div className="row col-12 planning-gap">
                            {/* <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} /> */}
                            <div className="col-12">
                                <div className="lanning-left row">
                                    <div className="col-12 bg-white">
                                        {this.state.selectedInvestment && this.state.selectedInvestment == 'Future Value' && (
                                            <FutureValue
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                investments={INVESTMENTS}
                                                currentTab={this.props.currentTab}
                                                chooseInvestment={this.chooseInvestment}
                                                selectedInvestment={this.state.selectedInvestment}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedInvestment && this.state.selectedInvestment == 'Target Value' && (
                                            <TargetValue
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                investments={INVESTMENTS}
                                                currentTab={this.props.currentTab}
                                                chooseInvestment={this.chooseInvestment}
                                                selectedInvestment={this.state.selectedInvestment}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedInvestment && this.state.selectedInvestment == 'Rate Finder' && (
                                            <RateFinder
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                investments={INVESTMENTS}
                                                currentTab={this.props.currentTab}
                                                chooseInvestment={this.chooseInvestment}
                                                selectedInvestment={this.state.selectedInvestment}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedInvestment && this.state.selectedInvestment == 'Tenure Finder' && (
                                            <TenureFinder
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                investments={INVESTMENTS}
                                                currentTab={this.props.currentTab}
                                                chooseInvestment={this.chooseInvestment}
                                                selectedInvestment={this.state.selectedInvestment}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {/* <ul className="financial-goals">
                                            <li
                                                className={classNames('section-title', {
                                                    active: this.props.currentTab == 10
                                                })}>
                                                <a onClick={() => this.handleTabChange(10)}>{planningMessage.futureValue}</a>
                                            </li>
                                            <li
                                                className={classNames('section-title', {
                                                    active: this.props.currentTab == 11
                                                })}>
                                                <a onClick={() => this.handleTabChange(11)}>{planningMessage.targetValue}</a>
                                            </li>
                                            <li
                                                className={classNames('section-title', {
                                                    active: this.props.currentTab == 12
                                                })}>
                                                <a onClick={() => this.handleTabChange(12)}>{planningMessage.rateFinder}</a>
                                            </li>
                                            <li
                                                className={classNames('section-title', {
                                                    active: this.props.currentTab == 13
                                                })}>
                                                <a onClick={() => this.handleTabChange(13)}>{planningMessage.tenureFinder}</a>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="planning-gap">
                            <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                            <div className="calc-without-login">
                                {this.state.selectedInvestment && this.state.selectedInvestment == 'Future Value' && (
                                    <FutureValueWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        investments={INVESTMENTS}
                                        chooseInvestment={this.chooseInvestment}
                                        selectedInvestment={this.state.selectedInvestment}
                                    />
                                )}
                                {this.state.selectedInvestment && this.state.selectedInvestment == 'Target Value' && (
                                    <TargetValueWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        investments={INVESTMENTS}
                                        chooseInvestment={this.chooseInvestment}
                                        selectedInvestment={this.state.selectedInvestment}
                                    />
                                )}
                                {this.state.selectedInvestment && this.state.selectedInvestment == 'Rate Finder' && (
                                    <RateFinderWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        investments={INVESTMENTS}
                                        chooseInvestment={this.chooseInvestment}
                                        selectedInvestment={this.state.selectedInvestment}
                                    />
                                )}
                                {this.state.selectedInvestment && this.state.selectedInvestment == 'Tenure Finder' && (
                                    <TenureFinderWithoutLogin
                                        sselectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        investments={INVESTMENTS}
                                        chooseInvestment={this.chooseInvestment}
                                        selectedInvestment={this.state.selectedInvestment}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToPros = (state) => {
    return {
        futureValue: state.futureValueReducer,
        targetValue: state.targetValueReducer,
        rateFinder: state.rateFinderReducer,
        tenureFinder: state.tenureFinderReducer,
        advisorDetails: state.advisorReducer.advisorDetails,
        investmentDetails: state.planningReducer.investmentDetails
    };
};

export default connect(mapStateToPros, null)(Investment);
