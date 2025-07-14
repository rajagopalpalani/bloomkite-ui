import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Loader from '../../common/loader';
import MonthYearPicker from '../../common/monthYearPicker';
import CurrencyInput from '../../common/currencyInput';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import { onChange, calculateEmiChange, changeInEmiButtonClicked, clearChangeInEmi } from '../../../actions/changeInEmi';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import DonutChart from '../common/donutChart';
import Table from '../common/table';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class ChangeInEmiWithoutLogin extends Component {
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
        this.props.changeInEmiButtonClicked();
        this.props.calculateEmiChange();
        this.onOpenResultModal();
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        // this.props.clearChangeInEmi();
    };

    render() {
        let {
            tabKey,
            currentTab,
            loanAmount,
            loanAmountInLakshs,
            tenure,
            tenureInYear,
            interestRate,
            date,
            loanDate,
            emiChange1,
            emiChange2,
            emiChange3,
            emiChange4,
            isLoading,
            response,
            onChange,
            calculateEmiChange,
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
                        {/* <div className="planning-center planning-right row" > */}
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
                                        <Tab eventKey="emiChange1" title="EMI Change 1">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange1.startDate">{planningMessage.emiStartDate}</label>
                                                        <MonthYearPicker name="emiChange1.startDate" date={emiChange1.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange1.currentEmi">{planningMessage.currentEmi}</label>
                                                        <CurrencyInput name="emiChange1.currentEmi" value={emiChange1.currentEmi} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange1.emiChangedDate">{planningMessage.emiIncreaseDate}</label>
                                                        <MonthYearPicker
                                                            name="emiChange1.emiChangedDate"
                                                            date={emiChange1.emiChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange1.increasedEmi">{planningMessage.additionalemi}</label>
                                                        <CurrencyInput name="emiChange1.increasedEmi" value={emiChange1.increasedEmi} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button disabled={emiChange1.disabled} onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="emiChange2" title="EMI Change 2">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange2.startDate">{planningMessage.emiStartDate}</label>
                                                        <MonthYearPicker name="emiChange2.startDate" date={emiChange2.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange2.currentEmi">{planningMessage.currentEmi}</label>
                                                        <CurrencyInput name="emiChange2.currentEmi" value={emiChange2.currentEmi} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange2.emiChangedDate">{planningMessage.emiIncreaseDate}</label>
                                                        <MonthYearPicker
                                                            name="emiChange2.emiChangedDate"
                                                            date={emiChange2.emiChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange2.increasedEmi">{planningMessage.additionalemi}</label>
                                                        <CurrencyInput name="emiChange2.increasedEmi" value={emiChange2.increasedEmi} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button disabled={emiChange2.disabled} onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="emiChange3" title="EMI Change 3">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange3.startDate">{planningMessage.emiStartDate}</label>
                                                        <MonthYearPicker name="emiChange3.startDate" date={emiChange3.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange3.currentEmi">{planningMessage.currentEmi}</label>
                                                        <CurrencyInput name="emiChange3.currentEmi" value={emiChange3.currentEmi} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange3.emiChangedDate">{planningMessage.emiIncreaseDate}</label>
                                                        <MonthYearPicker
                                                            name="emiChange3.emiChangedDate"
                                                            date={emiChange3.emiChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange3.increasedEmi">{planningMessage.additionalemi}</label>
                                                        <CurrencyInput name="emiChange3.increasedEmi" value={emiChange3.increasedEmi} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button disabled={emiChange3.disabled} onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="emiChange4" title="EMI Change 4">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange4.startDate">{planningMessage.emiStartDate}</label>
                                                        <MonthYearPicker name="emiChange4.startDate" date={emiChange4.startDate} onChange={onChange} mode="readOnly" />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange4.currentEmi">{planningMessage.currentEmi}</label>
                                                        <CurrencyInput name="emiChange4.currentEmi" value={emiChange4.currentEmi} onChange={onChange} disabled={true} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange4.emiChangedDate">{planningMessage.emiIncreaseDate}</label>
                                                        <MonthYearPicker
                                                            name="emiChange4.emiChangedDate"
                                                            date={emiChange4.emiChangedDate}
                                                            onChange={onChange}
                                                            mode="calendarOnly"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label htmlFor="emiChange4.increasedEmi">{planningMessage.additionalemi}</label>
                                                        <CurrencyInput name="emiChange4.increasedEmi" value={emiChange4.increasedEmi} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <button disabled={emiChange4.disabled} onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">
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
                                                name: 'Revised EMI',
                                                value: response.revisedEmi ? formatMoney(response.revisedEmi) : ''
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
    ...state.changeInEmiReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculateEmiChange,
    changeInEmiButtonClicked
    // clearChangeInEmi
};

export default connect(mapStateToPros, mapDispatchToProps)(ChangeInEmiWithoutLogin);
