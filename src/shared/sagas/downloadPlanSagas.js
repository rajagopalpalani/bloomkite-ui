import React from 'react';
import { takeLatest, call, all, select } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import { pdf } from '@react-pdf/renderer';
import { PLANNING } from '../actions/actionTypes';
import * as planningService from '../services/planning';
import { Doc as PdfGoals } from '../../shared/components/planning/pdfGoals';
import { Doc as PdfRiskProfile } from '../../shared/components/planning/pdfRiskProfile';
import { Doc as PdfFinance } from '../../shared/components/planning/pdfFinance';
import { Doc as PdfLoan } from '../../shared/components/planning/pdfLoan';
import { Doc as PdfInvestment } from '../../shared/components/planning/pdfInvestment';
import { download } from '../utils/functions';
import { toastrError, toastrInfo } from '../helpers/toastrHelper';
import { toDateString } from '../helpers/planningHelper';
import { getInterestChanges } from './changeInInterestSagas';
import { getEmiChanges } from './changeInEmiSagas';
import { getPartialPayments } from './partialPaymentsSagas';
import { filterByAccountTypeId, filterByCashFlowItemTypeId } from '../selectors/planning';

const today = new Date();

function* downloadPlans({ payload }) {
    const { type, plan, name } = payload;
    const { referenceId } = plan;
    toastrInfo('Generating. Please wait');
    if (type === 'goals') {
        yield goalPlanning(referenceId, plan, name);
    }
    if (type === 'riskprofile') {
        yield riskPlanning(referenceId, plan, name);
    }
    if (type === 'finance') {
        yield financePlanning(referenceId, plan, name);
    }
    if (type === 'loan') {
        yield loanPlanning(referenceId, plan, name);
    }
    if (type === 'investment') {
        yield investmentPlanning(referenceId, plan, name);
    }
}

function* goalPlanning(referenceId, plan, name) {
    const data = yield call(
        planningService.fetchGoalPlanning,
        { id: referenceId }
    );
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        const { data: response } = data.responseData;
        const { goal } = response || {};
        if (goal && goal.length) {
            const blob = yield pdf(
                <PdfGoals
                    goals={goal}
                    plan={plan}
                    name={name}
                />
            ).toBlob();
            yield download(blob, 'Goals');
        } else {
            toastrError('No Goals Found');
        }
    }
}

function* riskPlanning(referenceId, plan, name) {
    const data = yield call(
        planningService.fetchRiskPlanning,
        { id: referenceId }
    );
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        const { data: response } = data.responseData;
        const { riskSummary } = response || {};
        if (riskSummary && Object.keys(riskSummary).length) {
            const blob = yield pdf(
                <PdfRiskProfile
                    riskSummary={riskSummary}
                    plan={plan}
                    name={name}
                />
            ).toBlob();
            yield download(blob, 'Risk_summary');
        } else {
            toastrError('No Risk Summary Found');
        }
    }
}

function* financePlanning(referenceId, plan, name) {
    const data = yield call(
        planningService.fetchFinancialPlanning,
        referenceId
    );
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        const { data: response } = data.responseData;
        const { cashFlowSummary, cashFlow, networth, networthSummary, insurance, priority } = response || {};
        if ((cashFlowSummary && Object.keys(cashFlowSummary).length) ||
            (networthSummary && Object.keys(networthSummary).length) ||
            (insurance && Object.keys(insurance).length) ||
            (priority && priority.length)) {
            const blob = yield pdf(
                <PdfFinance
                    cashFlowSummary={cashFlowSummary}
                    networthSummary={networthSummary}
                    networth={{
                        assets: filterByAccountTypeId(1, networth),
                        liabilities: filterByAccountTypeId(2, networth)
                    }}
                    cashFlow={{
                        mandatoryHouseholdExpenses: filterByCashFlowItemTypeId(1, cashFlow, 'Household Expenses'),
                        lifeStyleExpenses: filterByCashFlowItemTypeId(2, cashFlow, 'Life Style Expenses'),
                        reccuringLoanRepayments: filterByCashFlowItemTypeId(3, cashFlow, 'Loan Payments'),
                        reccuringInvestments: filterByCashFlowItemTypeId(4, cashFlow, 'Investments'),
                        reccuringIncome: filterByCashFlowItemTypeId(5, cashFlow, 'Income'),
                    }}
                    insurance={insurance}
                    priorities={priority}
                    plan={plan}
                    name={name}
                />
            ).toBlob();
            yield download(blob, 'Finance_summary');
        } else {
            toastrError('No Finance Summary Found');
        }
    }
}


function* getEmiCalulator(referenceId, emiCalculator) {
    let { loanAmount, tenure, tenureInYear, interestRate } = emiCalculator || {};
    const data = yield call(planningService.calculateEmi, {
        loanAmount,
        tenure,
        tenureType: tenureInYear ? 'YEAR' : 'MONTH',
        interestRate,
        referenceId,
        date: toDateString({
            year: today.getFullYear(),
            month: today.getMonth()
        })
    });
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        return data.responseData.data;
    }
    return null;
}


function* getChangeInEmi(referenceId, changeInEmi, emiCalculator) {
    const { loanAmount, tenure, tenureInYear, interestRate } = emiCalculator || {};
    const data = yield call(planningService.calculateEmiChange, {
        loanAmount,
        tenure,
        tenureType: tenureInYear ? 'YEAR' : 'MONTH',
        interestRate,
        referenceId,
        loanDate: toDateString({
            year: today.getFullYear(),
            month: today.getMonth()
        }),
        emiChangeReq: getEmiChanges(changeInEmi)

    });
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        return data.responseData.data;
    }
    return null;
}

function* getChangeInInterest(referenceId, changeInInterest, emiCalculator) {
    const { loanAmount, tenure, tenureInYear, interestRate } = emiCalculator || {};
    const data = yield call(planningService.calculateInterestChange, {
        loanAmount,
        tenure,
        tenureType: tenureInYear ? 'YEAR' : 'MONTH',
        interestRate,
        referenceId,
        loanDate: toDateString({
            year: today.getFullYear(),
            month: today.getMonth()
        }),
        interestChangeReq: getInterestChanges(changeInInterest)
    });
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        return data.responseData.data;
    }
    return null;
}

function* fetchPartialPayments(referenceId, payments, emiCalculator) {
    const {
        loanAmount,
        tenure,
        tenureInYear,
        interestRate,
        date,
    } = emiCalculator || {};
    const data = yield call(planningService.calculatePartialPayments, {
        loanAmount,
        tenure,
        tenureType: tenureInYear ? 'YEAR' : 'MONTH',
        interestRate,
        referenceId,
        loanDate: date || toDateString({
            year: today.getFullYear(),
            month: today.getMonth()
        }),
        partialPaymentReq: getPartialPayments(payments)
    });
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        return data.responseData.data;
    }
    return null;
}

function* getEmiCapacity(referenceId, emiCapacity) {
    const {
        additionalIncome,
        backUp,
        currentAge,
        existingEmi,
        houseHoldExpense,
        interestRate,
        netFamilyIncome,
        retirementAge,
        stability,
        principle,
        interest
    } = emiCapacity || {};
    const data = yield call(planningService.calculateEmiCapacity, {
        additionalIncome,
        backUp,
        priciple: principle,
        interest,
        currentAge,
        existingEmi,
        houseHoldExpense,
        interestRate,
        netFamilyIncome,
        referenceId,
        retirementAge,
        stability
    });
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        return data.responseData.data;
    }
    return null;
}


function* loanPlanning(referenceId, plan, name) {
    const data = yield call(planningService.fetchLoanPlanning, referenceId);
    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        const loanData = data.responseData.data;
        try {
            const emiCalculator = yield !_isEmpty(loanData.emiCalculator) && getEmiCalulator(referenceId, loanData.emiCalculator);
            const emiCapacity = yield !_isEmpty(loanData.emiCapacity) && getEmiCapacity(referenceId, loanData.emiCapacity);
            const changeInEmi = yield !_isEmpty(loanData.emiChange) && getChangeInEmi(referenceId, loanData.emiChange, loanData.emiCalculator);
            const changeInInterest = yield !_isEmpty(loanData.interestChange) && getChangeInInterest(referenceId, loanData.interestChange, loanData.emiCalculator);
            const partialPayments = yield !_isEmpty(loanData.partialPayment) && fetchPartialPayments(referenceId, loanData.partialPayment, loanData.emiCalculator);
            if ((emiCalculator && Object.keys(emiCalculator).length) ||
                (emiCapacity && Object.keys(emiCapacity).length) ||
                (changeInInterest && Object.keys(changeInInterest).length) ||
                (changeInEmi && Object.keys(changeInEmi).length) ||
                (partialPayments && Object.keys(partialPayments).length)) {
                const blob = yield pdf(
                    <PdfLoan
                        emiCalculator={emiCalculator}
                        emiCapacity={emiCapacity}
                        changeInEmi={changeInEmi}
                        changeInInterest={changeInInterest}
                        payments={partialPayments}
                        plan={plan}
                        name={name}
                    />
                ).toBlob();
                yield download(blob, 'Loan');
            } else {
                toastrError('No Loan Summary Found');
            }
        } catch (error) {
            toastrError('No Loan Summary Found');
        }
    } else {
        toastrError('No Loan Summary Found');
    }
}

function* investmentPlanning(referenceId, plan, name) {
    const data = yield call(
        planningService.fetchInvestmentPlanning,
        referenceId
    );

    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
        const { data: response } = data.responseData;
        const { futureValue, targetValue, rateFinder, tenureFinder } = response || {};
        if ((futureValue && Object.keys(futureValue).length) ||
            (targetValue && Object.keys(targetValue).length) ||
            (rateFinder && Object.keys(rateFinder).length) ||
            (tenureFinder && tenureFinder.length)) {
            const blob = yield pdf(
                <PdfInvestment
                    futureValue={futureValue}
                    targetValue={targetValue}
                    rateFinder={rateFinder}
                    tenureFinder={tenureFinder}
                    plan={plan}
                    name={name}
                />
            ).toBlob();
            yield download(blob, 'Investment_summary');
        } else {
            toastrError('No Investment Summary Found');
        }
    }
}

export function* downloadPlanWatcher() {
    yield all([
        takeLatest(PLANNING.DOWNLOAD_PLANS_PDF, downloadPlans),
    ]);
}
