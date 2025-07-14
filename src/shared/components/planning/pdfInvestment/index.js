import React from 'react';
import { Document } from '@react-pdf/renderer';
import { formatMoney, formatLoanAmount } from '../../../helpers/planningHelper';
import PDFHoc from '../../pdf/PDFHoc';
import PDFBase from '../../pdf/PDFBase';
import PDFDependents from '../../pdf/PDFDependents';
import PDFPage from '../../pdf/PDFPage';

export class Doc extends React.Component {
    constructor(props) {
        super(props);
    }

    renderFutureValue = () => {
        const {
            futureValue, name, futureValueInfo,

        } = this.props;
        const item1 = futureValue && Object.keys(futureValue).length > 0 ? (
            <PDFBase
                key={'futureValue' + name}
                type="primary"
                styles={{ marginTop: 10 }}
                id="futureValue"
                data={[

                    { label: 'Investment Amount', value: formatLoanAmount(futureValue.invAmount) },
                    { label: 'Investment Duration', value: futureValue.duration + "Yrs" },
                    { label: 'Annual Growth Rate', value: futureValue.annualGrowth + ' %' },

                ]}
                title="Investment Planning - Future Value - Input"
            />
        ) : null;
        const item2 = futureValue && Object.keys(futureValue).length > 0 ? (
            <PDFBase
                key={'futureValue' + name}
                id="futureValue"
                type="secondary"
                styles={{ marginBottom: 10 }}
                data={[
                    { label: 'Future Value', value: formatMoney(futureValue.totalPayment) },
                ]}
                title="Investment Planning - Future Value - output"
            />
        ) : null;
        return [item1, item2];
    }

    renderTenureFinder = () => {
        const {
            tenureFinder, name,
        } = this.props;
        const item1 = tenureFinder && Object.keys(tenureFinder).length > 0 ? (
            <PDFBase
                key={'tenureFinder' + name}
                type="primary"
                id="tenureFinder"
                styles={{ marginTop: 10 }}
                data={[
                    { label: 'Amount Required is Present', value: formatLoanAmount(tenureFinder.presentValue) },
                    { label: 'Annual Growth Rate', value: tenureFinder.rateOfInterest + ' %' },
                    { label: 'Amount Required in future', value: formatLoanAmount(tenureFinder.futureValue) },
                ]}
                title="Investment Planning - Tenure Finder - Input"
            />
        ) : null;
        const item2 = tenureFinder && Object.keys(tenureFinder).length > 0 ? (
            <PDFBase
                key={'tenureFinder' + name}
                type="secondary"
                styles={{ marginBottom: 10 }}
                id="tenureFinder"
                data={[
                    { label: 'Future Value', value: formatMoney(tenureFinder.tenure + "Yrs") },
                ]}
                title="Investment Planning - Tenure Finder - output"
            />
        ) : null;
        return [item1, item2];
    }

    renderRateFinder = () => {
        const {
            rateFinder, name,
        } = this.props;
        const item1 = rateFinder && Object.keys(rateFinder).length > 0 ? (
            <PDFBase
                key={'rateFinder' + name}
                type="primary"
                styles={{ marginTop: 10 }}
                id="rateFinder"
                data={[
                    { label: 'Amount requied in present', value: formatLoanAmount(rateFinder.presentValue) },
                    { label: 'Investment Duration', value: rateFinder.duration + "Yrs" },
                    { label: 'Amount required in future', value: formatLoanAmount(rateFinder.futureValue) },
                ]}
                title="Investment Planning - Rate Finder - Input"
            />
        ) : null;
        const item2 = rateFinder && Object.keys(rateFinder).length > 0 ? (
            <PDFBase
                key={'rateFinder' + name}
                type="secondary"
                styles={{ marginBottom: 10 }}
                id="rateFinder"
                data={[
                    { label: 'Rate Finder', value: formatMoney(rateFinder.rateOfInterest + '%') },
                ]}
                title="Investment Planning - Rate Finder  - output"
            />
        ) : null;
        return [item1, item2];
    }

    renderTargetValue = () => {
        const {
            targetValue, name,
        } = this.props;
        const item1 = targetValue && Object.keys(targetValue).length > 0 ? (
            <PDFBase
                key={'targetValue' + name}
                type="primary"
                styles={{ marginTop: 10 }}
                id="targetValue"
                data={[
                    { label: 'Amount required in future', value: formatLoanAmount(targetValue.futureValue) },
                    { label: 'Investment Duration', value: targetValue.duration + "Yrs" },
                    { label: 'Annual growth rate expected on the investments', value: targetValue.rateOfInterest + ' %' },
                ]}
                title="Investment Planning - Target Value - Input"
            />
        ) : null;
        const item2 = targetValue && Object.keys(targetValue).length > 0 ? (
            <PDFBase
                key={'targetValue' + name}
                type="secondary"
                styles={{ marginBottom: 10 }}
                id="targetValue"
                data={[
                    { label: 'Target Value', value: formatMoney(targetValue.totalPayment) },
                ]}
                title="Investment Planning - Target Value - output"
            />
        ) : null;
        return [item1, item2];
    }

    render() {
        const { name, plan } = this.props;
        return (
            <Document {...this.props}>
                <PDFPage>
                    {this.renderFutureValue()}
                    {this.renderTargetValue()}
                    {this.renderTenureFinder()}
                    {this.renderRateFinder()}
                </PDFPage>
                <PDFDependents id="pdfInvestment-dependent" name={name} plan={plan} />
            </Document>
        );
    }
}

const PdfInvestment = (props) => {
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

export default PdfInvestment;
