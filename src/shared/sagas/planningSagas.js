import { put, takeLatest, call, all } from 'redux-saga/effects';
import { PLANNING, APP_STATE, CALCQUERY } from '../actions/actionTypes';
import * as planningService from '../services/planning';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

function* fetchFinancialPlanning({ payload }) {
    try {
        const data = yield call(planningService.fetchFinancialPlanning, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_FINANCIAL_PLANNING_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.financialPlanningError);
        }
    } catch (error) {
        toastrError(toastrMessage.financialPlanningError);
    }
}

function* fetchLoanPlanning({ payload }) {
    try {
        const data = yield call(planningService.fetchLoanPlanning, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_LOAN_PLANNING_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.loanPlanningError);
        }
    } catch (error) {
        toastrError(toastrMessage.loanPlanningError);
    }
}

function* fetchInvestmentPlanning({ payload }) {
    try {
        const data = yield call(planningService.fetchInvestmentPlanning, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.investmentPlanningError);
        }
    } catch (error) {
        toastrError(toastrMessage.investmentPlanningError);
    }
}

function* fetchRiskQuestionaireList(payload) {
    try {
        const data = yield call(planningService.fetchRiskQuestionaireList, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_RISK_QUESTIONAIRE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchRiskPlanning({ payload }) {
    try {
        const data = yield call(planningService.fetchRiskPlanning, { id: payload });
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_RISK_PLANNING_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.riskPlanningError);
        }
    } catch (error) {
        toastrError(toastrMessage.riskPlanningError);
    }
}

function* fetchPlanByReference({ payload }) {
    try {
        const data = yield call(planningService.fetchPlanByReference, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_PLAN_BY_REFERENCE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.planByRefError);
        }
    } catch (error) {
        toastrError(toastrMessage.planByRefError);
    }
}

function* fetchPlanByPartyId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.fetchPlanByPartyId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.FETCH_PLAN_BY_PARTYID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* addPlan({ payload }) {
    try {
        const data = yield call(planningService.addPlan, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchPlanByPartyId, { payload: payload.partyId ? payload.partyId : payload.parentPartyId });
            yield put({
                type: PLANNING.ADD_PLAN_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.addPlanError);
        }
    } catch (error) {
        toastrError(toastrMessage.addPlanError);
    }
}

function* modifyPlan({ payload }) {
    try {
        const data = yield call(planningService.modifyPlan, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchPlanByPartyId, { payload: payload.partyId ? payload.partyId : payload.parentPartyId });
            yield put({
                type: PLANNING.MODIFY_PLAN_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.modifyPlanError);
        }
    } catch (error) {
        toastrError(toastrMessage.modifyPlanError);
    }
}

function* deletePlan({ payload }) {
    try {
        const data = yield call(planningService.removePlan, { id: payload.referenceId });
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchPlanByPartyId, { payload: payload.partyId ? payload.partyId : payload.parentPartyId });
            yield put({
                type: PLANNING.DELETE_PLAN_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.deletePlan);
        }
    } catch (error) {
        toastrError(toastrMessage.deletePlan);
    }
}

function* calculateCashflow({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.calculateCashflow, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.CALCULATE_CASHFLOW_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.calculateCashflow);
        }
    } catch (error) {
        toastrError(toastrMessage.calculateCashflow);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* calculateNetworth({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.calculateNetworth, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.CALCULATE_NETWORTH_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.calculateNetworth);
        }
    } catch (error) {
        toastrError(toastrMessage.calculateNetworth);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* calculatePriorities({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.calculatePriorities, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.CALCULATE_PRIORITIES_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.calculatePriorities);
        }
    } catch (error) {
        toastrError(toastrMessage.calculatePriorities);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}
function* calculateInsurance({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.calculateInsurance, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.CALCULATE_INSURANCE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.calculateInsurance);
        }
    } catch (error) {
        toastrError(toastrMessage.calculateInsurance);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}
function* createCalcQuery({ payload }) {
    try {
        const data = yield call(planningService.createCalcQuery, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.CREATE_CALC_QUERY_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* calculateRiskProfile({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.calculateRiskProfile, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PLANNING.CALCULATE_RISK_PROFILE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.calculateRiskProfile);
        }
    } catch (error) {
        toastrError(toastrMessage.calculateRiskProfile);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchSharedPlanByPostedPartyId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.fetchSharedPlanByPostedPartyId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.FETCH_SHARED_PLAN_BY_POSTEDPARTYID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchSharedByPartyIdAndRefId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.fetchSharedByPartyIdAndRefId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.FETCH_SHARED_BY_PARTY_Id_AND_REF_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}
function* fetchSharedByRefId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(planningService.fetchSharedByRefId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.FETCH_SHARED_BY_REF_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* commentQueries({ payload }) {
    try {
        const data = yield call(planningService.commentQueries, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.COMMENT_QUERIES_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}
function* createCalcAnswer({ payload }) {
    try {
        const data = yield call(planningService.createCalcAnswer, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.CREATE_CALC_ANSWER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}
function* fetchQueries({ payload }) {
    try {
        const data = yield call(planningService.fetchQueries, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.FETCH_QUERIES_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}
function* fetchCalcAnswer({ payload }) {
    try {
        const data = yield call(planningService.fetchCalcAnswer, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CALCQUERY.FETCH_CALC_ANSWER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* planningWatcher() {
    yield all([
        takeLatest(PLANNING.FETCH_FINANCIAL_PLANNING, fetchFinancialPlanning),
        takeLatest(PLANNING.FETCH_LOAN_PLANNING, fetchLoanPlanning),
        takeLatest(PLANNING.FETCH_INVESTMENT_PLANNING, fetchInvestmentPlanning),
        takeLatest(PLANNING.FETCH_RISK_PLANNING, fetchRiskPlanning),
        takeLatest(PLANNING.FETCH_PLAN_BY_REFERENCE, fetchPlanByReference),
        takeLatest(PLANNING.FETCH_PLAN_BY_PARTYID, fetchPlanByPartyId),
        takeLatest(PLANNING.ADD_PLAN, addPlan),
        takeLatest(PLANNING.MODIFY_PLAN, modifyPlan),
        takeLatest(PLANNING.DELETE_PLAN, deletePlan),
        takeLatest(PLANNING.CALCULATE_CASHFLOW, calculateCashflow),
        takeLatest(PLANNING.CALCULATE_NETWORTH, calculateNetworth),
        takeLatest(PLANNING.CALCULATE_PRIORITIES, calculatePriorities),
        takeLatest(PLANNING.CALCULATE_INSURANCE, calculateInsurance),
        takeLatest(PLANNING.CALCULATE_RISK_PROFILE, calculateRiskProfile),
        takeLatest(CALCQUERY.CREATE_CALC_QUERY, createCalcQuery),
        takeLatest(PLANNING.FETCH_RISK_QUESTIONAIRE, fetchRiskQuestionaireList),
        takeLatest(CALCQUERY.FETCH_SHARED_PLAN_BY_POSTEDPARTYID, fetchSharedPlanByPostedPartyId),
        takeLatest(CALCQUERY.FETCH_SHARED_BY_PARTY_Id_AND_REF_ID, fetchSharedByPartyIdAndRefId),
        takeLatest(CALCQUERY.FETCH_SHARED_BY_REF_ID, fetchSharedByRefId),
        takeLatest(CALCQUERY.COMMENT_QUERIES, commentQueries),
        takeLatest(CALCQUERY.CREATE_CALC_ANSWER, createCalcAnswer),
        takeLatest(CALCQUERY.FETCH_QUERIES, fetchQueries),
        takeLatest(CALCQUERY.FETCH_CALC_ANSWER, fetchCalcAnswer)
    ]);
}
