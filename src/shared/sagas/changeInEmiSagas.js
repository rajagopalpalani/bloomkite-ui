import { put, takeLatest, call, all, select } from 'redux-saga/effects';

import { CHANGE_IN_EMI, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { toastrError } from '../helpers/toastrHelper';
import { toDateString, calculateLoanAmount } from '../helpers/planningHelper';
import { toastrMessage } from '../constants/toastrMessage';

export const getEmiChanges = (arr) => {
    return arr.filter(p => {
        return p.emiChangedDate !== null && p.increasedEmi > 0;
    }).map(p => ({
        emiChangedDate: p.emiChangedDate,
        increasedEmi: p.increasedEmi
    }));
};

function* calculateEmiChange({ payload, type }) {
    let referenceId = window.localStorage.getItem('referenceId');
    let isEmiChangeInput = payload && payload.name && payload.name.indexOf('emiChange') > -1;
    if (type === CHANGE_IN_EMI.ON_VALUE_CHANGE) {
        yield put({
            type: CHANGE_IN_EMI.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    } else if (type === CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_REQUEST || (payload && !isEmiChangeInput && payload.type === 'blur')) {
        yield put({
            type: CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_REQUEST_START
        });
        let buttonClicked1;
        let formData = yield select(state => {
            let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate, date,
                emiChange1, emiChange2, emiChange3, emiChange4, buttonClicked } = state.changeInEmiReducer;
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            buttonClicked1 = buttonClicked;
            let arr = [emiChange1, emiChange2, emiChange3, emiChange4];
            return {
                loanAmount,
                tenure,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                interestRate,
                referenceId,
                loanDate: loanDate ? loanDate : date,
                emiChangeReq: getEmiChanges(arr)
            };
        });
        if (referenceId || (!referenceId && buttonClicked1)) {
            try {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: true
                });
                const data = yield call(service.calculateEmiChange, formData);
                if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                    yield put({
                        type: CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_RESPONSE,
                        payload: data.responseData.data
                    });
                } else {
                    toastrError('Something went wrong. Try again');
                }
            } catch (error) {
                if (error) {
                    const { response } = error;
                    if (response) {
                        toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
                    } else {
                        toastrError(toastrMessage.somethingError);
                    }
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
    if (type === CHANGE_IN_EMI.ON_VALUE_CHANGE) {
        yield put({
            type: CHANGE_IN_EMI.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
    let formData = yield select(state => {
        let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate, date,
            emiChange1, emiChange2, emiChange3, emiChange4 } = state.changeInEmiReducer;
        loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
        let arr = [emiChange1, emiChange2, emiChange3, emiChange4];
        return {
            loanAmount,
            tenure,
            tenureType: tenureInYear ? 'YEAR' : 'MONTH',
            interestRate,
            referenceId,
            loanDate: loanDate ? loanDate : date,
            emiChangeReq: getEmiChanges(arr)
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateEmiChange, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong. Try again - change in emi 1');
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            if (response) {
                toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
            } else {
                toastrError(toastrMessage.somethingError);
            }
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

export function* changeInEmiWatcher() {
    yield all([
        takeLatest(CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_REQUEST, calculateEmiChange),
        takeLatest(CHANGE_IN_EMI.ON_VALUE_CHANGE, calculateEmiChange),
        takeLatest(CHANGE_IN_EMI.CALCULATE_SHARE_REQUEST, calculateShare),

    ]);
}