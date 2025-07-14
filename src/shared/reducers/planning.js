import { CALCQUERY, PLANNING } from '../actions/actionTypes';

const planningState = {
    planUsers: {},
    sharedPlans: [],
    mySharedPlans: [],
    mySharedPlansByRef: [],
    plan: null,
    cashFlow: null,
    cashFlowSummary: null,
    networth: null,
    networthSummary: null,
    priority: null,
    insurance: null,
    riskProfile: null,
    riskSummary: null,
    riskQuestionaire: null,
    isLoading: false,
    investmentDetails: null,
    queries: [],
};

export const planningReducer = function (state = planningState, action) {
    switch (action.type) {
        case PLANNING.FETCH_FINANCIAL_PLANNING_SUCCESS: {
            return {
                ...state,
                cashFlow: action.payload.cashFlow,
                cashFlowSummary: action.payload.cashFlowSummary,
                networth: action.payload.networth,
                networthSummary: action.payload.networthSummary,
                priority: action.payload.priority,
                insurance: action.payload.insurance,
                riskProfile: action.payload.riskProfileList,
                riskSummary: action.payload.riskSummary
            };
        }
        case PLANNING.FETCH_LOAN_PLANNING_SUCCESS: {
            return {
                ...state,
                loanDetails: action.payload
            };
        }
        case PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS: {
            return {
                ...state,
                investmentDetails: action.payload
            };
        }
        case PLANNING.FETCH_RISK_PLANNING_SUCCESS: {
            return {
                ...state,
                riskProfile: action.payload.riskProfile,
                riskSummary: action.payload.riskSummary
            };
        }
        case PLANNING.FETCH_PLAN_BY_REFERENCE_SUCCESS: {
            return {
                ...state,
                planDetails: action.payload
            };
        }
        case PLANNING.FETCH_PLAN_BY_PARTYID_SUCCESS: {
            return {
                ...state,
                planUsers: action.payload
            };
        }
        case PLANNING.ADD_PLAN_SUCCESS: {
            return {
                ...state,
                plan: action.payload
            };
        }
        case PLANNING.CALCULATE_CASHFLOW_SUCCESS: {
            return {
                ...state,
                cashFlow: action.payload.cashFlowList,
                cashFlowSummary: action.payload.cashFlowSummary,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_CASHFLOW: {
            return {
                ...state,
                isLoading: true
            };
        }
        case PLANNING.CLEAR_CASHFLOW_VALUE: {
            return {
                ...state,
                cashFlow: null,
                cashFlowSummary: null,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_NETWORTH_SUCCESS: {
            return {
                ...state,
                networth: action.payload.networthList,
                networthSummary: action.payload.networthSummary,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_NETWORTH: {
            return {
                ...state,
                isLoading: true
            };
        }
        case PLANNING.CLEAR_NETWORTH_VALUE: {
            return {
                ...state,
                networth: null,
                networthSummary: null,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_PRIORITIES_SUCCESS: {
            return {
                ...state,
                priority: action.payload,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_PRIORITIES: {
            return {
                ...state,
                isLoading: true
            };
        }
        case PLANNING.CLEAR_PRIORITIES_VALUE: {
            return {
                ...state,
                priority: null,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_INSURANCE_SUCCESS: {
            return {
                ...state,
                insurance: action.payload,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_INSURANCE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case PLANNING.CLEAR_INSURANCE_VALUE: {
            return {
                ...state,
                insurance: null,
                isLoading: false
            };
        }
        case PLANNING.FETCH_RISK_QUESTIONAIRE_SUCCESS: {
            return {
                ...state,
                riskQuestionaire: action.payload
            };
        }
        case PLANNING.CALCULATE_RISK_PROFILE_SUCCESS: {
            return {
                ...state,
                riskProfile: action.payload.riskProfile,
                riskSummary: action.payload.riskSummary,
                isLoading: false
            };
        }
        case PLANNING.CALCULATE_RISK_PROFILE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case CALCQUERY.FETCH_SHARED_PLAN_BY_POSTEDPARTYID_SUCCESS: {
            return {
                ...state,
                sharedPlans: action.payload
            };
        }
        case CALCQUERY.FETCH_SHARED_BY_PARTY_Id_AND_REF_ID_SUCCESS: {
            return {
                ...state,
                mySharedPlans: action.payload
            };
        }
        case CALCQUERY.FETCH_SHARED_BY_REF_ID_SUCCESS: {
            return {
                ...state,
                mySharedPlansByRef: action.payload
            };
        }
        case CALCQUERY.FETCH_QUERIES_SUCCESS: {
            return {
                ...state,
                queries: action.payload
            };
        }
        case CALCQUERY.CLEAR_FETCH_SHARED_BY_REF_ID: {
            return {
                ...state,
                mySharedPlansByRef: []
            }
        }
        default:
            return state;
    }
};
