import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import classNames from 'classnames';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { fetchGoalPlanning, calculate, onChange, clearGoalValue } from '../../../actions/myGoal';
import { calculateLoanAmount } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import PdfGoals from '../pdfGoals';
import PlanSharePopUp from '../../PlanningShare/PlanSharePopUp';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import Loader from '../../common/loader';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign, faShare } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod,monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

const GOALS = ['Wealth Creation', 'Buying House', 'Buying Car', 'Child Education', 'Child Marriage', 'Travel Plan', 'Retirement Plan', 'Child Education 2'];

class MyGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goalNames: GOALS.map((p) => {
                return {
                    value: p,
                    selected: false
                };
            }),
            selectedGoal: null,
            isGoalChosen: false,
            openPopup: false,
            disabled: true,
            isLoading: false
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    componentDidUpdate(oldProps) {
        const { isLoading } = this.props;
        const { isLoading: oldLoading } = oldProps;
        let { goals } = this.props;
        const savedGoalNames = goals.map(function (el) {
            return el.goalName;
        });
        let { goalName, tenure, goalAmount, inflationRate, currentAmount, growthRate, annualInvestmentRate } = oldProps;
        if (this.props.tenure !== 0 && this.props.goalAmount !== 0 && this.props.growthRate !== 0) {
            if (
                (this.props.tenure !== tenure ||
                    this.props.goalAmount !== goalAmount ||
                    this.props.inflationRate !== inflationRate ||
                    this.props.currentAmount !== currentAmount ||
                    this.props.growthRate !== growthRate ||
                    this.props.annualInvestmentRate !== annualInvestmentRate) &&
                this.props.goalName === goalName
            ) {
                this.setState({ disabled: false });
            }
        }
        if (this.props.tenure != tenure || this.props.goalAmount != goalAmount || this.props.growthRate != growthRate) {
            if (this.props.tenure == 0 || this.props.goalAmount == 0 || this.props.growthRate == 0) {
                this.setState({ disabled: true });
            }
        }
        if (isLoading !== oldLoading) {
            this.setState({ isLoading });
        }
    }

    componentDidMount() {
        let { goalId } = this.props;
        if (this.props.plan && goalId === 0) {
            this.props.fetchGoalPlanning();
        } else {
            this.updateGoalNames();
        }
        setTimeout(() => {
            let e = {
                target: {
                    value: 'Wealth Creation'
                }
            };
            this.chooseGoal(e);
        }, 2000);
    }

    handleSave = () => {
        let { goalName, tenure, tenureInYear, goalAmount, inflationRate, currentAmount, growthRate, annualInvestmentRate, goalAmountInLakshs, currentAmountInLakshs } = this.props;
        if (goalName) {
            let referenceId = window.localStorage.getItem('referenceId');
            goalAmount = calculateLoanAmount(goalAmount, goalAmountInLakshs);
            currentAmount = calculateLoanAmount(currentAmount, currentAmountInLakshs);
            const payload = {
                referenceId,
                goalName,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                tenure,
                annualInvestmentRate,
                currentAmount,
                goalAmount,
                growthRate,
                inflationRate
            };
            this.setState({
                isLoading: true
            });
            this.props.calculate(payload);
            this.setState({ disabled: true });
        }
    };

    handleCalculate = () => {
        let { goalName, tenure, tenureInYear, goalAmount, inflationRate, currentAmount, growthRate, annualInvestmentRate, goalAmountInLakshs, currentAmountInLakshs } = this.props;
        if (goalName) {
            goalAmount = calculateLoanAmount(goalAmount, goalAmountInLakshs);
            currentAmount = calculateLoanAmount(currentAmount, currentAmountInLakshs);
            const payload = {
                goalName,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                tenure,
                annualInvestmentRate,
                currentAmount,
                goalAmount,
                growthRate,
                inflationRate
            };
            this.setState({
                isLoading: true
            });
            this.props.calculate(payload);
            this.setState({ disabled: true });
        }
    };

    viewAllGoals = () => {
        this.props.fetchGoalPlanning();
        this.setState({
            isGoalChosen: false,
            selectedGoal: null
        });
    };

    chooseGoal = (e, selectedGoal) => {
        let { goals } = this.props;
        const savedGoalNames = goals.map(function (el) {
            return el.goalName;
        });
        selectedGoal = e.target.value;
        this.setState({ isGoalChosen: true, selectedGoal }, () => {
            this.props.onChange('goalName', selectedGoal);
            if (!savedGoalNames.includes(selectedGoal)) {
                this.props.clearGoalValue();
                this.setState({ disabled: true });
            }
        });
    };

    updateGoalNames() {
        let { goals } = this.props;
        let goalNames = GOALS.map((p) => {
            return {
                value: p,
                selected: goals.filter((g) => g.goalName === p).length > 0
            };
        });
        this.setState({ goalNames });
    }

    renderPdfLink = () => {
        const { goals, plan, advisorDetails } = this.props;
        const { isGoalChosen, selectedGoal } = this.state;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (goals && goals.length) {
            const goal = goals.find((goal) => selectedGoal === goal.goalName);
            const items = isGoalChosen && selectedGoal ? (goal ? [goal] : []) : goals;
            return <PdfGoals goals={items} plan={plan} name={name} fileName="Goals" />;
        }
    };

    render() {
        const goal = 'goal';

        let { goalNames, isGoalChosen } = this.state;
        const { isLoading } = this.state;
        let {
            goals,
            goalName,
            tenure,
            tenureInYear,
            goalAmount,
            inflationRate,
            currentAmount,
            growthRate,
            annualInvestmentRate,
            annualInv,
            finalCorpus,
            futureCost,
            futureValue,
            monthlyInv,
            rateOfReturn,
            onChange,
            advisorDetails,
            goalAmountInLakshs,
            currentAmountInLakshs,
            isSharedPlan,
            sharedTab,
            role
        } = this.props;
        const savedGoalNames = goals.map(function (el) {
            return el.goalName;
        });
        return (
            <div>
                <div className="col-12">
                    {this.props.plan && !sharedTab.postedToPartyId && (
                        <PlanningHeader showSaveBtn={true}
                            handleSave={this.handleSave}
                            disabled={this.state.disabled} name={this.props.plan.name} sharedTab={sharedTab}>
                            {/* {this.renderPdfLink()}                            {isGoalChosen && */}
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    )}
                    {this.props.plan && sharedTab.postedToPartyId && (
                        <PlanningHeader
                            items={GOALS}
                            name={this.props.plan.name}
                            savedItems={savedGoalNames}
                            showSaveBtn={false}
                            selectedItem={this.state.selectedGoal}
                            chooseItem={this.chooseGoal}
                            disabled={this.state.disabled}
                            handleCalculate={this.handleCalculate}
                            sharedTab={sharedTab}></PlanningHeader>
                    )}
                    {!this.props.plan && (
                        <PlanningHeader
                            showCalculateBtn={true}
                            enableCalculate={true}
                            handleCalculate={this.handleSave}
                        // name={this.props.plan.name}
                        >
                            {/* {this.renderPdfLink()} */}
                        </PlanningHeader>
                    )}
                </div>
                <div className="row col-12 planning-gap calc">
                    <div className="col-12">
                        <div className="planning-left row">
                            <div className="col-12 bg-white">
                                <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                                <CalcHeader
                                    items={GOALS}
                                    savedItems={savedGoalNames}
                                    showSaveBtn={false}
                                    selectedItem={this.state.selectedGoal}
                                    chooseItem={this.chooseGoal}
                                    disabled={this.state.disabled}
                                    handleSave={this.handleSave}
                                    sharedTab={sharedTab}
                                />
                                <div className="row col-12 planning-gap">
                                    <div className="row col-12 nomargin nopadding">
                                        <div className="col-7 goal-form">
                                            <form>
                                                <Slider
                                                    options={{
                                                        title: 'Number of years to achieve the goal',
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
                                                        title: "Estimated amount of the goal in today's scenario",
                                                        switchCss: 'la-cr',
                                                        isSwitchOn: goalAmountInLakshs,
                                                        textCss: 'lg',
                                                        value: goalAmount,
                                                        min: 0
                                                    }}
                                                    value={goalAmount}
                                                    maxLength={goalAmountInLakshs ? maxLength.lakshs : maxLength.crores}
                                                    onKeyPress={(e) => goalAmountInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                                    getConfig={Helper.loanAmountConfig}
                                                    onChange={(value) => onChange('goalAmount', value, 'blur')}
                                                    onSwitchChange={() => onChange('goalAmountInLakshs', !goalAmountInLakshs, 'blur')}
                                                />
                                                <Slider
                                                    options={{
                                                        title: 'Estimated inflation rate for future years',
                                                        textCss: 'sm',
                                                        value: inflationRate,
                                                        min: 0,
                                                        percent: true
                                                    }}
                                                    value={inflationRate}
                                                    maxLength={maxLength.interestRate}
                                                    onKeyPress={(e) => interestRateMethod(e)}
                                                    getConfig={Helper.rateConfig}
                                                    onChange={(value) => onChange('inflationRate', value, 'blur')}
                                                />
                                                <Slider
                                                    options={{
                                                        title: 'Amount accumulated so far towards the goal',
                                                        switchCss: 'la-cr',
                                                        isSwitchOn: currentAmountInLakshs,
                                                        textCss: 'lg',
                                                        value: currentAmount,
                                                        min: 0
                                                    }}
                                                    value={currentAmount}
                                                    maxLength={currentAmountInLakshs ? maxLength.lakshs : maxLength.crores}
                                                    onKeyPress={(e) => currentAmountInLakshs ? lakshMethod(e) : croresMethod(e)}
                                                    getConfig={Helper.loanAmountConfig}
                                                    onChange={(value) => onChange('currentAmount', value, 'blur')}
                                                    onSwitchChange={() => onChange('currentAmountInLakshs', !currentAmountInLakshs, 'blur')}
                                                />
                                                {/* <Slider
                                            options={{
                                                title: 'Amount accumulated so far towards the goal',
                                                textCss: 'lg',
                                                value: currentAmount,
                                                min: 0
                                            }}
                                            value={formatLoanAmount(currentAmount, true)}
                                            getConfig={Helper.goalAmountConfig}
                                            onChange={(value) => onChange('currentAmount', value, 'blur')}
                                        /> */}
                                                <Slider
                                                    options={{
                                                        title: 'Annual growth rate expected on the investments',
                                                        textCss: 'sm',
                                                        value: growthRate,
                                                        min: 0,
                                                        percent: true
                                                    }}
                                                    value={growthRate}
                                                    maxLength={maxLength.interestRate}
                                                    onKeyPress={(e) => interestRateMethod(e)}
                                                    getConfig={Helper.rateConfig}
                                                    onChange={(value) => onChange('growthRate', value, 'blur')}
                                                />
                                                <Slider
                                                    options={{
                                                        title: 'Increase in Investment contribution',
                                                        textCss: 'sm',
                                                        value: annualInvestmentRate,
                                                        min: 0,
                                                        percent: true
                                                    }}
                                                    value={annualInvestmentRate}
                                                    maxLength={maxLength.interestRate}
                                                    onKeyPress={(e) => interestRateMethod(e)}
                                                    getConfig={Helper.rateConfig}
                                                    onChange={(value) => onChange('annualInvestmentRate', value, 'blur')}
                                                />
                                            </form>
                                        </div>
                                        <div className="col-5 cashflow-right">
                                            <div className="goal-board goal-rightside">
                                                <h5 className="saveGoal">{this.state.selectedGoal}</h5>
                                                {/* <button onClick={this.viewAllGoals} className="view-all-btn">
                                                {planningMessage.viewGoal}
                                            </button> */}
                                                {/* {goals.length > 0 ? (
                                                    <ul className="goals">
                                                        {goals.map((p) => (
                                                            <li
                                                                key={p.goalId}
                                                                className={classNames({ selected: p.goalName === goalName })}
                                                                onClick={() => onChange('goalName', p.goalName)}>
                                                                {p.goalName}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="no-goals">{planningMessage.noSaveGoal}</p>
                                                )} */}

                                                {/* {this.state.savedGoals &&
                                                    this.state.savedGoals.map((goal, i) => (
                                                        <button key={i} goalNames className="goal-right-btn" onClick={() => this.setGoal(i)}>
                                                            {goal}
                                                        </button>
                                                    ))}
                                                <br />
                                                <br /> */}
                                                <div className="goal-table-design1">
                                                    <table className="cf-table cf-right-design">
                                                        <tbody>
                                                            <tr>
                                                                <td>{planningMessage.futureCostGoal}</td>
                                                                <td className="box-size">
                                                                    <span>
                                                                        <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                        {formatMoney(futureCost)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{planningMessage.futureValueAccumulations}</td>
                                                                <td className="box-size">
                                                                    <span>
                                                                        <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                        {formatMoney(futureValue)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="goal-table-design2">
                                                    <table className="cf-table cf-right-design">
                                                        <tbody>
                                                            <tr>
                                                                <td>{planningMessage.targetCorpus}</td>
                                                                <td className="box-size">
                                                                    <span>
                                                                        <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                        {formatMoney(finalCorpus)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{planningMessage.monthlyInvestments}</td>
                                                                <td className="box-size">
                                                                    <span>
                                                                        <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                        {formatMoney(monthlyInv)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{planningMessage.yearlyInvestments}</td>
                                                                <td className="box-size">
                                                                    <span>
                                                                        <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                                        {formatMoney(annualInv)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {sharedTab && sharedTab.postedToPartyId && (
                                                    <div className="goal-table-design3">
                                                        <SharedPlanChat currentPlanTab={goal} sharedTab={sharedTab}></SharedPlanChat>
                                                    </div>
                                                )}
                                                {isSharedPlan && (
                                                    <div className="goal-table-design3">
                                                        <PlanChat currentPlanTab={goal}></PlanChat>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
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

const mapStateToPros = (state) => ({
    ...state.goalReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});
const mapDispatchToProps = {
    onChange,
    calculate,
    fetchGoalPlanning,
    clearGoalValue
};

export default connect(mapStateToPros, mapDispatchToProps)(MyGoal);
