import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import { Form } from 'formik';
import * as Yup from 'yup';
import { numberMethod } from '../../../constants/commonRules';
import Loader from '../../common/loader';
import { prioritySelector } from '../../../selectors/planning';
import { calculatePriorities } from '../../../actions/planning';
import Error from '../common/error';
import { planningMessage } from '../../../constants/planningConstant';
import PdfFinance from '../pdfFinance';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import CustomFormik from '../../common/customFormik';
import CustomField from '../../common/customField';
import CustomFieldArray from '../../common/customFieldArray';

class Priorities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormEditable: false,
            loading: false,
            disabled: true,
            isCalculate: false
        };
        this.formRef = React.createRef();
    }

    prioritiesValidationSchema = () => {
        this.setState({ disabled: false });
        const validator = Yup.number().test('+number', 'Should be positive number', (value) => {
            return Number.isInteger(value) && parseInt(value) >= 0;
        });
        return Yup.object().shape({
            priorities: Yup.array().of(
                Yup.object().shape({
                    value: validator,
                    timeLine: validator,
                    urgencyId: Yup.string().required('Required').nullable()
                })
            )
        });
    };

    handleSubmit = (values) => {
        const modifiedFormValues = this.checkModifiedFormValues(values.priorities, this.props.priorities);
        if (!this.state.isCalculate) {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    referenceId: localStorage.getItem('referenceId'),
                    priorityReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculatePriorities(payload);
                setTimeout(() => {
                    this.setState({
                        isFormEditable: false,
                        disabled: true
                    });
                }, 2000);
            }
        } else {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    priorityReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculatePriorities(payload);
                setTimeout(() => {
                    this.setState({
                        isFormEditable: false,
                        disabled: true
                    });
                }, 2000);
            }
        }
    };

    checkModifiedFormValues = (priorities, initialValues) => {
        return priorities.filter(
            (priority, i) => priority.value != initialValues[i].value || priority.timeLine != initialValues[i].timeLine || priority.urgencyId != initialValues[i].urgencyId
        );
    };

    formPayload = (priorities) => {
        const priorityFormValues = [];
        for (const priority of priorities) {
            priorityFormValues.push({
                priorityItemId: priority.priorityItemId,
                timeline: priority.timeLine,
                urgencyId: priority.urgencyId,
                value: priority.value
            });
        }
        return priorityFormValues;
    };

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.handleSubmit(this.formRef.current.values);
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
        this.setState({
            isFormEditable: true
        });
    };

    handleCancel = () => {
        if (this.formRef.current) {
            this.formRef.current.handleReset();
            this.setState({
                isFormEditable: false
            });
        }
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, priorities } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        let priorityOrder = (this.props.priorities || []).filter((item) => item.priorityOrder != 0);
        if (this.props.priorities && priorityOrder && priorityOrder.length > 0) {
            return <PdfFinance priorities={priorities} plan={plan} name={name} fileName="Priorities" />;
        }
        return null;
    };

    viewAllFinance = () => {
        this.props.handleTabChange(2);
    };

    render() {
        let { isLoading, isSharedPlan, sharedTab } = this.props;
        const financial = 'financial';
        let priorities = this.props.priorities || [];
        let priorityOrder = (priorities || []).filter((item) => item.priorityOrder !== 0);
        let prioritiesOrder = priorityOrder.sort((a, b) => a.priorityOrder - b.priorityOrder);
        let urgency = new Map([
            [1, 'High'],
            [2, 'Medium'],
            [3, 'Low'],
            [0, '']
        ]);
        return (
            <div>
                {!sharedTab.postedToPartyId && (
                    <div className="col-12">
                        <PlanningHeader
                            handleSave={this.handleSave}
                            handleEdit={this.handleEdit}
                            handleCancel={this.handleCancel}
                            enableEdit={true}
                            showEditBtn={this.state.isFormEditable}
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
                            role={this.props.role}>

                        </PlanningHeader>
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
                        sharedTab={sharedTab}></CalcHeader>
                    <div className="col-12">
                        <div className="row planning-right">
                            <div className="col-7 plans bg-white">
                                <div className="cf-table-design">
                                    <CustomFormik
                                        initialValues={{
                                            priorities: JSON.parse(JSON.stringify(this.props.priorities))
                                        }}
                                        validationSchema={this.prioritiesValidationSchema}
                                        onSubmit={this.handleSubmit}
                                        innerRef={this.formRef}>
                                        {({ values }) => {
                                            const { isFormEditable } = this.state;
                                            return (
                                                <Form>
                                                    <CustomFieldArray
                                                        name="priorities"
                                                        render={(arrayHelpers) => (
                                                            <table className="cf-table">
                                                                <colgroup>
                                                                    <col width="75%" />
                                                                    <col width="25%" />
                                                                    <col width="17%" />
                                                                    <col width="16%" />
                                                                </colgroup>
                                                                <tbody>
                                                                    <tr className="cf-border">
                                                                        <th>{planningMessage.investmentRelated}</th>
                                                                        {/* <th className="value-align">
                                                                            Value
                                                                            </th>
                                                                        <th className="value-align">
                                                                            Time
                                                                            Line
                                                                            </th> */}
                                                                        <th className="value-align">{planningMessage.urgency}</th>
                                                                    </tr>
                                                                    {values.priorities.map((priority, i) => (
                                                                        <tr key={i}>
                                                                            <td>
                                                                                {i + 1} .{priority.priorityItem}
                                                                            </td>
                                                                            {/* <td>
                                                                                        {!isFormEditable ? (
                                                                                            parseInt(
                                                                                                priority.value
                                                                                            )
                                                                                        ) : (
                                                                                                <React.Fragment>
                                                                                                    <CustomField
                                                                                                        className="form-control form-control-sm"
                                                                                                        type="text"
                                                                                                        onKeyPress={(e) => numberMethod(e)}
                                                                                                        onFocus={(event) => event.target.select()}
                                                                                                        name={`priorities.${i}.value`}
                                                                                                    />
                                                                                                    <Error name={`priorities.${i}.value`} />
                                                                                                </React.Fragment>
                                                                                            )}
                                                                                    </td>
                                                                                    <td>
                                                                                        {!isFormEditable ? (
                                                                                            priority.timeLine
                                                                                        ) : (
                                                                                                <React.Fragment>
                                                                                                    <CustomField
                                                                                                        className="form-control form-control-sm"
                                                                                                        type="text"
                                                                                                        onKeyPress={(e) => numberMethod(e)}
                                                                                                        onFocus={(event) => event.target.select()}
                                                                                                        name={`priorities.${i}.timeLine`}
                                                                                                    />
                                                                                                    <Error name={`priorities.${i}.timeLine`} />
                                                                                                </React.Fragment>
                                                                                            )}
                                                                                    </td> */}
                                                                            <td>
                                                                                {!isFormEditable ? (
                                                                                    urgency.get(priority.urgencyId)
                                                                                ) : (
                                                                                    <React.Fragment>
                                                                                        <CustomField
                                                                                            className="form-control form-control-sm"
                                                                                            as="select"
                                                                                            name={`priorities.${i}.urgencyId`}>
                                                                                            <option value="">{planningMessage.prioritiesSelect}</option>
                                                                                            <option value="1">{planningMessage.high}</option>
                                                                                            <option value="2">{planningMessage.medium}</option>
                                                                                            <option value="3">{planningMessage.low}</option>
                                                                                        </CustomField>
                                                                                        <Error name={`priorities.${i}.urgencyId`} />
                                                                                    </React.Fragment>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        )}
                                                    />
                                                </Form>
                                            );
                                        }}
                                    </CustomFormik>
                                </div>
                            </div>
                            <div className="col-5 cashflow-right">
                                <div className="prioritieswl-board goal-rightside">
                                    {/* <button onClick={() => this.viewAllFinance()} className="view-all-btn">{planningMessage.viewFinance}</button> */}
                                    <h5 className="saveGoal">{planningMessage.topPriorities}</h5>

                                    <div className="priorityWithOutLogin-table-design">
                                        <table className="cf-table cf-right-design">
                                            <tbody className="bg-white">
                                                {prioritiesOrder &&
                                                    prioritiesOrder.length > 0 &&
                                                    prioritiesOrder.map((priority, index) => {
                                                        if (index < 5) {
                                                            return (
                                                                <tr key={'priority-' + index}>
                                                                    <td>{priority.priorityItem}</td>
                                                                </tr>
                                                            );
                                                        }
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {sharedTab && sharedTab.postedToPartyId && (
                                    <div className="finance-table-design4">
                                        <SharedPlanChat currentPlanTab={financial} sharedTab={sharedTab}></SharedPlanChat>
                                    </div>
                                )}
                                {isSharedPlan && (
                                    <div className="finance-table-design4">
                                        <PlanChat currentPlanTab={financial}></PlanChat>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => prioritySelector(state);

export default connect(mapStateToProps, { calculatePriorities })(Priorities);
