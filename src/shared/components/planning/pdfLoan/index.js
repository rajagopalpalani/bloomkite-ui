import React from 'react';
import { Document } from '@react-pdf/renderer';
import _isEmpty from 'lodash/isEmpty';
import { formatMoney } from '../../../helpers/planningHelper';
import PDFHoc from '../../pdf/PDFHoc';
import PDFBase from '../../pdf/PDFBase';
import PDFDependents from '../../pdf/PDFDependents';
import { planningMessage } from '../../../constants/planningConstant';
import { formatLoanAmount } from '../../../helpers/planningHelper';
import PDFPage from '../../pdf/PDFPage';

export class Doc extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEmiCapacity = () => {
        const {
            emiCalculator, emiCapacity, name, emiCapacityInfo: info,
        } = this.props;
        const emiCapacityInfo = info || emiCalculator;
        if (!_isEmpty(emiCapacity)) {
            const item1 = !_isEmpty(emiCapacityInfo) ? (
                <PDFBase
                    key={'emiCapacityInfo' + name}
                    id="emiCapacityInfo"
                    type="primary"
                    styles={{ marginTop: 10 }}
                    data={[
                        { label: planningMessage.emiCapcity, value: planningMessage.value },
                        { label: planningMessage.currentAge, value: emiCapacityInfo.currentAge },
                        { label: planningMessage.retirementAge, value: emiCapacityInfo.retirementAge },
                        { label: 'How stable is your Income at the current as well as future', value: emiCapacityInfo.stability },
                        { label: 'Incase temperory loss of No. Do you have Backup Income for 3 to 6 months', value: emiCapacityInfo.backUp },
                        { label: planningMessage.netFamilyIncome, value: emiCapacityInfo.netFamilyIncome },
                        { label: planningMessage.emiIncludingSpouse, value: emiCapacityInfo.existingEmi },
                        { label: planningMessage.houseExpenses, value: emiCapacityInfo.houseHoldExpense },
                        { label: planningMessage.additionalIncome, value: emiCapacityInfo.additionalIncome },
                    ]}
                    title="Loan Planning - EMI Capacity - Input"
                />
            ) : null;

            const item2 = (
                <PDFBase
                    key={'emiCapacity' + name}
                    type="secondary"
                    styles={{ marginBottom: 10 }}
                    id="emiCapacity"
                    data={[
                        { label: 'EMI Capacity', value: formatMoney(emiCapacity.emiCapacity) },
                    ]}
                    title="Loan Planning - EMI Capacity"
                />
            );
            return [item1, item2];
        }
        return null;
    }

    renderPartialPayments = () => {
        const {
            payments, name, paymentsInfo: info, emiCalculator,
        } = this.props;
        const paymentsInfo = info || emiCalculator;
        if (!_isEmpty(payments)) {
            const item1 = !_isEmpty(paymentsInfo) ? (
                <PDFBase
                    key={'paymentsInfo' + name}
                    type="primary"
                    id="paymentsInfo"
                    styles={{ marginTop: 10 }}
                    data={[
                        { label: 'Loan Amount', value: formatMoney(paymentsInfo.loanAmount) },
                        { label: 'Loan Term', value: paymentsInfo.tenure },
                        { label: 'Interest rate', value: `${paymentsInfo.interestRate || 0}%` },
                        { label: 'Loan Date', value: paymentsInfo.loanDate },
                    ]}
                    title="Loan Planning - Partial Payments - Input"
                />
            ) : null;
            const item2 = (
                <PDFBase
                    key={'payments' + name}
                    type="secondary"
                    styles={{ marginBottom: 10 }}
                    id="payments"
                    data={[
                        { label: 'Loan EMI', value: formatMoney(payments.emi) },
                        { label: 'Total Interest Payable', value: formatMoney(payments.interestPayable) },
                        { label: 'Total Payment (Principal + Interest)', value: formatMoney(payments.total) },
                    ]}
                    title="Loan Planning - Partial Payments - Output"
                />
            );
            const item3 = !_isEmpty(paymentsInfo) &&
                !_isEmpty(payments.amortisation) ?
                this.renderEmiGrid(payments.amortisation, 'payments-terms') : null;
            return [item1, item2, item3];
        }
        return null;
    }

    renderEmiGrid = (data, id) => {
        const { name, plan } = this.props;
        return <PDFBase
            name={name}
            key={'emiGridInfo' + name}
            plan={plan}
            id={id}
            tableStyles={{ fontSize: 8, textAlign: 'center' }}
            data={[
                {
                    label: planningMessage.tableYear,
                    value: planningMessage.tablePrincipal,
                    value1: planningMessage.tableInterest,
                    value2: planningMessage.tableClosing,
                    value3: planningMessage.tableOpening,
                    value4: planningMessage.tableOutStanding,
                },
                ...data.map((item) => {
                    const subItem = item.items ? item.items.map((sub) => {
                        return {
                            label: sub.month,
                            value: sub.totalPrincipal,
                            value1: sub.interest,
                            value2: sub.closing,
                            value3: sub.opening,
                            value4: `${sub.loanPaid}%`,
                        };
                    }) : [];
                    return [{
                        label: item.year,
                        value: item.totalPrincipal,
                        value1: item.interest,
                        value2: item.closing,
                        value3: item.opening,
                        value4: `${item.loanPaid}%`,
                    }, ...subItem];
                }).flat(),
            ]}
        />
    }

    renderChangeInEMI = () => {
        const {
            changeInEmi, changeInEmiInfo: info, emiCalculator,
        } = this.props;
        const changeInEmiInfo = info || emiCalculator;
        if (!_isEmpty(changeInEmi)) {
            const item1 = !_isEmpty(changeInEmiInfo) ? (
                <PDFBase
                    type="primary"
                    styles={{ marginTop: 10 }}
                    id="changeInEmiInfo"
                    data={[
                        { label: 'Loan Amount', value: changeInEmiInfo.loanAmount },
                        { label: 'Loan Term', value: changeInEmiInfo.tenure },
                        { label: 'Interest rate', value: `${changeInEmiInfo.interestRate || 0}%` },
                        { label: 'Loan Date', value: changeInEmiInfo.loanDate },
                    ]}
                    title="Loan Planning - Change In EMI - Input"
                />
            ) : null;
            const item2 = (
                <PDFBase
                    id="changeInEmi"
                    type="secondary"
                    styles={{ marginBottom: 10 }}
                    data={[
                        { label: 'Loan EMI', value: formatMoney(changeInEmi.emi) },
                        { label: 'Revised Term', value: changeInEmi.revisedTenure },
                        { label: 'Revised EMI', value: formatMoney(changeInEmi.revisedEmi) },
                        { label: 'Total Interest Payable', value: formatMoney(changeInEmi.interestPayable) },
                        { label: 'Total Payment (Principal + Interest)', value: formatMoney(changeInEmi.total) },
                    ]}
                    title="Loan Planning - Change In EMI - Output"
                />
            );
            const item3 = !_isEmpty(changeInEmiInfo) &&
                !_isEmpty(changeInEmi.amortisation) ?
                this.renderEmiGrid(changeInEmi.amortisation, 'changeInEmi-terms') : null;
            return [item1, item2, item3];
        }
        return null;
    }

    renderChangeInInterest = () => {
        const {
            changeInInterest, changeInInterestInfo: info, emiCalculator,
        } = this.props;
        const changeInInterestInfo = info || emiCalculator;
        if (!_isEmpty(changeInInterest)) {
            const item1 = !_isEmpty(changeInInterestInfo) ? (
                <PDFBase
                    id="changeInInterestInfo"
                    type="primary"
                    styles={{ marginTop: 10 }}
                    data={[
                        { label: 'Loan Amount', value: changeInInterestInfo.loanAmount },
                        { label: 'Loan Term', value: changeInInterestInfo.tenure },
                        { label: 'Interest rate', value: `${changeInInterestInfo.interestRate || 0}%` },
                        { label: 'Loan Date', value: changeInInterestInfo.loanDate },
                    ]}
                    title="Loan Planning - Change In Interest - Input"
                />
            ) : null;
            const item2 = (
                <PDFBase
                    id="changeInInterest"
                    type="secondary"
                    styles={{ marginBottom: 10 }}
                    data={[
                        { label: 'Total Interest Payable', value: formatMoney(changeInInterest.interestPayable) },
                        { label: 'Total Payment (Principal + Interest)', value: formatMoney(changeInInterest.total) },
                    ]}
                    title="Loan Planning - Change In Interest"
                />
            );
            const item3 = !_isEmpty(changeInInterestInfo) &&
                !_isEmpty(changeInInterest.amortisation) ?
                this.renderEmiGrid(changeInInterest.amortisation, 'changeInInterest-terms') : null;
            return [item1, item2, item3];
        }
        return null;
    }

    renderEmiCalculator = () => {
        const {
            emiCalculator, name, emiCalculatorInfo: info, loanAmountInLakshs
        } = this.props;
        const emiCalculatorInfo = info || emiCalculator;
        if (!_isEmpty(emiCalculator)) {
            const item1 = !_isEmpty(emiCalculatorInfo) ?
                <PDFBase
                    key={'emiCalculatorInfo' + name}
                    id="emiCalculatorInfo"
                    type="primary"
                    styles={{ marginTop: 10 }}
                    data={[
                        { label: 'Loan Amount', value: formatLoanAmount(emiCalculatorInfo.loanAmount, loanAmountInLakshs) },
                        { label: 'Loan tenure', value: emiCalculatorInfo.tenure },
                        { label: 'Interest Rate', value: `${emiCalculatorInfo.interestRate || 0}%` },
                        { label: 'Loan Date', value: emiCalculatorInfo.loanDate }
                    ]}
                    title="Loan Planning - EMI Calculator - Input"
                /> : null;
            const item2 = (
                <PDFBase
                    key={'emiCalculator' + name}
                    id="emiCalculator"
                    type="secondary"
                    styles={{ marginBottom: 10 }}
                    data={[
                        { label: 'Loan EMI', value: formatMoney(emiCalculator.emi) },
                        { label: 'Total Interest Payable', value: formatMoney(emiCalculator.interestPayable) },
                        { label: 'Total Payment (Principal + Interest)', value: formatMoney(emiCalculator.total) },
                    ]}
                    title="Loan Planning - EMI Calculator - Output"
                />
            );
            const item3 = !_isEmpty(emiCalculatorInfo) &&
                !_isEmpty(emiCalculator.amortisation) ?
                this.renderEmiGrid(emiCalculator.amortisation, "emiCalculator-terms") : null;
            return [item1, item2, item3];
        }
        return null;
    }

    render() {
        const { name, plan } = this.props;
        return (
            <Document {...this.props}>
                <PDFPage>
                    {this.renderEmiCalculator()}
                    {this.renderEmiCapacity()}
                    {this.renderPartialPayments()}
                    {this.renderChangeInEMI()}
                    {this.renderChangeInInterest()}
                </PDFPage>
                <PDFDependents id="pdfLoan-dependent" name={name} plan={plan} />
            </Document>
        );
    }
}

const PdfLoan = (props) => {
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

export default PdfLoan;
