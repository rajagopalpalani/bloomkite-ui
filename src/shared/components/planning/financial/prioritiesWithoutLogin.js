import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { numberMethod } from '../../../constants/commonRules';
import Loader from '../../common/loader';
import { prioritySelector } from '../../../selectors/planning';
import { calculatePriorities } from '../../../actions/planning';
import Error from '../common/error';
import { planningMessage } from '../../../constants/planningConstant';
import PdfFinance from '../pdfFinance';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import CalcHeader from '../calcHeader';
import CustomFormik from '../../common/customFormik';
import CustomField from '../../common/customField';
import CustomFieldArray from '../../common/customFieldArray';

class PrioritiesWihoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormEditable: true,
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
        if (modifiedFormValues.length > 0) {
            const payload = {
                referenceId: localStorage.getItem('referenceId'),
                priorityReq: this.formPayload(modifiedFormValues)
            };
            this.onOpenResultModal();
            this.props.calculatePriorities(payload);
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

    handleSave = () => {
        if (this.formRef.current) {
            this.handleSubmit(this.formRef.current.values);
        }
    };

    render() {
        let priorities = [...this.props.priorities] || [];
        let priorityList = (priorities || []).filter((item) => item.priorityOrder != 0);
        let prioritiesOrder = priorityList.sort((a, b) => a.priorityOrder - b.priorityOrder);
        let urgency = new Map([
            [1, 'High'],
            [2, 'Medium'],
            [3, 'Low'],
            [0, '']
        ]);
        let { isLoading } = this.props;
        let selectedItems = [];
        return (
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
                    <div className="planning-right row">
                        <div className="col-12 finance-center-align">
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
                                                                    <th className="value-align">{planningMessage.urgency}</th>
                                                                </tr>
                                                                {values.priorities.map((priority, i) => (
                                                                    <tr key={i}>
                                                                        <td>
                                                                            {i + 1} .{priority.priorityItem}
                                                                        </td>
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
                    </div>
                </div>
                <div className="col-4 cashflow-right">
                    <div className="priorities-board">
                        <h5 className="saveGoal">{planningMessage.topPriorities}</h5>
                        <div className="priorityWithOutLogin-table-design">
                            <table className="cf-table cf-right-design">
                                <tbody>
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
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => prioritySelector(state);

export default connect(mapStateToProps, { calculatePriorities })(PrioritiesWihoutLogin);
