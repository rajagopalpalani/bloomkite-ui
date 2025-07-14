import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import classNames from 'classnames';
import Loader from '../../common/loader';
import { onChange, calculate, clearTargetValue } from '../../../actions/targetValue';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import CalcHeader from '../calcHeader';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { maxLength, yearMethod, monthMethod, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';

class TargetValueWithoutLogin extends Component {
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
        let { requestCount, futureValue, duration, rateOfInterest } = newProps;
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
    handleCalculate = () => {
        this.props.calculate();
        this.setState({ disabled: true });
        if (this.props.futureValue > 0 && this.props.duration > 0 && this.props.rateOfInterest > 0) {
            this.onOpenResultModal();
        }
    };
    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        this.props.clearTargetValue();
    };

    render() {
        let { selectedPlan, futureValue, futureValueInLakshs, duration, durationInYear, rateOfInterest, totalPayment, currentTab, handleTabChange, onChange, isLoading } =
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
                        </form>
                    </div>
                    <div className="col-4 goal-form">
                        <div className="investment-board">
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
    clearTargetValue
};

export default connect(mapStateToPros, mapDispatchToProps)(TargetValueWithoutLogin);
