import { put, takeLatest, call, all, select } from 'redux-saga/effects';

import { PARTIAL_PAYMENTS, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export const getPartialPayments = (arr) => {
    return arr
        .filter((p) => {
            return p.partPayDate !== null && p.partPayAmount > 0;
        })
        .map((p) => ({
            partPayDate: p.partPayDate,
            partPayAmount: p.partPayAmount
        }));
};

function* calculatePartialPayments({ payload, type }) {
    let referenceId = window.localStorage.getItem('referenceId');
    let isPartialPaymentInput = payload && payload.name && payload.name.indexOf('partialPayment') > -1;
    if (type === PARTIAL_PAYMENTS.ON_VALUE_CHANGE) {
        yield put({
            type: PARTIAL_PAYMENTS.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    } else if (type === PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_REQUEST || (payload && !isPartialPaymentInput && payload.type === 'blur')) {
        yield put({
            type: PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_REQUEST_START
        });
        let referenceId = window.localStorage.getItem('referenceId');
        let buttonClicked1;
        let formData = yield select((state) => {
            let {
                loanAmount,
                tenure,
                tenureInYear,
                interestRate,
                loanAmountInLakshs,
                date,
                loanDate,
                partialPayment1,
                partialPayment2,
                partialPayment3,
                partialPayment4,
                buttonClicked
            } = state.partialPaymentsReducer;
            loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
            buttonClicked1 = buttonClicked;
            let arr = [partialPayment1, partialPayment2, partialPayment3, partialPayment4];
            return {
                loanAmount,
                tenure,
                tenureType: tenureInYear ? 'YEAR' : 'MONTH',
                interestRate,
                referenceId,
                loanDate: loanDate ? loanDate : date,
                partialPaymentReq: getPartialPayments(arr)
            };
        });
        if (referenceId || (!referenceId && buttonClicked1)) {
            try {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: true
                });
                const data = yield call(service.calculatePartialPayments, formData);
                if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                    yield put({
                        type: PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_RESPONSE,
                        payload: data.responseData.data
                    });
                } else {
                    toastrError('Something went wrong. Try again - calculateEmi 1');
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
    if (type === PARTIAL_PAYMENTS.ON_VALUE_CHANGE) {
        yield put({
            type: PARTIAL_PAYMENTS.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
    let formData = yield select((state) => {
        let {
            loanAmount,
            tenure,
            tenureInYear,
            interestRate,
            loanAmountInLakshs,
            date,
            loanDate,
            partialPayment1,
            partialPayment2,
            partialPayment3,
            partialPayment4,
        } = state.partialPaymentsReducer;
        loanAmount = calculateLoanAmount(loanAmount, loanAmountInLakshs);
        let arr = [partialPayment1, partialPayment2, partialPayment3, partialPayment4];
        return {
            loanAmount,
            tenure,
            tenureType: tenureInYear ? 'YEAR' : 'MONTH',
            interestRate,
            referenceId,
            loanDate: loanDate ? loanDate : date,
            partialPaymentReq: getPartialPayments(arr)
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculatePartialPayments, formData);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError('Something went wrong. Try again - calculateEmi 1');
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


export function* partialPaymentsWatcher() {
    yield all([takeLatest(PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_REQUEST, calculatePartialPayments),
    takeLatest(PARTIAL_PAYMENTS.CALCULATE_SHARE_REQUEST, calculateShare),
    takeLatest(PARTIAL_PAYMENTS.ON_VALUE_CHANGE, calculatePartialPayments)]);
}
