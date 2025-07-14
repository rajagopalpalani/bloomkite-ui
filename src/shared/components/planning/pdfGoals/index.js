import React from 'react';
import { Document } from '@react-pdf/renderer';
import { formatMoney } from '../../../helpers/planningHelper';
import { planningMessage } from '../../../constants/planningConstant';
import PDFBase from '../../pdf/PDFBase';
import PDFPage from '../../pdf/PDFPage';
import PDFHoc from '../../pdf/PDFHoc';
import PDFDependents from '../../pdf/PDFDependents';
import PDFCard from '../../pdf/PDFCard';

export const Doc = (props) => {
    const { goals, name, plan } = props;
    return (
        <Document {...props}>
            <PDFPage>
                {goals.map((values, i) => {
                    const {
                        goalName,
                        finalCorpus,
                        monthlyInv,
                        annualInv,
                        futureCost,
                        futureValue,
                        goalAmount,
                        tenure,
                        tenureType,
                        inflationRate,
                        currentAmount,
                        growthRate,
                        annualInvestmentRate
                    } = values;
                    return [
                        <PDFCard
                            name={name}
                            key={`goals-input-${i}`}
                            title={`Goal Planning - ${goalName}`}
                            id={`goals-input-${i}`}
                            styles={{ marginVertical: 10 }}
                            data={[
                                {
                                    label: 'Number of years to achieve the goal',
                                    value: `${tenure} ${tenureType}`
                                },
                                {
                                    label: "Estimated amount of the goal in today's scenario",
                                    value: goalAmount
                                },
                                {
                                    label: 'Estimated inflation rate for future years',
                                    value: `${inflationRate || 0}%`
                                },
                                {
                                    label: 'Amount accumulated so far towards the goal',
                                    value: currentAmount
                                },
                                {
                                    label: 'Annual growth rate expected on the investments',
                                    value: `${growthRate}%`
                                },
                                {
                                    label: 'Increase in Investment contribution',
                                    value: `${annualInvestmentRate}%`
                                }
                            ]}
                        />,
                        <PDFBase
                            key={`goals-output-primary-${i}`}
                            type="primary"
                            title={`${goalName} - Summary`}
                            id={`goals-output-primary-${i}`}
                            styles={{ marginTop: 10 }}
                            data={[
                                { label: planningMessage.futureCostGoal, value: formatMoney(futureCost) },
                                { label: planningMessage.futureValueAccumulations, value: formatMoney(futureValue) }
                            ]}
                        />,
                        <PDFBase
                            key={`goals-output-secondary-${i}`}
                            type="secondary"
                            id={`goals-output-secondary-${i}`}
                            styles={{ marginBottom: 10 }}
                            data={[
                                { label: planningMessage.targetCorpus, value: formatMoney(finalCorpus) },
                                { label: planningMessage.monthlyInvestments, value: formatMoney(monthlyInv) },
                                { label: planningMessage.yearlyInvestments, value: formatMoney(annualInv) },
                            ]}
                        />
                    ];
                })}
            </PDFPage>
            <PDFDependents id="pdfGoals-dependent" name={name} plan={plan} />
        </Document>
    );
};

const PdfGoals = (props) => {
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

export default PdfGoals;
