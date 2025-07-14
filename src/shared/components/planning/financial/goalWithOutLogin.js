import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from '../common/slider';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { fetchGoalPlanning, calculate, onChange, clearGoalValue } from '../../../actions/myGoal';
import { calculateLoanAmount } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import PlanningLeftBarWithOutLogin from '../planningLeftBarWithOutLogin';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import Loader from '../../common/loader';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import PlanningLeftbar from '../planningLeftside';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod, interestRateMethod } from '../../../constants/commonRules';

const GOALS = ['Wealth Creation', 'Buying House', 'Buying Car', 'Child Education', 'Child Marriage', 'Travel Plan', 'Retirement Plan'];

class GoalWithOutLogin extends React.Component {
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
            openResultPopup: false,
            disabled: true,
            isLoading: false
        };
    }

    componentDidMount() {
        let { goalId } = this.props;
        if (this.props.plan && goalId === 0) {
            this.props.fetchGoalPlanning();
        } else {
            this.updateGoalNames();
        }
        let e = {
            target: {
                value: 'Wealth Creation'
            }
        };
        this.chooseGoal(e);
    }

    componentDidUpdate(newProps, oldProps) {
        const { isLoading } = this.props;
        const { isLoading: oldLoading } = oldProps;
        let { tenure, goalAmount, inflationRate, currentAmount, growthRate, annualInvestmentRate } = newProps;
        if (this.props.tenure !== 0 && this.props.goalAmount !== 0 && this.props.growthRate !== 0) {
            if (
                this.props.tenure != tenure ||
                this.props.goalAmount != goalAmount ||
                this.props.inflationRate != inflationRate ||
                this.props.currentAmount != currentAmount ||
                this.props.growthRate != growthRate ||
                this.props.annualInvestmentRate != annualInvestmentRate
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
            if (this.props.tenure > 0 && this.props.goalAmount > 0 && this.props.inflationRate > 0) {
                this.onOpenResultModal();
            }
        }
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        this.props.clearGoalValue();
    };

    viewAllGoals = () => {
        this.props.fetchGoalPlanning();
        this.setState({ isGoalChosen: false, selectedGoal: null });
    };

    chooseGoal = (e, selectedGoal) => {
        selectedGoal = e.target.value;
        this.setState({ isGoalChosen: true, selectedGoal }, () => {
            this.props.onChange('goalName', selectedGoal);
            this.props.clearGoalValue();
            //  this.setState({ disabled: f });
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

    render() {
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
            goalAmountInLakshs,
            currentAmountInLakshs
        } = this.props;
        let selectedItems = [];
        return (
            <div className="planning-gap calc">
                <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                <div className="calc-without-login">
                    <CalcHeader
                        items={GOALS}
                        savedItems={selectedItems}
                        showSaveBtn={true}
                        selectedItem={this.state.selectedGoal}
                        chooseItem={this.chooseGoal}
                        disabled={this.state.disabled}
                        handleSave={this.handleSave}
                    />
                    <div className="row col-12 nomargin nopadding">
                        <div className="col-8 goal-form">
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
                                    onKeyPress={(e) => (tenureInYear ? yearMethod(e) : monthMethod(e))}
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
                                    onKeyPress={(e) => (goalAmountInLakshs ? lakshsMethod(e) : croresMethod(e))}
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
                                    onKeyPress={(e) => (currentAmountInLakshs ? lakshMethod(e) : croresMethod(e))}
                                    getConfig={Helper.loanAmountConfig}
                                    onChange={(value) => onChange('currentAmount', value, 'blur')}
                                    onSwitchChange={() => onChange('currentAmountInLakshs', !currentAmountInLakshs, 'blur')}
                                />
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
                        <div className="col-4 cashflow-right">
                            <div className="goal-board">
                                <h5 className="saveGoal">{this.state.selectedGoal}</h5>
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

export default connect(mapStateToPros, mapDispatchToProps)(GoalWithOutLogin);
