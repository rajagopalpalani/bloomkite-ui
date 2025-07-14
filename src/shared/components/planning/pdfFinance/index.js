import React from 'react';
import { Document } from '@react-pdf/renderer';
import { planningMessage } from '../../../constants/planningConstant';
import PDFHoc from '../../pdf/PDFHoc';
import PDFBase from '../../pdf/PDFBase';
import PDFDependents from '../../pdf/PDFDependents';
import { toCamelCase } from '../../../utils/functions';
import PDFPage from '../../pdf/PDFPage';

export class Doc extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCashFlow = () => {
        const { cashFlowSummary, cashFlow } = this.props;
        return [
            cashFlow && Object.keys(cashFlow).length > 0
                ? Object.keys(cashFlow).map((key, i) => {
                    const data =
                        cashFlow[key] && cashFlow[key].formValues && cashFlow[key].formValues.length
                            ? [
                                {
                                    label: planningMessage.cashFlowList,
                                    value: planningMessage.budgetAmount,
                                    value1: planningMessage.actualAmount
                                },
                                ...cashFlow[key].formValues.map((item) => ({
                                    label: item.cashFlowItem,
                                    value: item.budgetAmt || '0',
                                    value1: item.actualAmt || '0'
                                }))
                            ]
                            : [];
                    const title = cashFlow[key] && cashFlow[key].totalSum ? toCamelCase(cashFlow[key].totalSum.lable) : '';
                    return data.length ? <PDFBase
                        key={i.toString()}
                        id={`cashFlow-${i}`}
                        type="primary"
                        title={title}
                        data={data}
                    /> : null;
                })
                : null,
            cashFlowSummary && Object.keys(cashFlowSummary).length > 0 ? (
                <PDFBase
                    id="cashFlowSummary"
                    type="primary"
                    data={[
                        { label: ' ', value: planningMessage.monthly, value1: planningMessage.yearly },
                        { label: planningMessage.income, value: cashFlowSummary.monthlyIncome, value2: cashFlowSummary.yearlyIncome },
                        { label: planningMessage.expenses, value: cashFlowSummary.monthlyExpense, value2: cashFlowSummary.yearlyExpense },
                        { label: planningMessage.netCashFlow, value: cashFlowSummary.monthlyNetCashFlow, value2: cashFlowSummary.yearlyNetCashFlow }
                    ]}
                    title={`Finance Planning - ${planningMessage.cashFlowSummary} - Output`}
                />
            ) : null
        ];
    };

    renderNetworthSummary = () => {
        const { networthSummary, networth } = this.props;

        return [
            networth && Object.keys(networth).length > 0
                ? Object.keys(networth).map((key, i) => {
                    const data =
                        networth[key] && networth[key].formValues && networth[key].formValues.length
                            ? [
                                {
                                    label: toCamelCase(key),
                                    value: planningMessage.value
                                },
                                ...networth[key].formValues.map((item) => ({
                                    label: item.accountEntry,
                                    value: item.value || '0'
                                }))
                            ]
                            : [];
                    const title = networth[key] && networth[key].totalSum ? toCamelCase(networth[key].totalSum.lable) : '';
                    return data.length ? <PDFBase type="primary" key={i.toString()} id={`networth-${i}`} title={title} data={data} /> : null;
                })
                : null,
            networthSummary && Object.keys(networthSummary).length > 0 ? (
                <PDFBase
                    id="networthSummary"
                    type="primary"
                    data={[
                        { label: planningMessage.currentAssetsInHand, value: networthSummary.current_assetValue },
                        { label: planningMessage.currentOutStandingLiabilities, value: networthSummary.current_liability },
                        { label: planningMessage.networth, value: networthSummary.networth }
                    ]}
                    title={`Finance Planning - ${planningMessage.networthSummary} - Output`}
                />
            ) : null
        ];
    };

    renderInsurance = () => {
        const { insurance } = this.props;
        return insurance && Object.keys(insurance).length > 0 ? (
            <PDFBase
                id="insurance"
                type="primary"
                data={[
                    { label: insurance.additionalInsurance.label, value: insurance.additionalInsurance.value },
                    { label: insurance.requiredInsurance.label, value: insurance.requiredInsurance.value },
                    { label: insurance.annualIncome.label, value: insurance.annualIncome.value },
                    { label: insurance.existingInsurance.label, value: insurance.existingInsurance.value },
                    { label: insurance.predictability.label, value: insurance.predictability.value },
                    { label: insurance.stability.label, value: insurance.stability.value }
                ]}
                title={'Finance Planning - ' + planningMessage.additionalInsurance}
            />
        ) : null;
    };

    renderPriorities = () => {
        const { priorities } = this.props;
        const formatpriorities = priorities ? priorities.map((item) => ({ label: item.priorityItem })) : [];
        const list = priorities
            ? [
                {
                    label: planningMessage.investmentRelated,
                    value: planningMessage.urgency
                },
                ...priorities.map((item) => ({
                    label: item.priorityItem,
                    value: item.urgency || 'None'
                }))
            ]
            : [];
        return [
            list && list.length ? (
                <PDFBase type="primary" styles={{ marginTop: 10 }} id="formatpriorities" data={list} title={`Finance Planning - ${planningMessage.topPriorities} - Input`} />
            ) : null,
            formatpriorities && formatpriorities.length > 0 ? (
                <PDFBase type="secondary" styles={{ marginBottom: 10 }} id="priorities" data={formatpriorities} title={`Finance Planning - ${planningMessage.topPriorities} - Output`} />
            ) : null
        ];
    };

    render() {
        const { plan } = this.props;
        return (
            <Document {...this.props}>
                <PDFPage>
                    {this.renderCashFlow()}
                    {this.renderNetworthSummary()}
                    {this.renderPriorities()}
                    {this.renderInsurance()}
                </PDFPage>
                <PDFDependents id="pdfFinance-dependent" plan={plan} />
            </Document>
        );
    }
}

const PdfFinance = (props) => {
    const { fileName, plan } = props;
    if (plan && plan.planId) {
        return (
            <PDFHoc name={fileName}>
                <Doc {...props} />
            </PDFHoc>
        );
    }
    return null;
};

export default PdfFinance;
