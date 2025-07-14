import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import Slider from '../common/slider';
import classNames from 'classnames';
import Loader from '../../common/loader';
import { onChange, calculate, clearTenureFinder } from '../../../actions/tenureFinder';
import { formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import { maxLength, lakshsMethod, croresMethod,interestRateMethod } from '../../../constants/commonRules';
import CalcHeader from '../calcHeader';

class TenureFinderWithoutLogin extends Component {
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
        let { requestCount, presentValue, rateOfInterest, futureValue } = newProps;
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

    handleCalculate = () => {
        this.props.calculate();
        this.setState({ disabled: true });
        if (this.props.presentValue > 0 && this.props.rateOfInterest > 0 && this.props.futureValue > 0) {
            this.onOpenResultModal();
        }
    };
    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        this.props.clearTenureFinder();
    };

    render() {
        let { selectedPlan, futureValue, futureValueInLakshs, presentValue, presentValueInLakshs, rateOfInterest, tenure, currentTab, handleTabChange, onChange, isLoading } =
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
                        </form>
                    </div>
                    <div className="col-4 goal-form">
                        <div className="investment-board">
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
    clearTenureFinder
};

export default connect(mapStateToPros, mapDispatchToProps)(TenureFinderWithoutLogin);
