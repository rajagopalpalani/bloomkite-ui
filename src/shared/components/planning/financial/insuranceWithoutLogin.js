import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { numberMethod } from '../../../constants/commonRules';
import Loader from '../../common/loader';
import { insuranceSelector } from '../../../selectors/planning';
import { calculateInsurance } from '../../../actions/planning';
import { setTimeout } from 'timers';
import Error from '../common/error';
import { planningMessage } from '../../../constants/planningConstant';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import CalcHeader from '../calcHeader';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../common/customFormik';
import CustomField from '../../common/customField';

class InsuranceWithoutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormEditable: true,
            openResultPopup: false,
            disabled: true
        };
        this.formRef = React.createRef();
    }

    componentDidUpdate(newProps) {
        let { requestCount } = newProps;
        if (requestCount > 0) {
            this.props.calculateInsurance();
        }
    }

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
    };

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    insuranceValidationSchema = () => {
        this.setState({ disabled: false });
        return Yup.object().shape({
            insurance: Yup.object().shape({
                annualIncome: Yup.object().shape({
                    value: Yup.number().positive('Should be positive number').integer('Decimals not allowed').required('Required! Should be valid number')
                }),
                stability: Yup.object().shape({
                    value: Yup.string().required('Required').nullable()
                }),
                predictability: Yup.object().shape({
                    value: Yup.string().required('Required').nullable()
                }),
                existingInsurance: Yup.object().shape({
                    value: Yup.number().positive('Should be positive number').integer('Decimals not allowed').required('Required! Should be valid number')
                })
            })
        });
    };

    handleSubmit = (values) => {
        const payload = {
            annualIncome: values.insurance.annualIncome.value,
            existingInsurance: values.insurance.existingInsurance.value,
            predictability: values.insurance.predictability.value,
            stability: values.insurance.stability.value,
            referenceId: localStorage.getItem('referenceId')
        };
        this.onOpenResultModal();
        this.props.calculateInsurance(payload);
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
        }
    };

    viewAllFinance = () => {
        this.props.handleTabChange(2);
    };

    render() {
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
                    {this.props.insurance && (
                        <div className="planning-right row">
                            <div className="col-12 finance-center-align">
                                <div className="cf-table-design">
                                    <CustomFormik
                                        initialValues={{
                                            insurance: this.props.insurance
                                        }}
                                        validationSchema={this.insuranceValidationSchema}
                                        onSubmit={this.handleSubmit}
                                        innerRef={this.formRef}>
                                        {(formikProps) => {
                                            const { values } = formikProps;
                                            const { isFormEditable } = this.state;
                                            return (
                                                <Form>
                                                    <table className="cf-table">
                                                        <colgroup>
                                                            <col width="65%" />
                                                            <col width="35%" />
                                                        </colgroup>
                                                        <tbody>
                                                            <tr className="cf-border">
                                                                <th>{planningMessage.insuranceCoverage}</th>
                                                                <th className="value-align">{planningMessage.value}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>{values.insurance.annualIncome.label}</td>
                                                                <td>
                                                                    {!isFormEditable ? (
                                                                        parseInt(values.insurance.annualIncome.value)
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            <CustomField
                                                                                name={`insurance.annualIncome.value`}
                                                                                className="form-control form-control-sm"
                                                                                type="text"
                                                                                onKeyPress={(e) => numberMethod(e)}
                                                                                onFocus={(event) => event.target.select()}
                                                                            />
                                                                            <Error name="insurance.annualIncome.value" />
                                                                        </React.Fragment>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{values.insurance.stability.label}</td>
                                                                <td>
                                                                    {!isFormEditable ? (
                                                                        values.insurance.stability.value
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            <CustomField className="form-control form-control-sm" as="select" name={`insurance.stability.value`}>
                                                                                <option value="">{planningMessage.insuranceSelect}</option>
                                                                                <option value="STABLE">{planningMessage.stable}</option>
                                                                                <option value="FLUCTUATING">{planningMessage.flunctuating}</option>
                                                                            </CustomField>
                                                                            <Error name="insurance.stability.value" />
                                                                        </React.Fragment>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{values.insurance.predictability.label}</td>
                                                                <td>
                                                                    {!isFormEditable ? (
                                                                        values.insurance.predictability.value
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            <CustomField
                                                                                className="form-control form-control-sm"
                                                                                as="select"
                                                                                name={`insurance.predictability.value`}>
                                                                                <option value="">{planningMessage.insuranceSelect}</option>
                                                                                <option value="PREDICTABLE">{planningMessage.predictble}</option>
                                                                                <option value="UNPREDICTABLE">{planningMessage.unpredictble}</option>
                                                                            </CustomField>
                                                                            <Error name="insurance.predictability.value" />
                                                                        </React.Fragment>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{values.insurance.existingInsurance.label}</td>
                                                                <td>
                                                                    {!isFormEditable ? (
                                                                        parseInt(values.insurance.existingInsurance.value)
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            <CustomField
                                                                                className="form-control form-control-sm"
                                                                                name={`insurance.existingInsurance.value`}
                                                                                type="text"
                                                                                onKeyPress={(e) => numberMethod(e)}
                                                                                onFocus={(event) => event.target.select()}
                                                                            />
                                                                            <Error name="insurance.existingInsurance.value" />
                                                                        </React.Fragment>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Form>
                                            );
                                        }}
                                    </CustomFormik>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-4 cashflow-right">
                    <div className="insurance-board">
                        <h5 className="saveGoal">{planningMessage.additionalInsurance}</h5>
                        <div className="goal-table-design1">
                            <table className="cf-table cf-right-design">
                                <tbody>
                                    <tr>
                                        <td>{this.props.insurance.additionalInsurance.label}</td>
                                        <td className="box-size">
                                            {/* {this.props.insurance.additionalInsurance.value} */}
                                            <span>
                                                <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                {formatMoney(this.props.insurance.additionalInsurance.value)}
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
                                        <td>{this.props.insurance.requiredInsurance.label}</td>
                                        <td className="box-size">
                                            <span>
                                                <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                {formatMoney(this.props.insurance.requiredInsurance.value)}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <div className="goal-content">
                                        <div className="col-lg-12">
                                            {
                                                this.props.insurance
                                                    .additionalInsurance.label
                                            }
                                            <span className="saveGoal-right">
                                                {
                                                    this.props.insurance
                                                        .additionalInsurance.value
                                                }
                                            </span>
                                        </div>
                                        <div className="col-lg-12">
                                            {
                                                this.props.insurance
                                                    .requiredInsurance.label
                                            }
                                            <span className="saveGoal-right">
                                                {
                                                    this.props.insurance
                                                        .requiredInsurance.value
                                                }
                                            </span>
                                        </div>
                                    </div> */}
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => insuranceSelector(state);

export default connect(mapStateToProps, {
    calculateInsurance
})(InsuranceWithoutLogin);
