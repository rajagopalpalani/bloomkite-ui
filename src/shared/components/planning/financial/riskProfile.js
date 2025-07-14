import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { API } from '../../../services/api';
import PlanningHeader from '../planningHeader';
import PlanningLeftbar from '../planningLeftside';
import { Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { pageURI } from '../../../constants/apiAttributes';
import { riskProfileSelector } from '../../../selectors/planning';
import { calculateRiskProfile, fetchRiskPlanning } from '../../../actions/planning';
import { planningMessage } from '../../../constants/planningConstant';
import PdfRiskProfile from '../../../components/planning/pdfRiskProfile';
import CustomFormik from '../../common/customFormik';
import CustomFieldArray from '../../common/customFieldArray';

class RiskProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGetStarted: this.props.riskProfile && this.props.riskProfile.length > 0,
            riskProfileQuestionaire: [],
            disabled: true,
            riskProfile: this.props.riskProfile,
            riskSummary: this.props.riskSummary
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (!this.state.riskProfile) {
            this.props.fetchRiskPlanning(this.props.plan.referenceId);
        }
        API.get(`${pageURI.fetchAllRiskQuestionaire}`)
            .then((response) => {
                const riskProfileQuestionaire = response.data.responseData.data;
                if (this.state.riskProfile && this.state.riskProfile.length > 0) {
                    riskProfileQuestionaire.forEach((riskProfile, i) => {
                        const answer = this.state.riskProfile.filter((data) => data.questionId === riskProfile.questionId);
                        if (answer.length > 0) {
                            riskProfileQuestionaire[i].answerId = answer[0].answerId;
                        }
                    });
                }
                this.setState({
                    riskProfileQuestionaire: riskProfileQuestionaire
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.riskProfile) != JSON.stringify(oldProps.riskProfile)) {
            API.get(`${pageURI.fetchAllRiskQuestionaire}`)
                .then((response) => {
                    const riskProfileQuestionaire = response.data.responseData.data;
                    if (this.state.riskProfile && this.state.riskProfile.length > 0) {
                        riskProfileQuestionaire.forEach((riskProfile, i) => {
                            const answer = this.state.riskProfile.filter((data) => data.questionId === riskProfile.questionId);
                            if (answer.length > 0) {
                                riskProfileQuestionaire[i].answerId = answer[0].answerId;
                            }
                        });
                    }
                    this.setState({
                        riskProfileQuestionaire: riskProfileQuestionaire
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            this.setState({
                showGetStarted: this.props.riskProfile && this.props.riskProfile.length > 0,
                riskProfile: this.props.riskProfile,
                riskSummary: this.props.riskSummary
            });
        }
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    handleGetStarted = () => {
        this.setState({ showGetStarted: true });
    };

    handleSave = () => {
        if (this.formRef.current) {
            this.formRef.current.handleSubmit();
        }
    };

    handleSubmit = (values) => {
        const payload = {
            referenceId: localStorage.getItem('referenceId'),
            riskProfileReq: this.formPayload(values)
        };
        this.props.calculateRiskProfile(payload);
        setTimeout(() => {
            this.setState({
                isFormEditable: false,
                disabled: true
            });
            this.props.fetchRiskPlanning(this.props.plan.referenceId);
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

    handleDisableButton = (values) => {
        if (this.props.riskProfile && this.props.riskProfile.length > 0) {
            this.setState({
                disabled: false
            });
        } else {
            const list = (values.riskProfile || []).filter((item) => item.answerId);
            if (list.length + 1 == this.state.riskProfileQuestionaire.length) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({ disabled: true });
            }
        }
    };

    renderPdfLink = () => {
        const { riskSummary, plan, advisorDetails } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        if (riskSummary && Object.keys(riskSummary).length) {
            const label = corporateLable ? `${corporateLable}, ` : '';
            const name = `${label}${displayName}`;
            return <PdfRiskProfile riskSummary={riskSummary} plan={plan} name={name} fileName="Risk_summary" />;
        }
    };

    render() {
        return (
            <div>
                <div className="col-12">
                    <PlanningHeader showSaveBtn={this.state.showGetStarted} handleSave={this.handleSave} disabled={this.state.disabled} name={this.props.plan.name}>
                        {this.renderPdfLink()}
                    </PlanningHeader>
                </div>
                <div className="row col-12 planning-gap calc">
                    <div className="col-12">
                        <div className="lanning-left row">
                            <PlanningLeftbar handleTabChange={this.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                            <div className="col-12">
                                <div className="planning-center planning-right row">
                                    <div className="col-7 plans bg-white">
                                        {!this.state.showGetStarted ? (
                                            <div className="sample">
                                                <h4 className="risk-content-title">{planningMessage.riskProfile}</h4>
                                                <p className="risk-content-align"> {planningMessage.riskProfileInfo}</p>
                                                <div className="riskprofile-height">
                                                    <button type="submit" onClick={this.handleGetStarted} className="get-start-btn">
                                                        {planningMessage.getStarted}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="container">
                                                <CustomFormik
                                                    enableReinitialize={true}
                                                    initialValues={{
                                                        riskProfile: JSON.parse(JSON.stringify(this.state.riskProfileQuestionaire))
                                                    }}
                                                    //validationSchema={
                                                    //this.cashFlowSchema
                                                    //}
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
                                        )}
                                    </div>
                                    <div className="col-5 cashflow-right bg-white">
                                        {this.props.riskSummary && (
                                            <div className="riskProfilewl-board goal-rightside">
                                                <h5 className="saveGoal">
                                                    {planningMessage.yourRiskProfile} - {this.props.riskSummary.behaviour}
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
                            </div>
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
    fetchRiskPlanning
})(RiskProfile);
