import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanningHeader from './planningHeader';
import PlanningLeftbar from './planningLeftside';
import classNames from 'classnames';
import { planningMessage } from '../../constants/planningConstant';
import PdfLoan from './pdfLoan';
import PlanningLeftBarWithOutLogin from './planningLeftBarWithOutLogin';
import EmiCalculatorWithoutLogin from '../../components/planning/loan/emiCalculatorWithoutLogin';
import PartialPaymentWithoutLogin from '../../components/planning/loan/partialPaymentWithoutLogin';
import ChangeInEmiWithoutLogin from '../../components/planning/loan/changeInEmiWithoutLogin';
import EmiCapacityWithoutLogin from '../../components/planning/loan/emiCapacityWithoutLogin';
import ChangeInInterestWithoutLogin from '../../components/planning/loan/changeInInterestWithoutLogin';
import PlanSharePopUp from '../../components/PlanningShare/PlanSharePopUp';
import EmiCalculator from '../planning/loan/emiCalculator';
import PartialPayment from '../planning/loan/partialPayments';
import ChangeInEmi from '../planning/loan/changeInEmi';
import EmiCapacity from '../planning/loan/emiCapacity';
import ChangeInInterest from '../planning/loan/changeInInterest';
const LOANS = ['EMI Calculator', 'EMI Capacity', 'Partial Payments', 'Change in EMI', 'Change in Interest'];

class Loan extends Component {
    constructor(props) {
        super(props);
        let selectedPlan = 'loan,investment,goal';
        this.state = {
            loanNames: LOANS.map((p) => {
                return {
                    value: p,
                    selected: false
                };
            }),
            selectedPlan,
            selectedLoan: 'EMI Calculator',
            isLoanChosen: false,
            openPopup: false,
            // isSharedPlan : true,
        };
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    chooseLoan = (e, loan, selectedLoan) => {
        selectedLoan = e.target.value;
        this.setState({ isLoanChosen: true, selectedLoan }, () => { });
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, changeInEmi, changeInInterest, emiCalculator, emiCapacity, partialPayments } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (
            ((changeInEmi && Object.keys(changeInEmi).length) ||
                (changeInInterest && Object.keys(changeInInterest).length) ||
                (emiCalculator && Object.keys(emiCalculator).length) ||
                (emiCapacity && Object.keys(emiCapacity).length) ||
                (partialPayments && Object.keys(partialPayments).length)) &&
            displayName
        ) {
            return (
                <PdfLoan
                    key={name}
                    changeInEmi={changeInEmi}
                    changeInInterest={changeInInterest}
                    emiCalculator={emiCalculator}
                    emiCapacity={emiCapacity}
                    payments={partialPayments}
                    plan={plan}
                    name={name}
                    fileName="ChangeInEMI"
                />
            );
        }
        return null;
    };

    render() {
        let { isSharedPlan, sharedTab } = this.props;
        const selectedItems = [];
        if (this.props.loanDetails && this.props.loanDetails.emiCalculator) {
            selectedItems.push('EMI Calculator')
        }
        if (this.props.loanDetails && this.props.loanDetails.partialPayment && this.props.loanDetails.partialPayment.length > 0) {
            selectedItems.push('Partial Payments');
        }
        if (this.props.loanDetails && this.props.loanDetails.emiCapacity) {
            selectedItems.push('EMI Capacity');
        }
        if (this.props.loanDetails && this.props.loanDetails.emiChange && this.props.loanDetails.emiChange.length > 0) {
            selectedItems.push('Change in EMI');
        }
        if (this.props.loanDetails && this.props.loanDetails.interestChange && this.props.loanDetails.interestChange.length > 0) {
            selectedItems.push('Change in Interest');
        }
        return (
            <div>
                {this.props.plan ? (
                    <div>
                        {/* <div className="col-12">
                            {this.props.plan && (
                                <PlanningHeader
                                    // showSaveBtn={true}
                                    handleSave={this.handleSave}
                                    name={this.props.plan.name}>
                                    <span className="planbar-Btn">
                                        <button type="button" className="savegoal-Btn" onClick={() => this.onOpenModal()}>
                                            <i className="fa fa-share-alt"></i>
                                            {planningMessage.share}
                                        </button>
                                        {this.state.openPopup && <PlanSharePopUp openPopup={this.state.openPopup} currentPlans = "loan" onCloseModal={this.onCloseModal}></PlanSharePopUp>}
                                    </span>
                                    {this.renderPdfLink()}
                                </PlanningHeader>
                            )}
                        </div> */}
                        <div className="row col-12 planning-gap">
                            {/* {this.props.plan && (
                                <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                            )}
                            {!this.props.plan && (
                                <PlanningLeftBarWithOutLogin
                                    handleTabChange={this.props.handleTabChange}
                                    currentTab={this.props.currentTab}
                                    selectedPlan={this.props.selectedPlan}
                                />)} */}
                            <div className="col-12">
                                <div className="planning-left row">
                                    <div className="col-12 bg-white">
                                        {this.state.selectedLoan && this.state.selectedLoan == 'EMI Calculator' && (
                                            <EmiCalculator
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                loans={LOANS}
                                                currentTab={this.props.currentTab}
                                                chooseLoan={this.chooseLoan}
                                                selectedLoan={this.state.selectedLoan}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedLoan && this.state.selectedLoan == 'Partial Payments' && (
                                            <PartialPayment
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                loans={LOANS}
                                                currentTab={this.props.currentTab}
                                                chooseLoan={this.chooseLoan}
                                                selectedLoan={this.state.selectedLoan}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedLoan && this.state.selectedLoan == 'Change in EMI' && (
                                            <ChangeInEmi
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                isLoanChosen={this.state.isLoanChosen}
                                                loans={LOANS}
                                                currentTab={this.props.currentTab}
                                                chooseLoan={this.chooseLoan}
                                                selectedLoan={this.state.selectedLoan}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedLoan && this.state.selectedLoan == 'EMI Capacity' && (
                                            <EmiCapacity
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                loans={LOANS}
                                                currentTab={this.props.currentTab}
                                                chooseLoan={this.chooseLoan}
                                                selectedLoan={this.state.selectedLoan}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedLoan && this.state.selectedLoan == 'Change in Interest' && (
                                            <ChangeInInterest
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                loans={LOANS}
                                                currentTab={this.props.currentTab}
                                                chooseLoan={this.chooseLoan}
                                                selectedLoan={this.state.selectedLoan}
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
                                                    active: this.props.currentTab == 14
                                                })}>
                                                <a onClick={() => this.handleTabChange(14)}>{planningMessage.emiCalculator}</a>
                                            </li>
                                            {this.props.plan && (
                                                <li
                                                    className={classNames('section-title', {
                                                        active: this.props.currentTab == 15
                                                    })}>
                                                    <a onClick={() => this.handleTabChange(15)}>{planningMessage.emiCapacity}</a>
                                                </li>
                                            )}
                                            {this.props.plan && (
                                                <li
                                                    className={classNames('section-title', {
                                                        active: this.props.currentTab == 16
                                                    })}>
                                                    <a onClick={() => this.handleTabChange(16)}>{planningMessage.partialPayments}</a>
                                                </li>
                                            )}
                                            {this.props.plan && (
                                                <li
                                                    className={classNames('section-title', {
                                                        active: this.props.currentTab == 17
                                                    })}>
                                                    <a onClick={() => this.handleTabChange(17)}>{planningMessage.changeInEmi}</a>
                                                </li>
                                            )}
                                            {this.props.plan && (
                                                <li
                                                    className={classNames('section-title', {
                                                        active: this.props.currentTab == 18
                                                    })}>
                                                    <a onClick={() => this.handleTabChange(18)}>{planningMessage.changeInInterest}</a>
                                                </li>
                                            )}
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
                                {this.state.selectedLoan && this.state.selectedLoan == 'EMI Calculator' && (
                                    <EmiCalculatorWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        loans={LOANS}
                                        chooseLoan={this.chooseLoan}
                                        selectedLoan={this.state.selectedLoan}
                                    />
                                )}
                                {this.state.selectedLoan && this.state.selectedLoan == 'Partial Payments' && (
                                    <PartialPaymentWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        loans={LOANS}
                                        chooseLoan={this.chooseLoan}
                                        selectedLoan={this.state.selectedLoan}
                                    />
                                )}
                                {this.state.selectedLoan && this.state.selectedLoan == 'Change in EMI' && (
                                    <ChangeInEmiWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        isLoanChosen={this.state.isLoanChosen}
                                        loans={LOANS}
                                        chooseLoan={this.chooseLoan}
                                        selectedLoan={this.state.selectedLoan}
                                    />
                                )}
                                {this.state.selectedLoan && this.state.selectedLoan == 'EMI Capacity' && (
                                    <EmiCapacityWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        loans={LOANS}
                                        chooseLoan={this.chooseLoan}
                                        selectedLoan={this.state.selectedLoan}
                                    />
                                )}
                                {this.state.selectedLoan && this.state.selectedLoan == 'Change in Interest' && (
                                    <ChangeInInterestWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        selectedItems={selectedItems}
                                        loans={LOANS}
                                        chooseLoan={this.chooseLoan}
                                        selectedLoan={this.state.selectedLoan}
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
        changeInEmi: state.changeInEmiReducer.response,
        changeInInterest: state.changeInInterestReducer.response,
        emiCalculator: state.emiCalculatorReducer.response,
        emiCapacity: state.emiCapacityReducer.response,
        partialPayments: state.partialPaymentsReducer.response,
        advisorDetails: state.advisorReducer.advisorDetails,
        loanDetails: state.planningReducer.loanDetails
    };
};

export default connect(mapStateToPros, null)(Loan);
