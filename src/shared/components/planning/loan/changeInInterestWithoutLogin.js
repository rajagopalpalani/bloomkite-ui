import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Loader from '../../common/loader';
import { onChange, calculateInterestChange, changeInInterestButtonClicked, clearChangeInInterest } from '../../../actions/changeInInterest';
import MonthYearPicker from '../../common/monthYearPicker';
import CurrencyInput from '../../common/currencyInput';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import DonutChart from '../common/donutChart';
import Table from '../common/table';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class ChangeInInterestWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openResultPopup: false,
            disabled: true
        };
    }

    componentDidUpdate(newProps, oldProps) {
        let { requestCount, loanAmount, tenure, interestRate } = newProps;
        if (this.props.loanAmount !== loanAmount || this.props.tenure !== tenure || this.props.interestRate !== interestRate) {
            if (oldProps != newProps) {
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
        this.props.changeInInterestButtonClicked();
        this.props.calculateInterestChange();
        this.onOpenResultModal();
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        // this.props.clearChangeInInterest();
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
            interestChange1,
            interestChange2,
            interestChange3,
            interestChange4,
            response,
            isLoading,
            onChange,
            handleTabChange,
            calculateInterestChange
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
                                <PaymentStartDate title="Schedule showing EMI payments starting from" dateValue={date} onChange={onChange} />
                                <div className="tab-container">
                                    <Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(value) => onChange('tabKey', value)}>
                                        <Tab eventKey="interestChange1" title="Interest Change 1">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange1.startDate">{planningMessage.currentInterestStartDate}</label>
                                                        <MonthYearPicker name="interestChange1.startDate" date={interestChange1.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange1.currentRate">{planningMessage.currentInterestRate}</label>
                                                        <CurrencyInput
                                                            name="interestChange1.currentRate"
                                                            value={interestChange1.currentRate}
                                                            type="decimal"
                                                            onChange={onChange}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange1.interestChangedDate">{planningMessage.revisedIntereststartDate}</label>
                                                        <MonthYearPicker
                                                            name="interestChange1.interestChangedDate"
                                                            date={interestChange1.interestChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange1.changedRate">{planningMessage.revisedInterestrate}</label>
                                                        <CurrencyInput name="interestChange1.changedRate" value={interestChange1.changedRate} type="decimal" onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={interestChange1.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="interestChange2" title="Interest Change 2">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange2.startDate">{planningMessage.currentInterestStartDate}</label>
                                                        <MonthYearPicker name="interestChange2.startDate" date={interestChange2.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange2.currentRate">{planningMessage.currentInterestRate}</label>
                                                        <CurrencyInput name="interestChange2.currentRate" value={interestChange2.currentRate} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange2.interestChangedDate">{planningMessage.revisedIntereststartDate}</label>
                                                        <MonthYearPicker
                                                            name="interestChange2.interestChangedDate"
                                                            date={interestChange2.interestChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange2.changedRate">{planningMessage.revisedInterestrate}</label>
                                                        <CurrencyInput name="interestChange2.changedRate" value={interestChange2.changedRate} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={interestChange2.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="interestChange3" title="Interest Change 3">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange3.startDate">{planningMessage.currentInterestStartDate}</label>
                                                        <MonthYearPicker name="interestChange3.startDate" date={interestChange3.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange3.currentRate">{planningMessage.currentInterestRate}</label>
                                                        <CurrencyInput name="interestChange3.currentRate" value={interestChange3.currentRate} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange3.interestChangedDate">{planningMessage.revisedIntereststartDate}</label>
                                                        <MonthYearPicker
                                                            name="interestChange3.interestChangedDate"
                                                            date={interestChange3.interestChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange3.changedRate">{planningMessage.revisedInterestrate}</label>
                                                        <CurrencyInput name="interestChange3.changedRate" value={interestChange3.changedRate} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={interestChange3.disabled}
                                                            onClick={this.handleSubmit}
                                                            type="button"
                                                            className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="interestChange4" title="Interest Change 4">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange4.startDate">{planningMessage.currentInterestStartDate}</label>
                                                        <MonthYearPicker name="interestChange4.startDate" date={interestChange4.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange4.currentRate">{planningMessage.currentInterestRate}</label>
                                                        <CurrencyInput name="interestChange4.currentRate" value={interestChange4.currentRate} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange4.interestChangedDate">{planningMessage.revisedIntereststartDate}</label>
                                                        <MonthYearPicker
                                                            name="interestChange4.interestChangedDate"
                                                            date={interestChange4.interestChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="interestChange4.changedRate">{planningMessage.revisedInterestrate}</label>
                                                        <CurrencyInput name="interestChange4.changedRate" value={interestChange4.changedRate} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button
                                                            disabled={interestChange4.disabled}
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
                                                value: response.revisedTerm ? response.revisedTerm : ''
                                            },
                                            {
                                                name: 'Total Interest Payable',
                                                value: formatMoney(response.interestPayable)
                                            }
                                        ]
                                    },
                                    {
                                        id: 3,
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
    ...state.changeInInterestReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculateInterestChange,
    changeInInterestButtonClicked
    // clearChangeInInterest
};

export default connect(mapStateToPros, mapDispatchToProps)(ChangeInInterestWithoutLogin);
