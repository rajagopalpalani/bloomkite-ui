import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from '../../common/loader';
import MonthYearPicker from '../../common/monthYearPicker';
import CurrencyInput from '../../common/currencyInput';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { onChange, calculatePartialPayments, changePartialPaymentsButtonClicked, clearPartialPayments } from '../../../actions/partialPayments';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import DonutChart from '../common/donutChart';
import Table from '../common/table';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class PartialPaymentsWithoutLogin extends Component {
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
        this.props.changePartialPaymentsButtonClicked();
        this.props.calculatePartialPayments();
        this.onOpenResultModal();
    };
    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        // this.props.clearPartialPayments();
    };

    render() {
        let {
            tabKey,
            currentTab,
            loanAmount,
            loanAmountInLakshs,
            tenure,
            date,
            loanDate,
            tenureInYear,
            interestRate,
            partialPayment1,
            partialPayment2,
            partialPayment3,
            partialPayment4,
            response,
            isLoading,
            onChange,
            calculatePartialPayments,
            computeLoanAmount,
            handleTabChange
        } = this.props;
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
                    <div className=" row col-12 nopadding nomargin">
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
                                    getConfig={Helper.loanAmountConfig}
                                    maxLength={loanAmountInLakshs ? maxLength.lakshs : maxLength.crores}
                                    onKeyPress={(e) => loanAmountInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                    value={amount}
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
                                <PaymentStartDate title="Schedule showing EMI payments starting from" dateValue={date} onChange={onChange} />
                                <div className="tab-container">
                                    <Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(value) => onChange('tabKey', value)}>
                                        <Tab eventKey="partialPayment1" title="Partial Payments 1">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment1.startDate">{planningMessage.loanStartDate}</label>
                                                        <MonthYearPicker name="partialPayment1.startDate" date={partialPayment1.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment1.partPayDate">{planningMessage.partialPaymentDate}</label>
                                                        <MonthYearPicker
                                                            name="partialPayment1.partPayDate"
                                                            date={partialPayment1.partPayDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="partialPayment1.partPayAmount">{planningMessage.partialPaymentAmount}</label>
                                                        <CurrencyInput name="partialPayment1.partPayAmount" value={partialPayment1.partPayAmount} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row mt-4">
                                                    <div className="form-group col-md-12">
                                                        <button onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="partialPayment2" title="Partial Payments 2">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment2.startDate">{planningMessage.loanStartDate}</label>
                                                        <MonthYearPicker mode="readOnly" name="partialPayment2.startDate" date={partialPayment2.startDate} onChange={onChange} />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment2.partPayDate">{planningMessage.partialPaymentDate}</label>
                                                        <MonthYearPicker
                                                            name="partialPayment2.partPayDate"
                                                            date={partialPayment2.partPayDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="partialPayment2.partPayAmount">{planningMessage.partialPaymentAmount}</label>
                                                        <CurrencyInput name="partialPayment2.partPayAmount" value={partialPayment2.partPayAmount} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row mt-4">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={partialPayment2.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="partialPayment3" title="Partial Payments 3">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment3.startDate">{planningMessage.loanStartDate}</label>
                                                        <MonthYearPicker name="partialPayment3.startDate" date={partialPayment3.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment3.partPayDate">{planningMessage.partialPaymentDate}</label>
                                                        <MonthYearPicker
                                                            name="partialPayment3.partPayDate"
                                                            date={partialPayment3.partPayDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="partialPayment3.partPayAmount">{planningMessage.partialPaymentAmount}</label>
                                                        <CurrencyInput name="partialPayment3.partPayAmount" value={partialPayment3.partPayAmount} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row mt-4">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={partialPayment3.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="partialPayment4" title="Partial Payments 4">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment4.startDate">{planningMessage.loanStartDate}</label>
                                                        <MonthYearPicker name="partialPayment4.startDate" date={partialPayment4.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="partialPayment4.partPayDate">{planningMessage.partialPaymentDate}</label>
                                                        <MonthYearPicker
                                                            name="partialPayment4.partPayDate"
                                                            date={partialPayment4.partPayDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="partialPayment4.partPayAmount">{planningMessage.partialPaymentAmount}</label>
                                                        <CurrencyInput name="partialPayment4.partPayAmount" value={partialPayment4.partPayAmount} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row mt-4">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={partialPayment4.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </form>
                            <div className="emiCalculatorNew">
                                <Table items={response.amortisation} />
                            </div>
                        </div>
                        <div className="col-4 goal-form">
                            <DonutChart
                                isLoading={isLoading}
                                handleTabChange={handleTabChange}
                                title="Break - up Total Payment"
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
                                                name: 'Loan Amount',
                                                value: formatMoney(response.loanAmount)
                                            },
                                            {
                                                name: 'Loan Term',
                                                value: response.loanTerm
                                            },
                                            {
                                                name: 'Revised Term',
                                                value: response.revisedTerm
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        cssClass: 'design2',
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
                                        id: 3,
                                        cssClass: 'design3',
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
    ...state.partialPaymentsReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculatePartialPayments,
    changePartialPaymentsButtonClicked
    // clearPartialPayments
};

export default connect(mapStateToPros, mapDispatchToProps)(PartialPaymentsWithoutLogin);
