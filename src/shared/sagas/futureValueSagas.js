import { put, takeLatest, call, all, select } from 'redux-saga/effects';
import { FUTURE_VALUE, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export function* onValueChange({ payload, type }) {
    yield put({
        type: FUTURE_VALUE.ON_VALUE_CHANGE_SUCCESS,
        payload
    });
}

export function* calculate() {
    let referenceId = window.localStorage.getItem('referenceId');
    let formData = yield select((state) => {
        let { invType, invAmount, invAmountInLakshs, duration, durationInYear, annualGrowth, yearlyIncrease } = state.futureValueReducer;
        invAmount = calculateLoanAmount(invAmount, invAmountInLakshs);

        return {
            referenceId,
            duration,
            durationType: durationInYear ? 'YEAR' : 'MONTH',
            invAmount,
            invType,
            annualGrowth,
            yearlyIncrease
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateFutureValue, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FUTURE_VALUE.CALCULATE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong while calculate future value. Please try again');
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
export function* calculateShare() {
    let referenceId = null;
    let formData = yield select((state) => {
        let { invType, invAmount, invAmountInLakshs, duration, durationInYear, annualGrowth, yearlyIncrease } = state.futureValueReducer;
        invAmount = calculateLoanAmount(invAmount, invAmountInLakshs);

        return {
            referenceId,
            duration,
            durationType: durationInYear ? 'YEAR' : 'MONTH',
            invAmount,
            invType,
            annualGrowth,
            yearlyIncrease
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateFutureValue, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FUTURE_VALUE.CALCULATE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong while calculate future value. Please try again');
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

export function* futureValueWatcher() {
    yield all([takeLatest(FUTURE_VALUE.CALCULATE_REQUEST, calculate), takeLatest(FUTURE_VALUE.CALCULATE_SHARE_REQUEST, calculateShare), takeLatest(FUTURE_VALUE.ON_VALUE_CHANGE, onValueChange)]);
}
