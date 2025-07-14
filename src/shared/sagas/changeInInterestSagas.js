import { put, takeLatest, call, all, select } from 'redux-saga/effects';

import { CHANGE_IN_INTEREST, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export const getInterestChanges = (arr) => {
    return arr.filter(p => {
        return p.interestChangedDate !== null && p.changedRate > 0;
    }).map(p => ({
        interestChangedDate: p.interestChangedDate,
        changedRate: p.changedRate
    }));
};

function* calculateInterestChange({ payload, type }) {
    let referenceId = window.localStorage.getItem('referenceId');
    let isInterestChangeInput = payload && payload.name && payload.name.indexOf('interestChange') > -1;
    if (type === CHANGE_IN_INTEREST.ON_VALUE_CHANGE) {
        yield put({
            type: CHANGE_IN_INTEREST.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    } else if (type === CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_REQUEST || (payload && !isInterestChangeInput && payload.type === 'blur')) {
        yield put({
            type: CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_REQUEST_START
        });
        let referenceId = window.localStorage.getItem('referenceId');
        let buttonClicked1;
        let formData = yield select(state => {
            let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate, date,
                interestChange1, interestChange2, interestChange3, interestChange4, buttonClicked } = state.changeInInterestReducer;
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            buttonClicked1 = buttonClicked;
            let arr = [interestChange1, interestChange2, interestChange3, interestChange4];
            return {
                loanAmount,
                tenure,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                interestRate,
                referenceId,
                loanDate: loanDate ? loanDate : date,
                interestChangeReq: getInterestChanges(arr)
            };
        });
        if (referenceId || (!referenceId && buttonClicked1)) {
            try {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: true
                });
                const data = yield call(service.calculateInterestChange, formData);
                if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                    yield put({
                        type: CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_RESPONSE,
                        payload: data.responseData.data
                    });
                } else {
                    toastrError('Something went wrong. Try again');
                }
            } catch (error) {
                if (error) {
                    const { response } = error;
                    toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
                } else {
                    toastrError(toastrMessage.somethingError);
                }

            } finally {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: false
                });
            }
        }
    }
}

function* calculateShare({ payload, type }) {
    let referenceId = null;
    if (type === CHANGE_IN_INTEREST.ON_VALUE_CHANGE) {
        yield put({
            type: CHANGE_IN_INTEREST.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
    let formData = yield select(state => {
        let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate, date,
            interestChange1, interestChange2, interestChange3, interestChange4 } = state.changeInInterestReducer;
        loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
        let arr = [interestChange1, interestChange2, interestChange3, interestChange4];
        return {
            loanAmount,
            tenure,
            tenureType: tenureInYear ? 'YEAR' : 'MONTH',
            interestRate,
            referenceId,
            loanDate: loanDate ? loanDate : date,
            interestChangeReq: getInterestChanges(arr)
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateInterestChange, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong. Try again - change in emi 1');
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
        } else {
            toastrError(toastrMessage.somethingError);
        }

    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

export function* changeInInterestWatcher() {
    yield all([
        takeLatest(CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_REQUEST, calculateInterestChange),
        takeLatest(CHANGE_IN_INTEREST.ON_VALUE_CHANGE, calculateInterestChange),
        takeLatest(CHANGE_IN_INTEREST.CALCULATE_SHARE_REQUEST, calculateShare),
    ]);
}