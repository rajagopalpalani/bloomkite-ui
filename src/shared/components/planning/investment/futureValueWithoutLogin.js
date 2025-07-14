import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import classNames from 'classnames';
import Loader from '../../common/loader';
import { onChange, calculate, clearFutureValue } from '../../../actions/futureValue';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import CalcHeader from '../calcHeader';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod, interestRateMethod } from '../../../constants/commonRules';

class FutureValueWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openResultPopup: false,
            disabled: true
        };
    }

    viewAllInvestment = () => {
        this.props.handleTabChange(4);
    };

    componentDidUpdate(newProps, oldProps) {
        let { requestCount, invAmount, duration, annualGrowth } = newProps;
        if (this.props.invAmount !== 0 && this.props.duration !== 0 && this.props.annualGrowth !== 0) {
            if (this.props.invAmount != invAmount || this.props.duration != duration || this.props.annualGrowth != annualGrowth) {
                this.setState({ disabled: false });
            }
        }
        if (this.props.invAmount != invAmount || this.props.duration != duration || this.props.annualGrowth != annualGrowth) {
            if (this.props.invAmount == 0 || this.props.duration == 0 || this.props.annualGrowth == 0) {
                this.setState({ disabled: true });
            }
        }
    }
    handleCalculate = () => {
        this.props.calculate();
        this.setState({ disabled: true });
        if (this.props.invAmount > 0 && this.props.duration > 0 && this.props.annualGrowth > 0) {
            this.onOpenResultModal();
        }
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        this.props.clearFutureValue();
    };

    render() {
        let { selectedPlan, invAmount, invAmountInLakshs, duration, durationInYear, annualGrowth, yearlyIncrease, totalPayment, currentTab, handleTabChange, onChange, isLoading } =
            this.props;
        return (
            <div className="calc">
                <CalcHeader
                    items={this.props.investments}
                    savedItems={this.props.selectedItems}
                    showSaveBtn={true}
                    selectedItem={this.props.selectedInvestment}
                    chooseItem={this.props.chooseInvestment}
                    disabled={this.state.disabled}
                    handleSave={this.handleCalculate}
                />
                <div className="row col-12 nomargin nopadding">
                    <div className="col-8 goal-form">
                        <form>
                            <Slider
                                options={{
                                    title: 'Investment amount',
                                    switchCss: 'la-cr',
                                    isSwitchOn: invAmountInLakshs,
                                    textCss: 'lg',
                                    value: invAmount,
                                    min: 0
                                }}
                                value={invAmount}
                                maxLength={invAmountInLakshs ? maxLength.lakshs : maxLength.crores}
                                onKeyPress={(e) => invAmountInLakshs ? lakshsMethod(e) : croresMethod(e)}
                                getConfig={Helper.loanAmountConfig}
                                onChange={(value) => onChange('invAmount', value, 'blur')}
                                onSwitchChange={() => onChange('invAmountInLakshs', !invAmountInLakshs, 'blur')}
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
                                    title: 'Annual growth rate',
                                    textCss: 'sm',
                                    value: annualGrowth,
                                    min: 0,
                                    percent: true
                                }}
                                value={annualGrowth}
                                maxLength={maxLength.interestRate}
                                onKeyPress={(e) => interestRateMethod(e)}
                                getConfig={Helper.invRateConfig}
                                onChange={(value) => onChange('annualGrowth', value, 'blur')}
                            />
                            {/* <Slider
                                    options={{
                                        title: 'Yearly increase in investment',
                                        textCss: 'sm',
                                        value: yearlyIncrease,
                                        min: 0,
                                    }}
                                    value={yearlyIncrease + ' %'}
                                    getConfig={Helper.invRateConfig}
                                    onChange={(value) =>
                                        onChange(
                                            'yearlyIncrease',
                                            value,
                                            'blur'
                                        )
                                    }
                                /> */}
                        </form>
                    </div>
                    <div className="col-4 goal-form">
                        <div className="investment-board">
                            <h5 className="saveGoal">{planningMessage.totalPayment}</h5>
                            <div className="goal-table-design2">
                                <table className="cf-table cf-right-design">
                                    <tbody>
                                        <tr>
                                            <td> {planningMessage.futureValue} </td>
                                            <td className="box-size">
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
                        </div>
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToPros = (state) => ({ ...state.futureValueReducer, ...state.appStateReducer });

const mapDispatchToProps = {
    onChange,
    calculate,
    clearFutureValue
};

export default connect(mapStateToPros, mapDispatchToProps)(FutureValueWithoutLogin);
