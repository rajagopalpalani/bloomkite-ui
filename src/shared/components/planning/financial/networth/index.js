import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanningHeader from '../../planningHeader';
import PlanningLeftbar from '../../planningLeftside';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../../../common/loader';
import { networthSelector } from '../../../../selectors/planning';
import { calculateNetworth } from '../../../../actions/planning';
import Error from '../../common/error';
import Table from './table';
import { planningMessage } from '../../../../constants/planningConstant';
import { formatMoney, formatLoanAmount, Helper } from '../../../../helpers/planningHelper';
import PdfFinance from '../../pdfFinance';
import CalcHeader from '../../calcHeader';
import PlanChat from '../../../planchat/planchat';
import SharedPlanChat from '../../../planchat/sharedPlanChat';
import FontIcon from '../../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../../common/customFormik';
import CustomFieldArray from '../../../common/customFieldArray';

class Networth extends Component {
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

    networthSchema = () => {
        this.setState({ disabled: false });
        const schema = Yup.object().shape({
            value: Yup.number().test('+number', 'Should be positive number', (value) => {
                return Number.isInteger(value) && parseInt(value) >= 0;
            })
        });
        return Yup.object().shape({
            networth: Yup.object().shape({
                assets: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                }),
                liabilities: Yup.object().shape({
                    formValues: Yup.array().of(schema)
                })
            })
        });
    };

    handleSubmit = (values) => {
        const {
            assets: { formValues: assetsFormValues },
            liabilities: { formValues: LiabilitiesFormValues }
        } = values.networth;
        const {
            assets: { formValues: initialAssetValues },
            liabilities: { formValues: initialLiabilitiesValues }
        } = this.props.networth;
        const modifiedFormValues = this.checkModifiedFormValues([...assetsFormValues, ...LiabilitiesFormValues], [...initialAssetValues, ...initialLiabilitiesValues]);
        if (!this.state.isCalculate) {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    referenceId: localStorage.getItem('referenceId'),
                    networthReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculateNetworth(payload);
                setTimeout(() => {
                    this.setState({
                        isFormEditable: false,
                        download: true,
                        disabled: true
                    });
                }, 2000);
            }
        } else {
            if (modifiedFormValues.length > 0) {
                const payload = {
                    networthReq: this.formPayload(modifiedFormValues)
                };
                this.props.calculateNetworth(payload);
                setTimeout(() => {
                    this.setState({
                        isFormEditable: false,
                        download: true,
                        disabled: true
                    });
                }, 2000);
            }
        }
    };

    checkModifiedFormValues = (networthItems, initialValues) => {
        return networthItems.filter((networth, i) => networth.value != initialValues[i].value);
    };

    formPayload = (networthItems) => {
        const networthFormValues = [];
        for (const networth of networthItems) {
            networthFormValues.push({
                accountEntryId: networth.accountEntryId,
                value: networth.value
            });
        }
        return networthFormValues;
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
        const { plan, advisorDetails, networthSummary, networth } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        if (networthSummary) {
            return <PdfFinance networthSummary={networthSummary} networth={networth} plan={plan} name={name} fileName="NetWorth_Summary" />;
        }
        return null;
    };

    viewAllFinance = () => {
        this.props.handleTabChange(2);
    };

    render() {
        const { isFormEditable } = this.state;
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
                            role={this.props.role}
                        />
                    </div>
                )}
                <div className="row col-12 planning-gap calccalc">
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
                                <div className="cf-table-design">
                                    <CustomFormik
                                        initialValues={{
                                            networth: JSON.parse(JSON.stringify(this.props.networth))
                                        }}
                                        validationSchema={this.networthSchema}
                                        onSubmit={this.handleSubmit}
                                        innerRef={this.formRef}>
                                        {({ values }) => (
                                            <Form>
                                                <CustomFieldArray
                                                    name="networth"
                                                    render={(arrayHelpers) => (
                                                        <div>
                                                            {Object.keys(values.networth).map((key) => (
                                                                <Table
                                                                    key={key}
                                                                    name={key}
                                                                    editable={isFormEditable}
                                                                    items={values.networth[key].formValues}
                                                                    nw={this.props.networth[key]}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                />
                                            </Form>
                                        )}
                                    </CustomFormik>
                                </div>
                            </div>
                            <div className="col-5 cashflow-right">
                                <div className="networthwl-board goal-rightside">
                                    {/* <button onClick={() => this.viewAllFinance()} className="view-all-btn">
                                        {planningMessage.viewFinance}
                                    </button> */}
                                    <h5 className="saveGoal">{planningMessage.networthSummary}</h5>

                                    <div className="goal-table-design1">
                                        <table className="cf-table cf-right-design">
                                            <tbody>
                                                <tr>
                                                    <td> {planningMessage.currentAssetsInHand}</td>
                                                    <td className="box-size">
                                                        <span>
                                                            <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                            {formatMoney(this.props.networthSummary && this.props.networthSummary.current_assetValue)}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{planningMessage.currentOutStandingLiabilities}</td>
                                                    <td className="box-size">
                                                        <span>
                                                            <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                            {formatMoney(this.props.networthSummary && this.props.networthSummary.current_liability)}
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
                                                    <td>{planningMessage.networth}</td>
                                                    <td className="box-size">
                                                        <span>
                                                            <FontIcon icon={faRupeeSign} className={'mr-2'} />
                                                            {formatMoney(this.props.networthSummary && this.props.networthSummary.networth)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {sharedTab && sharedTab.postedToPartyId && (
                                        <div className="finance-table-design3">
                                            <SharedPlanChat currentPlanTab={financial} sharedTab={sharedTab}></SharedPlanChat>
                                        </div>
                                    )}
                                    {isSharedPlan && (
                                        <div className="finance-table-design3">
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

const mapStateToProps = (state) => networthSelector(state);

export default connect(mapStateToProps, { calculateNetworth })(Networth);
