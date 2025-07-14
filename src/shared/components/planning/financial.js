import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import PlanningHeader from './planningHeader';
import PlanningLeftbar from './planningLeftside';
import { planningMessage } from '../../constants/planningConstant';
import PdfFinance from './pdfFinance';
import InsuranceWithoutLogin from '../planning/financial/insuranceWithoutLogin';
import PrioritiesWihoutLogin from '../planning/financial/prioritiesWithoutLogin';
import CashFlowWithoutLogin from '../planning/financial/cashflowWithoutLogin/index';
import NetworthWithoutLogin from '../planning/financial/networthWithoutLogin/index';
import PlanningLeftBarWithOutLogin from '../planning/planningLeftBarWithOutLogin';
import PlanSharePopUp from '../../components/PlanningShare/PlanSharePopUp';
import Cashflow from '../planning/financial/cashflow/index';
import Networth from '../planning/financial/networth/index';
import Priorities from '../planning/financial/priorities';
import Insurance from '../planning/financial/insurance';
import { planningSelector } from '../../selectors/planning';

const FINANCIALS = ['Cashflow', 'Networth', 'Insurance', 'Priorities'];

class Finance extends Component {
    constructor(props) {
        let selectedPlan = 'loan,investment,goal,financial';
        super(props);
        this.state = {
            financialNames: FINANCIALS.map((p) => {
                return {
                    value: p,
                    selected: false
                };
            }),
            // selectedPlan,
            selectedFinancial: 'Cashflow',
            isFinancialChosen: false,
            openPopup: false
            // isSharedPlan: true,
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    renderPdfLink = () => {
        const { plan, advisorDetails, cashFlowSummary, networthSummary, priorities, insurance, cashFlow, networth } = this.props;
        const { displayName, corporateLable } = advisorDetails || {};
        const label = corporateLable ? `${corporateLable}, ` : '';
        const name = `${label}${displayName}`;
        let priorityOrder = (this.props.priorities || []).filter((item) => item.priorityOrder != 0);
        if (this.props.plan) {
            if (
                cashFlowSummary &&
                networthSummary &&
                this.props.insurance &&
                this.props.insurance.insuranceId != 0 &&
                this.props.priorities &&
                priorityOrder &&
                priorityOrder.length > 0 &&
                displayName
            ) {
                return (
                    <PdfFinance
                        cashFlowSummary={cashFlowSummary}
                        networthSummary={networthSummary}
                        insurance={insurance}
                        priorities={priorities}
                        cashFlow={cashFlow}
                        networth={networth}
                        plan={plan}
                        name={name}
                        fileName="Financial"
                    />
                );
            }
            return null;
        }
    };

    chooseFinancial = (e, financial, selectedFinancial) => {
        selectedFinancial = e.target.value;
        this.setState({ isFinancialChosen: true, selectedFinancial }, () => {});
    };

    render() {
        let { isSharedPlan, sharedTab } = this.props;
        const selectedItems = [];
        if (this.props.cashFlow && this.props.cashFlowSummary) {
            selectedItems.push('Cashflow');
        }
        if (this.props.networth && this.props.networthSummary) {
            selectedItems.push('Networth');
        }
        if (this.props.insurance && this.props.insurance.insuranceId != 0) {
            selectedItems.push('Insurance');
        }
        let priorityOrder = (this.props.priorities || []).filter((item) => item.priorityOrder != 0);
        if (this.props.priorities && priorityOrder && priorityOrder.length > 0) {
            selectedItems.push('Priorities');
        }
        return (
            <div>
                {this.props.plan ? (
                    <div>
                        <div className="row col-12 planning-gap">
                            <div className="col-12">
                                <div className="planning-left row">
                                    <div className="col-12 bg-white">
                                        {this.state.selectedFinancial && this.state.selectedFinancial == 'Cashflow' && (
                                            <Cashflow
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                financials={FINANCIALS}
                                                currentTab={this.props.currentTab}
                                                chooseFinancial={this.chooseFinancial}
                                                selectedFinancial={this.state.selectedFinancial}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedFinancial && this.state.selectedFinancial == 'Networth' && (
                                            <Networth
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                financials={FINANCIALS}
                                                currentTab={this.props.currentTab}
                                                chooseFinancial={this.chooseFinancial}
                                                selectedFinancial={this.state.selectedFinancial}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedFinancial && this.state.selectedFinancial == 'Priorities' && (
                                            <Priorities
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                financials={FINANCIALS}
                                                currentTab={this.props.currentTab}
                                                chooseFinancial={this.chooseFinancial}
                                                selectedFinancial={this.state.selectedFinancial}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                        {this.state.selectedFinancial && this.state.selectedFinancial == 'Insurance' && (
                                            <Insurance
                                                selectedPlan={this.props.selectedPlan}
                                                selectedItems={selectedItems}
                                                financials={FINANCIALS}
                                                currentTab={this.props.currentTab}
                                                showEditBtn={this.props.isFormEditable}
                                                chooseFinancial={this.chooseFinancial}
                                                selectedFinancial={this.state.selectedFinancial}
                                                plan={this.props.plan}
                                                handleTabChange={this.props.handleTabChange}
                                                isSharedPlan={isSharedPlan}
                                                sharedTab={sharedTab}
                                                role={this.props.role}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="planning-gap">
                            <PlanningLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} selectedPlan={this.props.selectedPlan} />
                            <div className="calc-without-login">
                                {this.state.selectedFinancial && this.state.selectedFinancial == 'Cashflow' && (
                                    <CashFlowWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        financials={FINANCIALS}
                                        chooseFinancial={this.chooseFinancial}
                                        selectedFinancial={this.state.selectedFinancial}
                                    />
                                )}
                                {this.state.selectedFinancial && this.state.selectedFinancial == 'Networth' && (
                                    <NetworthWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        financials={FINANCIALS}
                                        chooseFinancial={this.chooseFinancial}
                                        selectedFinancial={this.state.selectedFinancial}
                                    />
                                )}
                                {this.state.selectedFinancial && this.state.selectedFinancial == 'Priorities' && (
                                    <PrioritiesWihoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        financials={FINANCIALS}
                                        chooseFinancial={this.chooseFinancial}
                                        selectedFinancial={this.state.selectedFinancial}
                                    />
                                )}
                                {this.state.selectedFinancial && this.state.selectedFinancial == 'Insurance' && (
                                    <InsuranceWithoutLogin
                                        selectedPlan={this.state.selectedPlan}
                                        financials={FINANCIALS}
                                        showEditBtn={this.props.isFormEditable}
                                        chooseFinancial={this.chooseFinancial}
                                        selectedFinancial={this.state.selectedFinancial}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => planningSelector(state);
export default connect(mapStateToProps)(Finance);
