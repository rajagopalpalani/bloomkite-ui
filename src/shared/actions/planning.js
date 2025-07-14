import { PLANNING } from './actionTypes';
import { CALCQUERY } from './actionTypes';

export const fetchFinancialPlanning = value => ({
    type: PLANNING.FETCH_FINANCIAL_PLANNING,
    payload: value
});

export const fetchLoanPlanning = value => ({
    type: PLANNING.FETCH_LOAN_PLANNING,
    payload: value
});

export const fetchInvestmentPlanning = value => ({
    type: PLANNING.FETCH_INVESTMENT_PLANNING,
    payload: value
});

export const fetchRiskPlanning = value => ({
    type: PLANNING.FETCH_RISK_PLANNING,
    payload: value
});

export const fetchRiskQuestionaireList = value => ({
    type: PLANNING.FETCH_RISK_QUESTIONAIRE,
    payload: value
});

export const fetchPlanByPartyId = value => ({
    type: PLANNING.FETCH_PLAN_BY_PARTYID,
    payload: value
});

export const fetchPlanByReference = value => ({
    type: PLANNING.FETCH_PLAN_BY_REFERENCE,
    payload: value
});

export const addPlan = value => ({
    type: PLANNING.ADD_PLAN,
    payload: value
});

export const modifyPlan = value => ({
    type: PLANNING.MODIFY_PLAN,
    payload: value
});

export const deletePlan = value => ({
    type: PLANNING.DELETE_PLAN,
    payload: value
});

export const calculateCashflow = value => ({
    type: PLANNING.CALCULATE_CASHFLOW,
    payload: value
});

export const clearCashflowValue = () => ({
    type: PLANNING.CLEAR_CASHFLOW_VALUE,
});

export const calculateNetworth = value => ({
    type: PLANNING.CALCULATE_NETWORTH,
    payload: value
});

export const clearNetworthValue = () => ({
    type: PLANNING.CLEAR_NETWORTH_VALUE,
});

export const calculatePriorities = value => ({
    type: PLANNING.CALCULATE_PRIORITIES,
    payload: value
});

export const clearPrioritiesValue = () => ({
    type: PLANNING.CLEAR_PRIORITIES_VALUE,
});

export const calculateInsurance = value => ({
    type: PLANNING.CALCULATE_INSURANCE,
    payload: value
});

export const clearInsuranceValue = () => ({
    type: PLANNING.CLEAR_INSURANCE_VALUE,
});

export const calculateRiskProfile = value => ({
    type: PLANNING.CALCULATE_RISK_PROFILE,
    payload: value
});

export const downloadPlanPdf = value => ({
    type: PLANNING.DOWNLOAD_PLANS_PDF,
    payload: value
});

export const createCalcQuery = value => ({
    type: CALCQUERY.CREATE_CALC_QUERY,
    payload: value
});

export const fetchSharedPlanByPostedPartyId = value => ({
    type: CALCQUERY.FETCH_SHARED_PLAN_BY_POSTEDPARTYID,
    payload: value
});

export const fetchSharedByPartyIdAndRefId = value => (
    {
        type: CALCQUERY.FETCH_SHARED_BY_PARTY_Id_AND_REF_ID,
        payload: value
    }
);
export const fetchSharedByRefId = value => (
    {
        type: CALCQUERY.FETCH_SHARED_BY_REF_ID,
        payload: value
    }
);
export const commentQueries = value => ({
    type: CALCQUERY.COMMENT_QUERIES,
    payload: value
});

export const createCalcAnswer = value => ({
    type: CALCQUERY.CREATE_CALC_ANSWER,
    payload: value
});

export const fetchQueries = value => ({
    type: CALCQUERY.FETCH_QUERIES,
    payload: value
});

export const fetchCalcAnswer = value => ({
    type: CALCQUERY.FETCH_CALC_ANSWER,
    payload: value
});

export const clearFetchQueries = value => ({
    type: CALCQUERY.CLEAR_FETCH_QUERIES,
    payload: value
});

export const clearFetchSharedByRefId = value => ({
    type: CALCQUERY.CLEAR_FETCH_SHARED_BY_REF_ID,
    payload: value
});

