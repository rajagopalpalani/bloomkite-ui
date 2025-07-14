import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanningHeader from '../../planningHeader';
import PlanningLeftbar from '../../planningLeftside';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../../../common/loader';
import { Tabs, Tab } from 'react-bootstrap';
import { cashFlowSelector } from '../../../../selectors/planning';
import { calculateCashflow } from '../../../../actions/planning';
import Error from '../../common/error';
import Table from './table';
import { planningMessage } from '../../../../constants/planningConstant';
import { changeDateFormat } from '../../../../constants/appConstants';
import PdfFinance from '../../pdfFinance';
import CalcHeader from '../../calcHeader';
import PlanChat from '../../../planchat/planchat';
import SharedPlanChat from '../../../planchat/sharedPlanChat';
import FontIcon from '../../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../../common/customFormik';
import CustomFieldArray from '../../../common/customFieldArray';

class CashFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormEditable: false,
            loading: false,
            tabIndex: 0,
            disabled: true,
            isCalculate: false
        };
        this.formRef = React.createRef();
    }

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
        if (!this.state.isCalculate) {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    referenceId: localStorage.getItem('referenceId'),
                    date: changeDateFormat(),
                    cashFlowItemReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculateCashflow(payload);
            }
        } else {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    date: changeDateFormat(),
                    cashFlowItemReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculateCashflow(payload);
            }
        }
        setTimeout(() => {
            this.setState({
                isFormEditable: false,
                download: true,
                disabled: true
            });
        }, 2000);
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

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
        }
        this.setState({ loading: true });
    };

    handleCalculate = () => {
        this.setState({ isCalculate: true }, () => {
            if (this.formRef.current) {
                this.formRef.current.handleSubmit();
            }
            this.setState({ loading: true });
        });
    };

    handleEdit = () => {
        this.setState({ isFormEditable: true });
    };

    handleCancel = () => {
        if (this.formRef.current) {
            this.formRef.current.handleReset();
            this.setState({ isFormEditable: false });
        }
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, cashFlowSummary, cashFlow } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (cashFlowSummary) {
            return <PdfFinance cashFlowSummary={cashFlowSummary} cashFlow={cashFlow} plan={plan} name={name} fileName="CashFlow_Summary" />;
        }
        return null;
    };

    viewAllFinance = () => {
        this.props.handleTabChange(2);
    };

    render() {
        const { isFormEditable, tabIndex } = this.state;
        let { isLoading, isSharedPlan, sharedTab } = this.props;
        const financial = 'financial';
        return (
            <div>
                {!sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader
                            handleSave={this.handleSave}
                            handleEdit={this.handleEdit}
                            handleCancel={this.handleCancel}
                            enableEdit={true}
                            showEditBtn={isFormEditable}
                            disabled={this.state.disabled}
                            name={this.props.plan.name}
                            sharedTab={sharedTab}
                            role={this.props.role}>
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    </div>
                )}
                {sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader
                            handleCalculate={this.handleCalculate}
                            handleEdit={this.handleEdit}
                            handleCancel={this.handleCancel}
                            enableEdit={true}
                            showEditBtn={isFormEditable}
                            disabled={this.state.disabled}
                            name={this.props.plan.name}
                            sharedTab={sharedTab}
                            role={this.props.role}></PlanningHeader>
                    </div>
                )}
                <div className="row col-12 planning-gap calc">
                    <PlanningLeftbar handleTabChange={this.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                    <CalcHeader
                        items={this.props.financials}
                        savedItems={this.props.selectedItems}
                        showSaveBtn={false}
                        selectedItem={this.props.selectedFinancial}
                        chooseItem={this.props.chooseFinancial}
                        disabled={this.state.disabled}
                        handleSave={this.handleSave}
                        sharedTab={sharedTab}
                    />
                    <div className="col-12">
                        <div className="row planning-right">
                            <div className="col-7 plans bg-white">
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

                            <div className="col-5 cashflow-right">
                                <div className="cashflow-board goal-rightside">
                                    {/* <button onClick={() => this.viewAllFinance()} className="view-all-btn">
                                        {planningMessage.viewFinance}
                                    </button> */}
                                    <h5 className="saveGoal">{planningMessage.cashFlowSummary}</h5>
                                    <div className="goal-table-design1">
                                        <table className="cf-table cf-right-design">
                                            <tbody>
                                                <tr>
                                                    <th></th>
                                                    <th className="value-align value-title">
                                                        {planningMessage.monthly}{' '}
                                                        <span>
                                                            <FontIcon icon={faRupeeSign} />
                                                        </span>
                                                    </th>
                                                    <th className="value-align value-title yearly">
                                                        {planningMessage.yearly}{' '}
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
                                    {sharedTab && sharedTab.postedToPartyId && (
                                        <div className="finance-table-design1">
                                            <SharedPlanChat currentPlanTab={financial} sharedTab={sharedTab}></SharedPlanChat>
                                        </div>
                                    )}
                                    {isSharedPlan && (
                                        <div className="finance-table-design1">
                                            <PlanChat currentPlanTab={financial}></PlanChat>
                                        </div>
                                    )}
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
})(CashFlow);
