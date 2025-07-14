import { put, takeLatest, call, all, takeEvery, select } from 'redux-saga/effects';
import { EMI_CALCULATOR, APP_STATE, PARTIAL_PAYMENTS, CHANGE_IN_EMI, CHANGE_IN_INTEREST } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export function* onValueChange({ payload, type }) {

    let referenceId = window.localStorage.getItem('referenceId');
    if (type === EMI_CALCULATOR.ON_VALUE_CHANGE) {
        yield put({
            type: EMI_CALCULATOR.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
        yield put({
            type: PARTIAL_PAYMENTS.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
        yield put({
            type: CHANGE_IN_EMI.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
        yield put({
            type: CHANGE_IN_INTEREST.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    } else if (type === EMI_CALCULATOR.CALCULATE_EMI_REQUEST || (payload && payload.type === 'blur')) {
        let buttonClicked1;
        let formData = yield select((state) => {
            let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate, buttonClicked } = state.emiCalculatorReducer;
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            buttonClicked1 = buttonClicked;
            return {
                loanAmount,
                tenure,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                interestRate,
                referenceId,
                date: loanDate
            };
        });
        if (referenceId || (!referenceId && buttonClicked1)) {
            try {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: true
                });
                const data = yield call(service.calculateEmi, formData);
                if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                    yield put({
                        type: EMI_CALCULATOR.CALCULATE_EMI_RESPONSE,
                        payload: data.responseData.data
                    });
                } else {
                    toastrError('Something went wrong while calculate EMI. Please try again');
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

export function* calculateShare({ payload, type }) {
    if (type === EMI_CALCULATOR.ON_VALUE_CHANGE) {
        yield put({
            type: EMI_CALCULATOR.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
    let referenceId = null;
    let formData = yield select((state) => {
        let { loanAmount, tenure, tenureInYear, interestRate, loanAmountInLakshs, loanDate } = state.emiCalculatorReducer;
        loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
        return {
            loanAmount,
            tenure,
            tenureType: tenureInYear ? 'YEAR' : 'MONTH',
            interestRate,
            referenceId,
            date: loanDate
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateEmi, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: EMI_CALCULATOR.CALCULATE_EMI_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong while calculate EMI. Please try again');
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


export function* emiCalculatorWatcher() {
    yield all([takeLatest(EMI_CALCULATOR.CALCULATE_EMI_REQUEST, onValueChange),
    takeLatest(EMI_CALCULATOR.ON_VALUE_CHANGE, onValueChange),
    takeLatest(EMI_CALCULATOR.CALCULATE_SHARE_REQUEST, calculateShare)]);
    // yield all([takeLatest(EMI_CALCULATOR.CALCULATE_EMI_REQUEST, onValueChangeWithout), takeLatest(EMI_CALCULATOR.ON_VALUE_CHANGE, onValueChangeWithout)]);
}
