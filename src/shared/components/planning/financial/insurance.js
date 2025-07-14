import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { numberMethod } from '../../../constants/commonRules';
import Loader from '../../common/loader';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import { insuranceSelector } from '../../../selectors/planning';
import { calculateInsurance } from '../../../actions/planning';
import { setTimeout } from 'timers';
import Error from '../common/error';
import { planningMessage } from '../../../constants/planningConstant';
import { formatMoney, formatLoanAmount, Helper } from '../../../helpers/planningHelper';
import PdfFinance from '../pdfFinance';
import CalcHeader from '../calcHeader';
import PlanChat from '../../planchat/planchat';
import SharedPlanChat from '../../planchat/sharedPlanChat';
import FontIcon from '../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../common/customFormik';
import CustomField from '../../common/customField';

class Insurance extends Component {
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

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    insuranceValidationSchema = () => {

        this.setState({ disabled: false });
        const sampleResponse = Yup.object().shape({

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
        return sampleResponse;
    };

    handleSubmit = (values) => {
        if (!this.state.isCalculate) {
            const payload = {
                annualIncome: values.insurance.annualIncome.value,
                existingInsurance: values.insurance.existingInsurance.value,
                predictability: values.insurance.predictability.value,
                stability: values.insurance.stability.value,
                referenceId: localStorage.getItem('referenceId')
            };
            this.props.calculateInsurance(payload);
            setTimeout(() => {
                this.setState({ isFormEditable: false, disabled: true });
            }, 100);
        } else {
            const payload = {
                annualIncome: values.insurance.annualIncome.value,
                existingInsurance: values.insurance.existingInsurance.value,
                predictability: values.insurance.predictability.value,
                stability: values.insurance.stability.value,
            };
            this.props.calculateInsurance(payload);
            setTimeout(() => {
                this.setState({ isFormEditable: false, disabled: true });
            }, 100);

        }
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

    handleChange = (value) => {
        this.setState({ disabled: value && value.toString().trim() == "" }, () => {
        });

    }

    renderPdfLink = () => {
        const { plan, advisorDetails, insurance } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (this.props.insurance && this.props.insurance.insuranceId != 0) {
            return <PdfFinance insurance={insurance} plan={plan} name={name} fileName="Insurance" />;
        }
        return null;
    };

    viewAllFinance = () => {
        this.props.handleTabChange(2);
    };

    render() {
        let { isLoading, isSharedPlan, sharedTab, isFormEditable } = this.props;
        const financial = "financial";
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
                            sharedTab={sharedTab} role={this.props.role}>
                            {this.renderPdfLink()}
                        </PlanningHeader>
                    </div>)
                }
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
                    </div>)
                }
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
                        sharedTab={sharedTab} />
                    {this.props.insurance && (
                        <div className="col-12">
                            <div className="row planning-right">
                                <div className="col-7  plans bg-white">
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
                                                                                    onChange={(value) => this.handleChange(value)}
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
                                                                                <CustomField className="form-control form-control-sm" as="select" name={`insurance.stability.value`} onChange={(value) => this.handleChange(value)}>
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
                                                                                <CustomField className="form-control form-control-sm" as="select" name={`insurance.predictability.value`} onChange={(value) => this.handleChange(value)}>
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
                                                                                    onChange={(value) => this.handleChange(value)} />
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
                                <div className="col-5 cashflow-right">
                                    <div className=" insurancewl-board goal-rightside">
                                        {/* <button onClick={() => this.viewAllFinance()} className="view-all-btn">
                                            {planningMessage.viewFinance}
                                        </button> */}
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
                                        {sharedTab && sharedTab.postedToPartyId &&
                                            <div className="finance-table-design2">
                                                <SharedPlanChat currentPlanTab={financial} sharedTab={sharedTab}></SharedPlanChat>
                                            </div>
                                        }
                                        {isSharedPlan &&
                                            <div className="finance-table-design2">
                                                <PlanChat currentPlanTab={financial}></PlanChat>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => insuranceSelector(state);

export default connect(mapStateToProps, {
    calculateInsurance
})(Insurance);
