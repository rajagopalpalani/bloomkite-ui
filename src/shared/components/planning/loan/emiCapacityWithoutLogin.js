import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onChange, calculateEmiCapacity, changeEmiCapacityButtonClicked, clearEmiCapacity } from '../../../actions/emiCapacity';
import { formatMoney } from '../../../helpers/planningHelper';
import Loader from '../../common/loader';
import Input from '../../common/input';
import Select from '../../common/select';
import CurrencyInput from '../../common/currencyInput';
import { fetchLoanPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import { maxLength, pincodeMethod } from '../../../constants/commonRules';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import classNames from 'classnames';
import CalcHeader from '../calcHeader';
import DonutChart from '../common/donutChart';

class EmiCapacityWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openResultPopup: false,
            disabled: true
        };
    }

    componentDidUpdate(newProps, oldProps) {
        let { currentAge, retirementAge, stability, additionalIncome, existingEmi, houseHoldExpense, netFamilyIncome, backUp } = newProps;
        if (
            this.props.currentAge !== currentAge ||
            this.props.retirementAge !== retirementAge ||
            this.props.stability !== stability ||
            this.props.backUp !== backUp ||
            this.props.additionalIncome !== additionalIncome ||
            this.props.existingEmi !== existingEmi ||
            this.props.houseHoldExpense !== houseHoldExpense ||
            this.props.netFamilyIncome !== netFamilyIncome
        ) {
            if (this.props.currentAge && this.props.retirementAge && this.props.stability && this.props.backUp) {
                this.setState({ disabled: false });
            }
            if (!this.props.currentAge || !this.props.retirementAge || (!this.props.stability && this.props.backUp)) {
                this.setState({ disabled: true });
            }
        }
    }

    handleSubmit = () => {
        this.props.changeEmiCapacityButtonClicked();
        this.props.calculateEmiCapacity();
        this.onOpenResultModal();
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
        // this.props.clearEmiCapacity();
    };

    render() {
        let {
            additionalIncome,
            backUp,
            principle,
            interest,
            currentAge,
            existingEmi,
            houseHoldExpense,
            interestRate,
            netFamilyIncome,
            retirementAge,
            stability,
            response,
            isLoading,
            currentTab,
            handleTabChange,
            onChange
        } = this.props;
        let termOfLoan = '';
        if (response.termOfLoan) {
            termOfLoan = `${response.termOfLoan} Yrs`;
            // termOfLoan = `${response.termOfLoan < 20 ? 20 : response.termOfLoan} Yrs`;
        }
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
                        <div className="col-8 emicapacity-form">
                            <div className="emi-capacity">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{planningMessage.emiCapcity}</th>
                                            <th>{planningMessage.value}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{planningMessage.currentAge}</td>
                                            <td>
                                                <Input name="currentAge" value={currentAge} maxLength={maxLength.age} onKeyPress={(e) => pincodeMethod(e)} onChange={onChange} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{planningMessage.retirementAge}</td>
                                            <td>
                                                <Input
                                                    name="retirementAge"
                                                    value={retirementAge}
                                                    maxLength={maxLength.age}
                                                    onKeyPress={(e) => pincodeMethod(e)}
                                                    onChange={onChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>How stable is your Income at the current as well as future</td>
                                            <td>
                                                <Select name="stability" value={stability} onChange={onChange} options={['HIGH', 'MEDIUM']} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Incase temperory loss of No
                                                <br /> Do you have Backup Income for 3 to 6 months
                                            </td>
                                            <td>
                                                <Select name="backUp" value={backUp} onChange={onChange} options={['YES', 'NO']} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{planningMessage.netFamilyIncome}</td>
                                            <td>
                                                <CurrencyInput name="netFamilyIncome" value={netFamilyIncome} onChange={onChange} size="sm" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{planningMessage.emiIncludingSpouse}</td>
                                            <td>
                                                <CurrencyInput name="existingEmi" value={existingEmi} onChange={onChange} size="sm" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{planningMessage.houseExpenses}</td>
                                            <td>
                                                <CurrencyInput name="houseHoldExpense" value={houseHoldExpense} onChange={onChange} size="sm" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>{planningMessage.additionalIncome}</td>
                                            <td>
                                                <CurrencyInput name="additionalIncome" value={additionalIncome} onChange={onChange} size="sm" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-4 goal-form">
                            <DonutChart
                                isLoading={isLoading}
                                handleTabChange={handleTabChange}
                                title="Total Payment"
                                plan={this.props.plan}
                                sections={[
                                    {
                                        id: 1,
                                        cssClass: 'design1 goal-table-design2',
                                        items: [
                                            {
                                                name: 'EMI Capacity',
                                                value: formatMoney(response.emiCapacity)
                                            },
                                            {
                                                name: 'Loan Term',
                                                value: termOfLoan
                                            }
                                        ]
                                    }
                                ]}
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
    ...state.emiCapacityReducer,
    ...state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails
});

const mapDispatchToProps = {
    onChange,
    fetchLoanPlanning,
    calculateEmiCapacity,
    changeEmiCapacityButtonClicked
    // clearEmiCapacity
};

export default connect(mapStateToPros, mapDispatchToProps)(EmiCapacityWithoutLogin);
