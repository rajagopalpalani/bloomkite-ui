import { put, takeLatest, call, all, takeEvery, select } from 'redux-saga/effects';
import { EMI_CAPACITY, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export function* onValueChange({ payload, type }) {
    if (type === EMI_CAPACITY.ON_VALUE_CHANGE) {
        yield put({
            type: EMI_CAPACITY.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    } else if (type === EMI_CAPACITY.CALCULATE_EMI_CAPACITY_REQUEST || payload.type === 'blur') {
        let referenceId = window.localStorage.getItem('referenceId');
        let buttonClicked1;
        let formData = yield select((state) => {
            let {
                additionalIncome,
                backUp,
                currentAge,
                existingEmi,
                houseHoldExpense,
                interestRate,
                netFamilyIncome,
                retirementAge,
                stability,
                principle,
                interest,
                buttonClicked
            } = state.emiCapacityReducer;
            buttonClicked1 = buttonClicked;
            return {
                additionalIncome,
                backUp,
                priciple: principle,
                interest,
                currentAge,
                existingEmi,
                houseHoldExpense,
                interestRate,
                netFamilyIncome,
                referenceId,
                retirementAge,
                stability
            };
        });
        if (referenceId || (!referenceId && buttonClicked1)) {
            try {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: true
                });
                if (formData.currentAge !== null && formData.retirementAge !== null) {
                    const data = yield call(service.calculateEmiCapacity, formData);
                    if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                        yield put({
                            type: EMI_CAPACITY.CALCULATE_EMI_CAPACITY_RESPONSE,
                            payload: data.responseData.data
                        });
                    } else {
                        toastrError('Something went wrong while EMI capacity. Please try again');
                    }
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
    if (type === EMI_CAPACITY.ON_VALUE_CHANGE) {
        yield put({
            type: EMI_CAPACITY.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
    let referenceId = null;
    let formData = yield select((state) => {
        let {
            additionalIncome,
            backUp,
            currentAge,
            existingEmi,
            houseHoldExpense,
            interestRate,
            netFamilyIncome,
            retirementAge,
            stability,
            principle,
            interest,
        } = state.emiCapacityReducer;
        return {
            additionalIncome,
            backUp,
            priciple: principle,
            interest,
            currentAge,
            existingEmi,
            houseHoldExpense,
            interestRate,
            netFamilyIncome,
            referenceId,
            retirementAge,
            stability
        };
    });
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        if (formData.currentAge !== null && formData.retirementAge !== null) {
            const data = yield call(service.calculateEmiCapacity, formData);
            if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
                yield put({
                    type: EMI_CAPACITY.CALCULATE_EMI_CAPACITY_RESPONSE,
                    payload: data.responseData.data
                });
            } else {
                toastrError('Something went wrong while EMI capacity. Please try again');
            }
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


export function* emiCapacityWatcher() {
    yield all([takeLatest(EMI_CAPACITY.ON_VALUE_CHANGE, onValueChange),
    takeLatest(EMI_CAPACITY.CALCULATE_EMI_CAPACITY_REQUEST, onValueChange),
    takeLatest(EMI_CAPACITY.CALCULATE_SHARE_REQUEST, calculateShare)
    ]);
}
