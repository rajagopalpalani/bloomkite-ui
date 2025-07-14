import { put, takeLatest, call, all, select } from 'redux-saga/effects';
import { TENURE_FINDER, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export function* onValueChange({ payload, type }) {
    yield put({
        type: TENURE_FINDER.ON_VALUE_CHANGE_SUCCESS,
        payload
    });
}

export function* calculate() {
    let referenceId = window.localStorage.getItem('referenceId');
    let formData = yield select((state) => {
        let { invType, futureValue, futureValueInLakshs, presentValue, presentValueInLakshs, rateOfInterest } = state.tenureFinderReducer;
        futureValue = calculateLoanAmount(futureValue, futureValueInLakshs);
        presentValue = calculateLoanAmount(presentValue, presentValueInLakshs);

        return {
            referenceId,
            invType,
            futureValue,
            presentValue,
            rateOfInterest
        };
    });

    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateTenureFinder, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: TENURE_FINDER.CALCULATE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong while calculate tenure finder. Please try again');
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
        let { invType, futureValue, futureValueInLakshs, presentValue, presentValueInLakshs, rateOfInterest } = state.tenureFinderReducer;
        futureValue = calculateLoanAmount(futureValue, futureValueInLakshs);
        presentValue = calculateLoanAmount(presentValue, presentValueInLakshs);

        return {
            referenceId,
            invType,
            futureValue,
            presentValue,
            rateOfInterest
        };
    });

    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateTenureFinder, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: TENURE_FINDER.CALCULATE_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong while calculate tenure finder. Please try again');
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

export function* tenureFinderWatcher() {
    yield all([
        takeLatest(TENURE_FINDER.CALCULATE_REQUEST, calculate),
        takeLatest(TENURE_FINDER.CALCULATE_SHARE_REQUEST, calculateShare),
        takeLatest(TENURE_FINDER.ON_VALUE_CHANGE, onValueChange)
    ]);
}
