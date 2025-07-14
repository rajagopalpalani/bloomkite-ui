import { put, takeLatest, call } from 'redux-saga/effects';
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { APP_STATE, MEMBERSHIP, TEAM_SIGNUP } from '../actions/actionTypes';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import * as advisorService from '../services/advisor';
import { toastrMessage } from '../constants/toastrMessage';

function* updateSubscription({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.updateSubscription, payload);
        if (data.responseMessage.responseCode === 6000) {
            // yield call(fetchKeyPeopleByParentId, { payload: payload.parentPartyId });
            yield put({
                type: MEMBERSHIP.UPDATE_SUBSCRIPTION_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    }
}

function* fetchAllMembershipPlan(payload) {
    try {
        const data = yield call(advisorService.fetchAllMembershipPlan, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.FETCH_ALL_MEMBERSHIP_PLAN_SUCCESS,
                payload: data.responseData.data
            });
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    }
}

function* createSubscription({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.createSubscription, payload);
        if (data.responseMessage.responseCode === 6000) {
            // yield call(fetchKeyPeopleByParentId, { payload: payload.parentPartyId });
            yield put({
                type: MEMBERSHIP.CREATE_SUBSCRIPTION_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* cancelSubscription({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.cancelSubscription, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.CANCEL_SUBSCRIPTION_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
            const fetchData = yield call(advisorService.fetchSubscription, payload);
            if (fetchData.responseMessage.responseCode === 6000) {
                yield put({
                    type: MEMBERSHIP.FETCH_SUBSCRIPTION_SUCCESS,
                    payload: data.responseData.data
                });
            }
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* createSinglePaymentOrder({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.createSinglePaymentOrder, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.CREATE_SINGLE_PAYMENT_ORDER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* verifySinglePayment({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.verifySinglePayment, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.VERIFY_SINGLE_PAYMENT_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* verifySubscription({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.verifySubscription, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.VERIFY_SUBSCRIPTION_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchSubscription({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchSubscription, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.FETCH_SUBSCRIPTION_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* createOrderNumber({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.createOrderNumber, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.CREATE_ORDER_NUMBER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* updateOrderDetail({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.updateOrderDetail, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: MEMBERSHIP.UPDATE_ORDER_DETAIL_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

export function* membershipWatcher() {
    yield takeLatest(MEMBERSHIP.UPDATE_SUBSCRIPTION, updateSubscription);
    yield takeLatest(MEMBERSHIP.FETCH_ALL_MEMBERSHIP_PLAN, fetchAllMembershipPlan);
    yield takeLatest(MEMBERSHIP.UPDATE_SUBSCRIPTION, updateSubscription);
    yield takeLatest(MEMBERSHIP.CREATE_SUBSCRIPTION, createSubscription);
    yield takeLatest(MEMBERSHIP.CANCEL_SUBSCRIPTION, cancelSubscription);
    yield takeLatest(MEMBERSHIP.CREATE_SINGLE_PAYMENT_ORDER, createSinglePaymentOrder);
    yield takeLatest(MEMBERSHIP.VERIFY_SINGLE_PAYMENT, verifySinglePayment);
    yield takeLatest(MEMBERSHIP.VERIFY_SUBSCRIPTION, verifySubscription);
    yield takeLatest(MEMBERSHIP.FETCH_SUBSCRIPTION, fetchSubscription);
    yield takeLatest(MEMBERSHIP.CREATE_ORDER_NUMBER, createOrderNumber);
    yield takeLatest(MEMBERSHIP.UPDATE_ORDER_DETAIL, updateOrderDetail);
}
