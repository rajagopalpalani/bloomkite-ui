import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import Loader from '../../common/loader';
import { onChange, calculate, calculateShare } from '../../../actions/targetValue';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import { fetchInvestmentPlanning } from '../../../actions/planning';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import PdfInvestment from '../pdfInvestment';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import FontIcon from '../../common/fontAwesomeIcon';
import { faShare, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class TargetValue extends Component {
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

    viewAllInvestment = () => {
        this.props.handleTabChange(4);
    };

    componentDidMount() {
        let { targetValueId } = this.props;
        if (targetValueId) {
            let referenceId = window.localStorage.getItem('referenceId');
            if (referenceId) {
                this.props.fetchInvestmentPlanning(referenceId);
            }
        }
    }

    componentDidUpdate(newProps) {
        let { futureValue, duration, rateOfInterest } = newProps;
        if (this.props.futureValue !== 0 && this.props.duration !== 0 && this.props.rateOfInterest !== 0) {
            if (this.props.futureValue != futureValue || this.props.duration != duration || this.props.rateOfInterest != rateOfInterest) {
                this.setState({ disabled: false });
            }
        }
        if (this.props.futureValue != futureValue || this.props.duration != duration || this.props.rateOfInterest != rateOfInterest) {
            if (this.props.futureValue == 0 || this.props.duration == 0 || this.props.rateOfInterest == 0) {
                this.setState({ disabled: true });
            }
        }
    }

    handleSave = () => {
        this.props.calculate();
        setTimeout(() => {
            let referenceId = window.localStorage.getItem('referenceId');
            if (referenceId) {
                this.props.fetchInvestmentPlanning(referenceId);
            }
        }, 1000);
        this.setState({ disabled: true });
    };

    handleCalculate = () => {
        this.props.calculateShare();
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, futureValue, duration, rateOfInterest, totalPayment } = this.props;
        let targetValue = {
            futureValue,
            duration,
            rateOfInterest,
            totalPayment
        };

        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (totalPayment) {
            return (
                <PdfInvestment
                    targetValue={targetValue}
                    plan={plan}
                    name={name}
                    fileName="TargetValue"
                    targetValueInfo={{
                        futureValue,
                        duration,
                        rateOfInterest,
                        totalPayment
                    }}
                />
            );
        }
        return null;
    };

    render() {
        let {
            selectedPlan,
            futureValue,
            futureValueInLakshs,
            duration,
            durationInYear,
            rateOfInterest,
            totalPayment,
            currentTab,
            handleTabChange,
            onChange,
            isLoading,
            isSharedPlan,
            sharedTab
        } = this.props;
        const investment = 'investment';
        return (
            <div>
                {!sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader name={this.props.plan.name} showSaveBtn={true} handleSave={this.handleSave} disabled={this.state.disabled} sharedTab={sharedTab}>
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
                            sharedTab={sharedTab}>
                        </PlanningHeader>
                    </div>)
                }
                <div className="row col-12 planning-gap calc">
                    <PlanningLeftbar handleTabChange={handleTabChange} currentTab={currentTab} selectedPlan={selectedPlan} />
                    <CalcHeader
                        items={this.props.investments}
                        savedItems={this.props.selectedItems}
                        showSaveBtn={false}
                        selectedItem={this.props.selectedInvestment}
                        chooseItem={this.props.chooseInvestment}
                        disabled={this.state.disabled}
                        handleSave={this.handleCalculate}
                        sharedTab={sharedTab} />
                    <div className="col-12">
                        <div className="row col-12 nomargin nopadding">
                            <div className="col-7 goal-form bg white">
                                <Slider
                                    options={{
                                        title: 'Amount required in future',
                                        switchCss: 'la-cr',
                                        isSwitchOn: futureValueInLakshs,
                                        textCss: 'lg',
                                        value: futureValue,
                                        min: 0
                                    }}
                                    value={futureValue}
                                    maxLength={futureValueInLakshs ? maxLength.lakshs : maxLength.crores}
                                    onKeyPress={(e) => futureValueInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                    getConfig={Helper.loanAmountConfig}
                                    onChange={(value) => onChange('futureValue', value, 'blur')}
                                    onSwitchChange={() => onChange('futureValueInLakshs', !futureValueInLakshs, 'blur')}
                                />
                                <Slider
                                    options={{
                                        title: 'Investment duration',
                                        switchCss: 'yr-mo',
                                        isSwitchOn: durationInYear,
                                        textCss: 'sm',
                                        value: duration,
                                        min: 0
                                    }}
                                    value={duration}
                                    maxLength={durationInYear ? maxLength.year : maxLength.month}
                                    onKeyPress={(e) => durationInYear ? yearMethod(e) : monthMethod(e)}
                                    getConfig={Helper.tenureConfig}
                                    onChange={(value) => onChange('duration', value, 'blur')}
                                    onSwitchChange={() => onChange('durationInYear', !durationInYear, 'blur')}
                                />
                                <Slider
                                    options={{
                                        title: 'Annual growth rate expected on the investments',
                                        textCss: 'sm',
                                        value: rateOfInterest,
                                        min: 0,
                                        percent: true
                                    }}
                                    value={rateOfInterest}
                                    maxLength={maxLength.interestRate}
                                    onKeyPress={(e) => interestRateMethod(e)}
                                    getConfig={Helper.invRateConfig}
                                    onChange={(value) => onChange('rateOfInterest', value, 'blur')}
                                />
                            </div>
                            <div className="col-5 cashflow-right">
                                <div className="investmentwl-board goal-rightside">
                                    {/* <button onClick={() => this.viewAllInvestment()} className="view-all-btn">
                                        {planningMessage.viewInvestment}
                                    </button> */}
                                    <h5 className="saveGoal">{planningMessage.totalPayment}</h5>
                                    <div className="goal-table-design2">
                                        <table className="cf-table cf-right-design">
                                            <tbody>
                                                <tr>
                                                    <td>{planningMessage.investmentAmount}</td>
                                                    <td className="box-size">
                                                        {' '}
                                                        {totalPayment && (
                                                            <span>
                                                                <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                {formatMoney(totalPayment)}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {sharedTab && sharedTab.postedToPartyId &&
                                        <div className="finance-table-design1">
                                            <SharedPlanChat currentPlanTab={investment} sharedTab={sharedTab}></SharedPlanChat>
                                        </div>
                                    }
                                    {isSharedPlan &&
                                        <div className="finance-table-design1">
                                            <PlanChat currentPlanTab={investment}></PlanChat>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToPros = (state) => ({ ...state.targetValueReducer, ...state.appStateReducer });

const mapDispatchToProps = {
    onChange,
    calculate,
    calculateShare,
    fetchInvestmentPlanning
};

export default connect(mapStateToPros, mapDispatchToProps)(TargetValue);
