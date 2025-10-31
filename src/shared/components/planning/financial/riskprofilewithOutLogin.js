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
// setTimeout is available globally in both Node.js and browsers
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
        this.initializeRiskProfileQuestionaire();
    }

    componentDidUpdate(prevProps) {
        // Update if riskQuestionaire prop changes
        if (prevProps.riskQuestionaire !== this.props.riskQuestionaire) {
            this.initializeRiskProfileQuestionaire();
        }
    }

    initializeRiskProfileQuestionaire = () => {
        // Filter out null/undefined items and ensure array exists
        const riskQuestionaire = Array.isArray(this.props.riskQuestionaire) 
            ? this.props.riskQuestionaire.filter(item => item !== null && item !== undefined && item.question)
            : [];
        
        const riskProfileQuestionaire = [...riskQuestionaire];
        
        if (this.props.riskProfile && Array.isArray(this.props.riskProfile) && this.props.riskProfile.length > 0) {
            riskProfileQuestionaire.forEach((riskProfile, i) => {
                // Only process if riskProfile is valid
                if (riskProfile && riskProfile.questionId) {
                    const answer = this.props.riskProfile.filter((data) => data && data.questionId === riskProfile.questionId);
                    if (answer.length > 0 && answer[0]) {
                        riskProfileQuestionaire[i].answerId = answer[0].answerId;
                    }
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
        if (Array.isArray(riskProfiles)) {
            for (const riskProfile of riskProfiles) {
                if (riskProfile && riskProfile.answerId && riskProfile.questionId) {
                    riskProfileItems.push({
                        answerId: riskProfile.answerId,
                        questionId: riskProfile.questionId
                    });
                }
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
        const validItems = (this.state.riskProfileQuestionaire || []).filter(item => item !== null && item !== undefined);
        const list = (values.riskProfile || []).filter((item) => item && item.answerId);
        if (list.length + 1 === validItems.length) {
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
                                            riskProfile: JSON.parse(JSON.stringify(this.state.riskProfileQuestionaire.filter(item => item !== null && item !== undefined)))
                                        }}
                                        onSubmit={this.handleSubmit}
                                        innerRef={this.formRef}>
                                        {({ values, setFieldValue }) => {
                                            // Filter out null/undefined items and ensure answerRes exists
                                            // Map with original index to maintain form field references
                                            const validRiskProfiles = (values.riskProfile || [])
                                                .map((questions, originalIndex) => ({ questions, originalIndex }))
                                                .filter(({ questions }) => questions !== null && questions !== undefined && questions.question && Array.isArray(questions.answerRes));
                                            
                                            return (
                                                <Form>
                                                    <CustomFieldArray
                                                        name="riskProfile"
                                                        render={(arrayHelpers) => (
                                                            <div>
                                                                <dl>
                                                                    {validRiskProfiles.map(({ questions, originalIndex }, displayIndex) => (
                                                                        <React.Fragment key={questions.questionId || originalIndex}>
                                                                            <dt className="Risk-align">
                                                                                {`${displayIndex + 1}. `}
                                                                                {questions.question || ''}
                                                                            </dt>
                                                                            <dd>
                                                                                {Array.isArray(questions.answerRes) && questions.answerRes
                                                                                    .filter(options => options !== null && options !== undefined)
                                                                                    .map((options, i) => (
                                                                                        <React.Fragment key={options.answerId || i}>
                                                                                            <input
                                                                                                type="radio"
                                                                                                value={options.answerId}
                                                                                                id={options.answerId}
                                                                                                checked={options.answerId === questions.answerId}
                                                                                                onChange={() => {
                                                                                                    setFieldValue(
                                                                                                        `riskProfile.${originalIndex}.answerId`,
                                                                                                        options.answerId,
                                                                                                        false
                                                                                                    );
                                                                                                    // Update with new answerId
                                                                                                    const updatedQuestion = { ...questions, answerId: options.answerId };
                                                                                                    const updatedValues = {
                                                                                                        ...values,
                                                                                                        riskProfile: values.riskProfile.map((q, idx) => 
                                                                                                            idx === originalIndex ? updatedQuestion : q
                                                                                                        )
                                                                                                    };
                                                                                                    this.handleDisableButton(updatedValues);
                                                                                                }}
                                                                                            />
                                                                                            <label htmlFor={options.answerId} className="risk-design">
                                                                                                {options.answer || ''}
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
