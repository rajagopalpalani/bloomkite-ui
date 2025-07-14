import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import { formatMoney, Helper } from '../../../helpers/planningHelper';
import { formatLoanAmount } from '../../../helpers/planningHelper';
import { onChange, calculateEmi, changeEmiCalculatorButtonClicked } from '../../../actions/emiCalculator';
import { fetchLoanPlanning } from '../../../actions/planning';
import Loader from '../../common/loader';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import DonutChart from '../common/donutChart';
import Table from '../common/table';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class EmiCalculatorWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openResultPopup: false,
            disabled: true
        };
    }
    componentDidUpdate(newProps, oldProps) {
        let { requestCount, loanAmount, tenure, interestRate } = newProps;
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

    handleSubmit = () => {
        this.props.changeEmiCalculatorButtonClicked();
        this.props.calculateEmi();
        this.onOpenResultModal();
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        // this.props.clearEmiCalculator();
    };

    render() {
        let { selectedPlan, loanAmount, loanAmountInLakshs, tenure, loanDate, tenureInYear, interestRate, response, isLoading, currentTab, handleTabChange, onChange } = this.props;
        let amount = formatLoanAmount(loanAmount, loanAmountInLakshs);
        return (
            <div>
                <div className="calc">
                    <CalcHeader
                        items={this.props.loans}
                        savedItems={this.props.selectedItems}
                        showSaveBtn={true}
                        selectedItem={this.props.selectedLoan}
                        chooseItem={this.props.chooseLoan}
                        disabled={this.state.disabled}
                        handleSave={this.handleSubmit}
                    />
                    <div className="row col-12 nomargin nopadding">
                        <div className="col-8 goal-form">
                            <form>
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
                                        percent: true
                                    }}
                                    value={interestRate}
                                    maxLength={maxLength.interestRate}
                                    onKeyPress={(e) => interestRateMethod(e)}
                                    getConfig={Helper.interestRateConfig}
                                    onChange={(value) => onChange('interestRate', value, 'blur')}
                                />
                                <PaymentStartDate title="Schedule showing EMI payments starting from" dateValue={loanDate} onChange={onChange} />
                                <div className="emiCalculatorNew">
                                    <Table items={this.props.response.amortisation} />
                                </div>
                            </form>
                        </div>
                        <div className="col-4 goal-form">
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
                                        cssClass: 'design6',
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
    changeEmiCalculatorButtonClicked
    // clearEmiCalculator,
};

export default connect(mapStateToPros, mapDispatchToProps)(EmiCalculatorWithoutLogin);
