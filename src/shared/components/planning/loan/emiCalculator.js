import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Table from '../common/table';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import DonutChart from '../common/donutChart';
import { formatMoney, Helper } from '../../../helpers/planningHelper';
import { formatLoanAmount } from '../../../helpers/planningHelper';
import { onChange, calculateEmi,calculateShare } from '../../../actions/emiCalculator';
import { fetchLoanPlanning } from '../../../actions/planning';
import Loader from '../../common/loader';
import PdfLoan from '../pdfLoan';
import PlanningLeftBarWithOutLogin from '../planningLeftBarWithOutLogin';
import { planningMessage } from '../../../constants/planningConstant';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';
import FontIcon from '../../common/fontAwesomeIcon';
import { faShare } from '@fortawesome/free-solid-svg-icons';

class EmiCalculator extends Component {
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

    componentDidUpdate(newProps) {
        let { loanAmount, tenure, interestRate } = newProps;
        if (this.props.loanAmount !== 0 && this.props.tenure !== 0 && this.props.interestRate !== 0) {
            if (this.props.loanAmount != loanAmount || this.props.tenure != tenure || this.props.interestRate != interestRate) {
                this.setState({ disabled: false });
            }
        }
        if (this.props.loanAmount != loanAmount || this.props.tenure != tenure || this.props.interestRate != interestRate) {
            if (this.props.loanAmount == 0 || this.props.tenure == 0 || this.props.interestRate == 0) {
                this.setState({ disabled: true });
            }
        }
    }

    componentDidMount() {
        let { emiCalculatorId } = this.props;
        if (emiCalculatorId === 0) {
            let referenceId = window.localStorage.getItem('referenceId');
            if (referenceId) {
                this.props.fetchLoanPlanning(referenceId);
            }
        }
        else {
            this.props.calculateEmi();
        }
    }

    handleSave = () => {
        this.props.calculateEmi();
        this.setState({ disabled: true });
    };

    handleCalculate = () => {
        this.props.calculateShare();
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, response, loanAmount, tenure, interestRate, loanDate, loanAmountInLakshs } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        const info = {
            loanAmount,
            tenure,
            interestRate,
            loanDate,
            loanAmountInLakshs
        };
        if (response && response.total) {
            return <PdfLoan emiCalculator={response} plan={plan} name={name} loanAomunt={formatLoanAmount(loanAmount)} fileName="EMICalculator" emiCalculatorInfo={info} />;
        } else {
            return null;
        }
    };

    render() {
        let { selectedPlan, loanAmount, loanAmountInLakshs, tenure, loanDate, tenureInYear, interestRate, response, isLoading, currentTab, handleTabChange, onChange, isSharedPlan, sharedTab } = this.props;
        let amount = formatLoanAmount(loanAmount, loanAmountInLakshs);
        const loan = 'loan';

        return (
            <div>
                {this.props.plan && !sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader name={this.props.plan.name} showSaveBtn={true} handleSave={this.handleSave} disabled={this.state.disabled} sharedTab={sharedTab}>
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    </div>
                )}
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
                <div className={this.props.plan ? 'row col-12 planning-gap calc' : 'calc-without-login'}>
                    {this.props.plan && <PlanningLeftbar handleTabChange={handleTabChange} currentTab={currentTab} selectedPlan={selectedPlan} />}
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
                        <div className={this.props.plan ? 'row planning-right' : 'row'}>
                            <div className="col-7 goal-form bg white">
                                <Slider
                                    options={{
                                        title: 'Loan amount',
                                        switchCss: 'la-cr',
                                        isSwitchOn: loanAmountInLakshs,
                                        textCss: 'lg',
                                        value: loanAmount,
                                        min: 0
                                    }}
                                    value={loanAmount}
                                    maxLength={loanAmountInLakshs ? maxLength.lakshs : maxLength.crores}
                                    onKeyPress={(e) => loanAmountInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                    getConfig={Helper.loanAmountConfig}
                                    onChange={(value) => onChange('loanAmount', value, 'blur')}
                                    onSwitchChange={() => onChange('loanAmountInLakshs', !loanAmountInLakshs, 'blur')}
                                />
                                <Slider
                                    options={{
                                        title: 'Loan tenure',
                                        switchCss: 'yr-mo',
                                        isSwitchOn: tenureInYear,
                                        textCss: 'sm',
                                        value: tenure,
                                        min: 5
                                    }}
                                    value={tenure}
                                    maxLength={tenureInYear ? maxLength.year : maxLength.month}
                                    onKeyPress={(e) => tenureInYear ? yearMethod(e) : monthMethod(e)}
                                    getConfig={Helper.tenureConfig}
                                    onChange={(value) => onChange('tenure', value, 'blur')}
                                    onSwitchChange={() => onChange('tenureInYear', !tenureInYear, 'blur')}
                                />
                                <Slider
                                    options={{
                                        title: 'Interest rate',
                                        textCss: 'sm',
                                        value: interestRate,
                                        min: 5,
                                        max: 15
                                    }}
                                    value={interestRate}
                                    maxLength={maxLength.interestRate}
                                    onKeyPress={(e) => interestRateMethod(e)}
                                    getConfig={Helper.interestRateConfig}
                                    onChange={(value) => onChange('interestRate', value, 'blur')}
                                />
                                <PaymentStartDate title="Schedule showing EMI payments starting from" dateValue={loanDate} onChange={onChange} />
                                <Table items={response.amortisation} />
                            </div>
                            <div className="col-5 cashflow-right">
                                <DonutChart
                                    isLoading={isLoading}
                                    handleTabChange={handleTabChange}
                                    title="Total Payment"
                                    plan={this.props.plan}
                                    data={[
                                        ['Task', 'Hours per Day'],
                                        [`Principal Loan Amount`, response.principalLoanAmountInPercent],
                                        ['Total Interest', response.interestInPercent]
                                    ]}
                                    legends={[`Principal Loan Amount (${response.principalLoanAmountInPercent}%)`, `Total Interest (${response.interestInPercent}%)`]}
                                    sections={[
                                        {
                                            id: 1,
                                            cssClass: 'design1',
                                            items: [
                                                {
                                                    name: 'Loan EMI',
                                                    value: formatMoney(response.emi)
                                                },
                                                {
                                                    name: 'Total Interest Payable',
                                                    value: formatMoney(response.interestPayable)
                                                }
                                            ]
                                        },
                                        {
                                            id: 2,
                                            cssClass: 'design2',
                                            items: [
                                                {
                                                    name: 'Total Payment (Principal + Interest)',
                                                    value: formatMoney(response.total)
                                                }
                                            ]
                                        }
                                    ]}
                                    amortisation={response.wmiPayments}
                                />
                                {sharedTab && sharedTab.postedToPartyId &&
                                    <div className="goal-table-design3">
                                        <SharedPlanChat currentPlanTab={loan} sharedTab={sharedTab}></SharedPlanChat>
                                    </div>
                                }
                                {isSharedPlan &&
                                    <div className="goal-table-design3">
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
    ...state.emiCalculatorReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    calculateEmi,
    fetchLoanPlanning,
    calculateShare
};

export default connect(mapStateToPros, mapDispatchToProps)(EmiCalculator);
