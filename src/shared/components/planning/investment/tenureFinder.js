import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import Loader from '../../common/loader';
import { onChange, calculate, calculateShare } from '../../../actions/tenureFinder';
import { formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import { fetchInvestmentPlanning } from '../../../actions/planning';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import PdfInvestment from '../pdfInvestment';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import FontIcon from '../../common/fontAwesomeIcon';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { maxLength, lakshsMethod, croresMethod, } from '../../../constants/commonRules';

class TenureFinder extends Component {
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
        let { tenureFinderId } = this.props;
        if (tenureFinderId) {
            let referenceId = window.localStorage.getItem('referenceId');
            if (referenceId) {
                this.props.fetchInvestmentPlanning(referenceId);
            }
        }
    }

    componentDidUpdate(newProps) {
        let { presentValue, rateOfInterest, futureValue } = newProps;
        if (this.props.presentValue !== 0 && this.props.rateOfInterest !== 0 && this.props.futureValue !== 0) {
            if (this.props.presentValue != presentValue || this.props.rateOfInterest != rateOfInterest || this.props.futureValue != futureValue) {
                this.setState({ disabled: false });
            }
        }
        if (this.props.presentValue != presentValue || this.props.rateOfInterest != rateOfInterest || this.props.futureValue != futureValue) {
            if (this.props.presentValue == 0 || this.props.rateOfInterest == 0 || this.props.futureValue == 0) {
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
        const { plan, advisorDetails, response, futureValue, presentValue, annualGrowth, duration, tenure, rateOfInterest } = this.props;
        let tenureFinder = {
            futureValue,
            presentValue,
            annualGrowth,
            rateOfInterest,
            duration,
            tenure
        };
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (tenure) {
            return (
                <PdfInvestment
                    tenureFinder={tenureFinder}
                    plan={plan}
                    name={name}
                    fileName="TenureFinder"
                    tenureFinderInfo={{
                        futureValue,
                        rateOfInterest,
                        presentValue,
                        annualGrowth,
                        duration,
                        tenure
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
            presentValue,
            presentValueInLakshs,
            rateOfInterest,
            annualGrowth,
            duration,
            tenure,
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
                        sharedTab={sharedTab}
                    />
                    <div className="col-12">
                        <div className="row col-12 nomargin nopadding">
                            <div className="col-7 goal-form bg white">
                                <Slider
                                    options={{
                                        title: 'Amount of Investment',
                                        switchCss: 'la-cr',
                                        isSwitchOn: presentValueInLakshs,
                                        textCss: 'lg',
                                        value: presentValue,
                                        min: 0
                                    }}
                                    value={presentValue}
                                    maxLength={presentValueInLakshs ? maxLength.lakshs : maxLength.crores}
                                    onKeyPress={(e) => presentValueInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                    getConfig={Helper.loanAmountConfig}
                                    onChange={(value) => onChange('presentValue', value, 'blur')}
                                    onSwitchChange={() => onChange('presentValueInLakshs', !presentValueInLakshs, 'blur')}
                                />
                                <Slider
                                    options={{
                                        title: 'Annual growth rate',
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
                                    maxLength={presentValueInLakshs ? maxLength.lakshs : maxLength.crores}
                                    onKeyPress={(e) => presentValueInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                    getConfig={Helper.loanAmountConfig}
                                    onChange={(value) => onChange('futureValue', value, 'blur')}
                                    onSwitchChange={() => onChange('futureValueInLakshs', !futureValueInLakshs, 'blur')}
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
                                                    <td> {planningMessage.tentureToAchieve} </td>
                                                    <td className="box-size"> {tenure + ' Yrs'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {sharedTab && sharedTab.postedToPartyId &&
                                        <div className="goal-table-design3">
                                            <SharedPlanChat currentPlanTab={investment} sharedTab={sharedTab}></SharedPlanChat>
                                        </div>
                                    }
                                    {isSharedPlan &&
                                        <div className="goal-table-design3">
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

const mapStateToPros = (state) => ({ ...state.tenureFinderReducer, ...state.appStateReducer });

const mapDispatchToProps = {
    onChange,
    calculate,
    calculateShare,
    fetchInvestmentPlanning
};

export default connect(mapStateToPros, mapDispatchToProps)(TenureFinder);
