import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import Loader from '../../../common/loader';
import { networthSelector } from '../../../../selectors/planning';
import { calculateNetworth } from '../../../../actions/planning';
import Table from './table';
import { planningMessage } from '../../../../constants/planningConstant';
import { formatMoney, formatLoanAmount, Helper } from '../../../../helpers/planningHelper';
import PdfFinance from '../../pdfFinance';
import ContactPopupSignup from '../../../Contact/contactPopupSignup';
import CalcHeader from '../../calcHeader';
import FontIcon from '../../../common/fontAwesomeIcon';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import CustomFormik from '../../../common/customFormik';
import CustomFieldArray from '../../../common/customFieldArray';

class NetworthWithoutLogin extends Component {
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
        if (modifiedFormValues.length > 0) {
            const payload = {
                referenceId: localStorage.getItem('referenceId'),
                networthReq: this.formPayload(modifiedFormValues)
            };
            this.props.calculateNetworth(payload);
            this.onOpenResultModal();
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

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
        }
    };

    render() {
        const { isFormEditable } = this.state;
        const { isLoading } = this.props;
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
                    <div className="row planning-right">
                        <div className="col-12 finance-center-align">
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
                    </div>
                </div>
                <div className="col-4 cashflow-right">
                    <div className="networth-board">
                        <div>
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
                        </div>
                    </div>
                </div>
                <Loader loading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => networthSelector(state);

export default connect(mapStateToProps, { calculateNetworth })(NetworthWithoutLogin);
