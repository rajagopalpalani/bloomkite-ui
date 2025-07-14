import React from 'react';
import { Document } from '@react-pdf/renderer';
import { planningMessage } from '../../../constants/planningConstant';
import PDFBase from '../../pdf/PDFBase';
import PDFHoc from '../../pdf/PDFHoc';
import PDFDependents from '../../pdf/PDFDependents';
import PDFPage from '../../pdf/PDFPage';

export const Doc = (props) => {
    const { plan, riskSummary, name } = props;
    return (
        <Document {...props}>
            <PDFPage>
                <PDFBase
                    id="riskSummary-title"
                    type="primary"
                    styles={{ marginTop: 20 }}
                    data={[
                        { label: `${planningMessage.yourRiskProfile} - ${riskSummary.behaviour}`, type: 'title' },
                    ]}
                />
                <PDFBase
                    id="riskSummary"
                    type="secondary"
                    data={[
                        { label: planningMessage.suggestedPortfolioAllocation },
                        { label: planningMessage.equityInvestments, value: `${riskSummary.eqty_alloc}%` },
                        { label: planningMessage.debtBondsInvestments, value: `${riskSummary.debt_alloc}%` },
                        { label: planningMessage.cashEquivalent, value: `${riskSummary.cash_alloc}%` }
                    ]}
                />
            </PDFPage>
            <PDFDependents id="pdfRiskProfile-dependent" name={name} plan={plan} />
        </Document>
    );
}

const PdfRiskProfile = (props) => {
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

export default PdfRiskProfile;
