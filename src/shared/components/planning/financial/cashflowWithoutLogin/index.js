import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import Loader from '../../../common/loader';
import { cashFlowSelector } from '../../../../selectors/planning';
import { calculateCashflow } from '../../../../actions/planning';
import Table from './table';
import { planningMessage } from '../../../../constants/planningConstant';
import ContactPopupSignup from '../../../Contact/contactPopupSignup';
import CalcHeader from '../../calcHeader';
import FontIcon from '../../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../../common/customFormik';
import CustomFieldArray from '../../../common/customFieldArray';

class CashFlowWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormEditable: true,
            tabIndex: 0,
            openResultPopup: false,
            disabled: true
        };
        this.formRef = React.createRef();
    }

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
    };

    setActiveTab = (index) => {
        this.setState({ tabIndex: index });
    };

    cashFlowSchema = () => {
        this.setState({ disabled: false });
        const validator = Yup.number().test('+number', 'Should be positive number', (value) => {
            return Number.isInteger(value) && parseInt(value) >= 0;
        });
        const schema = Yup.object().shape({
            actualAmt: validator,
            budgetAmt: validator
        });
        return Yup.object().shape({
            cashFlow: Yup.object().shape({
                mandatoryHouseholdExpenses: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                lifeStyleExpenses: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                reccuringLoanRepayments: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                reccuringInvestments: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                nonReccuringExpenditures: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                reccuringIncome: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                nonReccuringIncome: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                })
            })
        });
    };

    handleSubmit = (values) => {
        const modifiedFormValues = this.checkModifiedFormValues(values.cashFlow, this.props.cashFlow);
        if (modifiedFormValues.length > 0) {
            const payload = {
                referenceId: localStorage.getItem('referenceId'),
                date: this.changeDateFormat(),
                cashFlowItemReq: this.formPayload(modifiedFormValues)
            };
            this.props.calculateCashflow(payload);
            this.onOpenResultModal();
        }
    };

    checkModifiedFormValues = (cashFlowItems, initialValues) => {
        var formValues = [];
        Object.keys(cashFlowItems).forEach((key) => {
            formValues.push(...cashFlowItems[key].formValues);
        });
        var initValues = [];
        Object.keys(initialValues).forEach((key) => {
            initValues.push(...initialValues[key].formValues);
        });
        return formValues.filter((cashFlow, i) => cashFlow.actualAmt != initValues[i].actualAmt || cashFlow.budgetAmt != initValues[i].budgetAmt);
    };

    formPayload = (cashFlowItems) => {
        const cashFlowFormValues = [];
        for (const cashFlow of cashFlowItems) {
            cashFlowFormValues.push({
                cashFlowItemId: cashFlow.cashFlowItemId,
                actualAmt: cashFlow.actualAmt,
                budgetAmt: cashFlow.budgetAmt
            });
        }
        return cashFlowFormValues;
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
        }
    };

    changeDateFormat = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[new Date().getMonth()] + '-' + new Date().getFullYear();
    };

    render() {
        const { isFormEditable, tabIndex } = this.state;
        let { isLoading } = this.props;
        let selectedItems = [];
        return (
            <div>
                <div className="row col-12 calc nomargin nopadding">
                    <CalcHeader
                        items={this.props.financials}
                        savedItems={selectedItems}
                        showSaveBtn={true}
                        selectedItem={this.props.selectedFinancial}
                        chooseItem={this.props.chooseFinancial}
                        disabled={this.state.disabled}
                        handleSave={this.handleSave}
                    />
                    <div className="col-8 plans">
                        <div className="row planning-right">
                            <div className="col-12 finance-center-align">
                                <CustomFormik
                                    initialValues={{
                                        cashFlow: JSON.parse(JSON.stringify(this.props.cashFlow))
                                    }}
                                    validationSchema={this.cashFlowSchema}
                                    onSubmit={this.handleSubmit}
                                    innerRef={this.formRef}>
                                    {({ values }) => (
                                        <Form>
                                            <CustomFieldArray
                                                name="cashFlow"
                                                render={(arrayHelpers) =>
                                                    Object.keys(values.cashFlow).map((key, index) => (
                                                        <Table
                                                            key={key}
                                                            name={key}
                                                            index={index}
                                                            editable={isFormEditable}
                                                            items={values.cashFlow[key].formValues}
                                                            flow={this.props.cashFlow}
                                                            tabIndex={tabIndex}
                                                            setActiveTab={this.setActiveTab}
                                                        />
                                                    ))
                                                }
                                            />
                                        </Form>
                                    )}
                                </CustomFormik>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 cashflow-right">
                        <div className="cashflow-board">
                            <div>
                                <h5 className="saveGoal">{planningMessage.cashFlowSummary}</h5>
                                <div className="goal-table-design1">
                                    <table className="cf-table cf-right-design">
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th className="value-align value-title">
                                                    {planningMessage.monthly}
                                                    <span>
                                                        <FontIcon icon={faRupeeSign} />
                                                    </span>
                                                </th>
                                                <th className="value-align value-title yearly">
                                                    {planningMessage.yearly}
                                                    <span>
                                                        <FontIcon icon={faRupeeSign} />
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>{'Income'}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.monthlyIncome}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.yearlyIncome}</td>
                                            </tr>
                                            {/* <tr>
                                                        <td>{planningMessage.nonRecurring}</td>
                                                        <td></td>
                                                        <td>
                                                            {this.props.cashFlowSummary && this.props.cashFlowSummary.nonRecurExpense}
                                                        </td>
                                                    </tr> */}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="goal-table-design1">
                                    <table className="cf-table cf-right-design">
                                        <tbody>
                                            {/* <tr>
                                                    <th>{planningMessage.income}</th>
                                                    <th className="value-align">
                                                        {planningMessage.monthly}
                                                    </th>
                                                    <th className="value-align">
                                                        {planningMessage.yearly}
                                                    </th>
                                                </tr> */}
                                            <tr>
                                                <td>{planningMessage.expenses}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.monthlyExpense}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.yearlyExpense}</td>
                                            </tr>

                                            {/* <tr>
                                                    <td>{planningMessage.nonRecurring}</td>
                                                    <td></td>
                                                    <td>
                                                        {this.props.cashFlowSummary && this.props.cashFlowSummary.nonRecurIncome}
                                                    </td>
                                                </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="goal-table-design2">
                                    <table className="cf-table cf-right-design">
                                        <tbody>
                                            {/* <tr>
                                                    <th>{planningMessage.income}</th>
                                                    <th className="value-align">
                                                        {planningMessage.monthly}
                                                    </th>
                                                    <th className="value-align">
                                                        {planningMessage.yearly}
                                                    </th>
                                                </tr> */}
                                            <tr>
                                                <td>{'Net Cash Flow'}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.monthlyNetCashFlow}</td>
                                                <td className="value-align">{this.props.cashFlowSummary && this.props.cashFlowSummary.yearlyNetCashFlow}</td>
                                            </tr>
                                            {/* <tr>
                                                    <td>{planningMessage.nonRecurring}</td>
                                                    <td></td>
                                                    <td>
                                                        {this.props.cashFlowSummary && this.props.cashFlowSummary.nonRecurIncome}
                                                    </td>
                                                </tr> */}
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

const mapStateToProps = (state) => cashFlowSelector(state);

export default connect(mapStateToProps, {
    calculateCashflow
})(CashFlowWithoutLogin);
