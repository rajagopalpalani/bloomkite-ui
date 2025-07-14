import {
    put,
    takeLatest,
    call,
    all,
    select,
} from 'redux-saga/effects';
import { TARGET_VALUE, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';

export function* onValueChange({ payload, type }) {
    yield put({
        type: TARGET_VALUE.ON_VALUE_CHANGE_SUCCESS,
        payload,
    });
}

export function* calculate() {
    let referenceId = window.localStorage.getItem('referenceId');
    let formData = yield select((state) => {
        let {
            invType,
            futureValue,
            futureValueInLakshs,
            duration,
            durationInYear,
            rateOfInterest
        } = state.targetValueReducer;
        futureValue = calculateLoanAmount(futureValue, futureValueInLakshs);

        return {
            referenceId,
            duration,
            durationType: durationInYear ? 'YEAR' : 'MONTH',
            futureValue,
            invType,
            rateOfInterest
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateTargetValue, formData);
        if (
            data &&
            data.responseMessage &&
            data.responseMessage.responseCode === 6000
        ) {
            yield put({
                type: TARGET_VALUE.CALCULATE_RESPONSE,
                payload: data.responseData.data,
            });
        } else {
            toastrError(
                'Something went wrong while calculate target value. Please try again'
            );
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
        let {
            futureValue,
            futureValueInLakshs,
            duration,
            durationInYear,
            rateOfInterest
        } = state.targetValueReducer;
        futureValue = calculateLoanAmount(futureValue, futureValueInLakshs);

        return {
            referenceId,
            duration,
            durationType: durationInYear ? 'YEAR' : 'MONTH',
            futureValue,
            rateOfInterest
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateTargetValue, formData);
        if (
            data &&
            data.responseMessage &&
            data.responseMessage.responseCode === 6000
        ) {
            yield put({
                type: TARGET_VALUE.CALCULATE_RESPONSE,
                payload: data.responseData.data,
            });
        } else {
            toastrError(
                'Something went wrong while calculate target value. Please try again'
            );
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

export function* targetValueWatcher() {
    yield all([
        takeLatest(TARGET_VALUE.CALCULATE_REQUEST, calculate),
        takeLatest(TARGET_VALUE.CALCULATE_SHARE_REQUEST, calculateShare),
        takeLatest(TARGET_VALUE.ON_VALUE_CHANGE, onValueChange),
    ]);
}
