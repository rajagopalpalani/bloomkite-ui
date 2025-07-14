import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { API } from '../../../services/api';
import PlanningHeader from '../planningHeader';
import PlanningLeftBarWithOutLogin from '../planningLeftBarWithOutLogin';
import PlanningLeftbar from '../planningLeftside';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../../common/loader';
import { pageURI } from '../../../constants/apiAttributes';
import { riskProfileSelector } from '../../../selectors/planning';
import { calculateRiskProfile, fetchRiskQuestionaireList } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import PdfRiskProfile from '../../../components/planning/pdfRiskProfile';
import ContactPopupSignup from '../../Contact/contactPopupSignup';
import { setTimeout } from 'timers';
import CalcHeader from '../calcHeader';
import CustomFormik from '../../common/customFormik';
import CustomFieldArray from '../../common/customFieldArray';

class RiskProfileWithOutLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskProfileQuestionaire: [],
            openResultPopup: false,
            disabled: true
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        const riskProfileQuestionaire = [...this.props.riskQuestionaire];
        if (this.props.riskProfile && this.props.riskProfile.length > 0) {
            riskProfileQuestionaire.forEach((riskProfile, i) => {
                const answer = this.props.riskProfile.filter((data) => data.questionId === riskProfile.questionId);
                if (answer.length > 0) {
                    riskProfileQuestionaire[i].answerId = answer[0].answerId;
                }
            });
        }
        this.setState({ riskProfileQuestionaire });
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
            this.onOpenResultModal();
        }
    };

    handleSubmit = (values) => {
        const payload = {
            referenceId: localStorage.getItem('referenceId'),
            riskProfileReq: this.formPayload(values)
        };
        this.props.calculateRiskProfile(payload);
        setTimeout(() => {
            this.setState({ isFormEditable: false });
        }, 2000);
    };

    formPayload = ({ riskProfile: riskProfiles }) => {
        const riskProfileItems = [];
        for (const riskProfile of riskProfiles) {
            if (riskProfile.answerId) {
                riskProfileItems.push({
                    answerId: riskProfile.answerId,
                    questionId: riskProfile.questionId
                });
            }
        }
        return riskProfileItems;
    };

    onOpenResultModal = () => {
        this.setState({ openResultPopup: true });
    };

    onCloseResultModal = () => {
        this.setState({ openResultPopup: false });
    };

    renderPdfLink = () => {
        const { riskSummary, plan, advisorDetails } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        if (riskSummary && Object.keys(riskSummary).length && displayName) {
            const label = corporateLable ? `${corporateLable}, ` : '';
            const name = `${label}${displayName}`;
            return <PdfRiskProfile riskSummary={riskSummary} plan={plan} name={name} fileName="Risk_summary" />;
        }
    };

    handleDisableButton = (values) => {
        const list = (values.riskProfile || []).filter((item) => item.answerId);
        if (list.length + 1 == this.state.riskProfileQuestionaire.length) {
            this.setState({ disabled: false });
        }
    };

    render() {
        const { isLoading } = this.props;
        return (
            <div className="planning-gap">
                <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                <div className="row col-12 calc nomargin nopadding">
                    <div className={'calc-without-login'}>
                        <CalcHeader showSaveBtn={true} disabled={this.state.disabled} handleSave={this.handleSave} />
                        <div className="row col-12 nomargin nopadding">
                            <div className="col-8 plans bg-white">
                                <div className={this.props.plan ? 'container' : 'container'}>
                                    <CustomFormik
                                        enableReinitialize={true}
                                        initialValues={{
                                            riskProfile: JSON.parse(JSON.stringify(this.state.riskProfileQuestionaire))
                                        }}
                                        onSubmit={this.handleSubmit}
                                        innerRef={this.formRef}>
                                        {({ values, setFieldValue }) => {
                                            return (
                                                <Form>
                                                    <CustomFieldArray
                                                        name="riskProfile"
                                                        render={(arrayHelpers) => (
                                                            <div>
                                                                <dl>
                                                                    {values.riskProfile.map((questions, index) => (
                                                                        <React.Fragment key={index}>
                                                                            <dt className="Risk-align">
                                                                                {`${index + 1}. `}
                                                                                {questions.question}
                                                                            </dt>
                                                                            <dd>
                                                                                {questions.answerRes.map((options, i) => (
                                                                                    <React.Fragment key={i}>
                                                                                        <input
                                                                                            type="radio"
                                                                                            value={options.answerId}
                                                                                            id={options.answerId}
                                                                                            checked={options.answerId === questions.answerId}
                                                                                            onChange={() =>
                                                                                                setFieldValue(
                                                                                                    `riskProfile.${index}.answerId`,
                                                                                                    options.answerId,
                                                                                                    this.handleDisableButton(values)
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                        <label htmlFor={options.answerId} className="risk-design">
                                                                                            {options.answer}
                                                                                        </label>
                                                                                        <br />
                                                                                    </React.Fragment>
                                                                                ))}
                                                                            </dd>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </dl>
                                                            </div>
                                                        )}
                                                    />
                                                </Form>
                                            );
                                        }}
                                    </CustomFormik>
                                </div>
                            </div>
                            <div className="col-4 cashflow-right">
                                <div className="riskProfile-board">
                                    <h5 className="saveGoal">{planningMessage.yourRiskProfile}</h5>
                                    {this.props.riskSummary && (
                                        <div>
                                            <h5 className="saveGoal">
                                                {/* {planningMessage.yourRiskProfile} -{' '} */}
                                                {this.props.riskSummary.behaviour}
                                            </h5>
                                            <div className="goal-table-design2">
                                                <table className="cf-table cf-right-design">
                                                    <tbody>
                                                        <tr>
                                                            <th> {planningMessage.suggestedPortfolioAllocation}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>{planningMessage.equityInvestments}</td>
                                                            <td className="box-size">{this.props.riskSummary.eqty_alloc}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{planningMessage.debtBondsInvestments}</td>
                                                            <td className="box-size">{this.props.riskSummary.debt_alloc}%</td>
                                                        </tr>
                                                        <tr>
                                                            <td> {planningMessage.cashEquivalent}</td>
                                                            <td className="box-size">{this.props.riskSummary.cash_alloc}%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Loader loading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => riskProfileSelector(state);

export default connect(mapStateToProps, {
    calculateRiskProfile,
    fetchRiskQuestionaireList
})(RiskProfileWithOutLogin);
