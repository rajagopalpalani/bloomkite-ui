import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Tabs, Tab } from 'react-bootstrap';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Loader from '../../common/loader';
import MonthYearPicker from '../../common/monthYearPicker';
import CurrencyInput from '../../common/currencyInput';
import Table from '../common/table';
import Slider from '../common/slider';
import PaymentStartDate from '../common/paymentStartDate';
import DonutChart from '../common/donutChart';
import { onChange, calculateEmiChange,calculateShare } from '../../../actions/changeInEmi';
import { MONEY } from '../../../constants/appConstants';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import PdfLoan from '../pdfLoan';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import FontIcon from '../../common/fontAwesomeIcon';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod, interestRateMethod } from '../../../constants/commonRules';

class ChangeInEmi extends Component {
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
        let { emiChangeId } = this.props;
        if (emiChangeId === 0) {
            let referenceId = window.localStorage.getItem('referenceId');
            this.props.fetchLoanPlanning(referenceId);
        } else {
            this.props.calculateEmiChange();
        }
    }

    handleSave = () => {
        this.props.calculateEmiChange();
        this.setState({ disabled: true });
    };

    handleCalculate = () => {
        this.props.calculateShare();
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, response, loanAmount, tenure, loanDate, interestRate } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (response && response.total) {
            return (
                <PdfLoan
                    changeInEmi={response}
                    plan={plan}
                    name={name}
                    fileName="ChangeInEMI"
                    changeInEmiInfo={{
                        interestRate,
                        loanDate,
                        loanAmount,
                        tenure
                    }}
                />
            );
        }
        return null;
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
            handleTabChange,
            isSharedPlan,
            sharedTab
        } = this.props;
        let amount = formatLoanAmount(loanAmount, loanAmountInLakshs);
        const loan = 'loan';
        return (
            <div>
                {!sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader name={this.props.plan.name} showSaveBtn={true} handleSave={this.handleSave} disabled={this.state.disabled} sharedTab={sharedTab}>
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    </div>)}
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
                        handleSave={this.handleSave}
                        sharedTab={sharedTab}
                    />
                    <div className="col-12">
                        <div className="row planning-right">
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
                                                        <button disabled={emiChange1.disabled} onClick={calculateEmiChange} type="button" className="btn btn-primary pull-right">
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
                                                        <button disabled={emiChange2.disabled} onClick={calculateEmiChange} type="button" className="btn btn-primary pull-right">
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
                                                        <button disabled={emiChange3.disabled} onClick={calculateEmiChange} type="button" className="btn btn-primary pull-right">
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
                                                        <button disabled={emiChange4.disabled} onClick={calculateEmiChange} type="button" className="btn btn-primary pull-right">
                                                            {planningMessage.calculate}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <Table items={response.amortisation} />
                            </div>
                            <div className="col-5 cashflow-right">
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
    ...state.changeInEmiReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculateEmiChange,
    calculateShare
};

export default connect(mapStateToPros, mapDispatchToProps)(ChangeInEmi);
