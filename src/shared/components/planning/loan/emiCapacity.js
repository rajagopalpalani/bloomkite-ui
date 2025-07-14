import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import DonutChart from '../common/donutChart';
import { onChange, calculateEmiCapacity, calculateShare } from '../../../actions/emiCapacity';
import { formatMoney } from '../../../helpers/planningHelper';
import Loader from '../../common/loader';
import Input from '../../common/input';
import Select from '../../common/select';
import CurrencyInput from '../../common/currencyInput';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import { maxLength, pincodeMethod } from '../../../constants/commonRules';
import PdfLoan from '../pdfLoan';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import FontIcon from '../../common/fontAwesomeIcon';
import { faShare } from '@fortawesome/free-solid-svg-icons';

class EmiCapacity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            disabled: true
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };
    componentDidUpdate(newProps, oldProps) {
        let { currentAge, retirementAge, stability, additionalIncome, existingEmi, houseHoldExpense, netFamilyIncome, backUp } = newProps;
        if (
            this.props.currentAge !== currentAge ||
            this.props.retirementAge !== retirementAge ||
            this.props.stability !== stability ||
            this.props.backUp !== backUp ||
            this.props.additionalIncome !== additionalIncome ||
            this.props.existingEmi !== existingEmi ||
            this.props.houseHoldExpense !== houseHoldExpense ||
            this.props.netFamilyIncome !== netFamilyIncome
        ) {
            if (this.props.currentAge && this.props.retirementAge && this.props.stability && this.props.backUp) {
                this.setState({ disabled: false });
            }
            if (!this.props.currentAge || !this.props.retirementAge || (!this.props.stability && this.props.backUp)) {
                this.setState({ disabled: true });
            }
        }
    }
    componentDidMount() {
        let { emiCapacityId } = this.props;
        if (emiCapacityId === 0) {
            let referenceId = window.localStorage.getItem('referenceId');
            this.props.fetchLoanPlanning(referenceId);
        } else {
            this.props.calculateEmiCapacity();
        }
    }
    handleSave = () => {
        this.props.calculateEmiCapacity();
        this.setState({ disabled: true });
    };

    handleCalculate = () => {
        this.props.calculateShare();
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, response, currentAge, retirementAge, stability, backUp, netFamilyIncome, existingEmi, houseHoldExpense, additionalIncome } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (response && response.emiCapacity) {
            return (
                <PdfLoan
                    emiCapacity={response}
                    plan={plan}
                    name={name}
                    fileName="EMICapacity"
                    emiCapacityInfo={{
                        currentAge,
                        retirementAge,
                        stability,
                        backUp,
                        netFamilyIncome,
                        existingEmi,
                        houseHoldExpense,
                        additionalIncome
                    }}
                />
            );
        }
        return null;
    };

    render() {
        let {
            additionalIncome,
            backUp,
            principle,
            interest,
            currentAge,
            existingEmi,
            houseHoldExpense,
            interestRate,
            netFamilyIncome,
            retirementAge,
            stability,
            response,
            isLoading,
            currentTab,
            handleTabChange,
            onChange,
            isSharedPlan,
            sharedTab
        } = this.props;
        let termOfLoan = '';
        if (response.termOfLoan) {
            termOfLoan = `${response.termOfLoan} Yrs`;
            // termOfLoan = `${response.termOfLoan < 20 ? 20 : response.termOfLoan} Yrs`;
        }
        const loan = 'loan';
        return (
            <div>
                {!sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader name={this.props.plan.name} showSaveBtn={true} handleSave={this.props.calculateEmiCapacity} disabled={this.state.disabled} sharedTab={sharedTab}>
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    </div>)
                }
                {sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader
                            showCalculateBtn={true}
                            enableCalculate={true}
                            handleCalculate={this.handleCalculate}
                            enableEdit={false}
                            name={this.props.plan.name}
                            sharedTab={sharedTab}></PlanningHeader>
                    </div>
                )}
                <div className="row col-12 planning-gap calc">
                    <PlanningLeftbar handleTabChange={handleTabChange} currentTab={currentTab} selectedPlan={this.props.selectedPlan} />
                    <CalcHeader
                        items={this.props.loans}
                        savedItems={this.props.selectedItems}
                        showSaveBtn={false}
                        selectedItem={this.props.selectedLoan}
                        chooseItem={this.props.chooseLoan}
                        disabled={this.state.disabled}
                        handleSave={this.handleCalculate}
                        sharedTab={sharedTab}
                    />
                    <div className="col-12">
                        <div className="planning-center planning-right row">
                            <div className="col-7 plans bg-white borderBottom">
                                <div className="emi-capacity">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{planningMessage.emiCapcity}</th>
                                                <th>{planningMessage.value}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{planningMessage.currentAge}</td>
                                                <td>
                                                    <Input
                                                        name="currentAge"
                                                        value={currentAge}
                                                        maxLength={maxLength.age}
                                                        onKeyPress={(e) => pincodeMethod(e)}
                                                        onChange={onChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{planningMessage.retirementAge}</td>
                                                <td>
                                                    <Input
                                                        name="retirementAge"
                                                        value={retirementAge}
                                                        maxLength={maxLength.age}
                                                        onKeyPress={(e) => pincodeMethod(e)}
                                                        onChange={onChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>How stable is your Income at the current as well as future</td>
                                                <td>
                                                    <Select name="stability" value={stability} onChange={onChange} options={['HIGH', 'MEDIUM']} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Incase temperory loss of No
                                                    <br /> Do you have Backup Income for 3 to 6 months
                                                </td>
                                                <td>
                                                    <Select name="backUp" value={backUp} onChange={onChange} options={['YES', 'NO']} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{planningMessage.netFamilyIncome}</td>
                                                <td>
                                                    <CurrencyInput name="netFamilyIncome" value={netFamilyIncome} onChange={onChange} size="sm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{planningMessage.emiIncludingSpouse}</td>
                                                <td>
                                                    <CurrencyInput name="existingEmi" value={existingEmi} onChange={onChange} size="sm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{planningMessage.houseExpenses}</td>
                                                <td>
                                                    <CurrencyInput name="houseHoldExpense" value={houseHoldExpense} onChange={onChange} size="sm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{planningMessage.additionalIncome}</td>
                                                <td>
                                                    <CurrencyInput name="additionalIncome" value={additionalIncome} onChange={onChange} size="sm" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-5 cashflow-right">
                                <DonutChart
                                    isLoading={isLoading}
                                    title="Total Payment"
                                    handleTabChange={handleTabChange}
                                    plan={this.props.plan}
                                    sections={[
                                        {
                                            id: 1,
                                            cssClass: 'design1 goal-table-design2',
                                            items: [
                                                {
                                                    name: 'EMI Capacity',
                                                    value: formatMoney(response.emiCapacity)
                                                },
                                                {
                                                    name: 'Loan Term',
                                                    value: termOfLoan
                                                }
                                            ]
                                        }
                                    ]}
                                />
                                {sharedTab && sharedTab.postedToPartyId &&
                                    <div className="finance-table-design2">
                                        <SharedPlanChat currentPlanTab={loan} sharedTab={sharedTab}></SharedPlanChat>
                                    </div>
                                }
                                {isSharedPlan &&
                                    <div className="finance-table-design2">
                                        <PlanChat currentPlanTab={loan}></PlanChat>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToPros = (state) => ({
    ...state.emiCapacityReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculateEmiCapacity,
    calculateShare
};

export default connect(mapStateToPros, mapDispatchToProps)(EmiCapacity);
