import { put, takeLatest, call, all, fork } from 'redux-saga/effects';

import { INVESTOR, APP_STATE } from '../actions/actionTypes';
import * as investorService from '../services/investor';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

function* addInvInterest({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(
            investorService.addInvInterest,
            payload
        );
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByInvestorId, { payload: payload.invId });
            yield put({
                type: INVESTOR.ADD_INV_INTEREST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.invInterestError);
        }
    } catch (error) {
        toastrError(toastrMessage.invInterestError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchInvestorList({ payload }) {
    try {
        const data = yield call(investorService.fetchInvestorList, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: INVESTOR.FETCH_INVESTOR_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.advPersonalInfoError);
        }
    } catch (e) {
        toastrError(toastrMessage.advPersonalInfoError);
    }
}

function* fetchByInvestorId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(investorService.fetchByInvestorId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: INVESTOR.FETCH_BY_INVESTOR_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.fetchByInvestorId);
        }
    } catch (e) {
        toastrError(toastrMessage.fetchByInvestorId);
    } 
    finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* modifyInvestor({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(investorService.modifyInvestor, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield call(fetchByInvestorId, { payload: payload.invId });
            yield put({
                type: INVESTOR.MODIFY_INVESTOR_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.modifyInvestor);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.modifyInvestor);
    }
}

function* modifyInvInterest({ payload }) {
    try {
        const data = yield call(investorService.modifyInvInterest, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchByInvestorId, { payload: payload.invId });
            yield put({
                type: INVESTOR.MODIFY_INV_INTEREST_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.modifyInvInterest);
        }
    } catch (e) {
        toastrError(toastrMessage.modifyInvInterest);
    }
}

function* deleteInvestor({ payload }) {
    try {
        const data = yield call(investorService.deleteInvestor, payload);
        if (data.responseMessage && (data.responseMessage.responseCode === 6000)) {
            yield put({
                type: INVESTOR.DELETE_INVESTOR_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.deleteInvestor);
        }
    } catch (e) {
        toastrError(toastrMessage.deleteInvestor);
    }
}

function* deleteInvInterest() {
    try {
        const data = yield call(investorService.deleteInvInterest);
        if (data.responseMessage.responseCode === 6000) {
            yield put({
                type: INVESTOR.DELETE_INV_INTEREST_SUCCESS,
            });
        } else {
            toastrError(toastrMessage.deleteInvInterest);
        }
    } catch (e) {
        toastrError(toastrMessage.deleteInvInterest);
    }
}

export function* investorWatcher() {
    yield all([
        takeLatest(INVESTOR.ADD_INV_INTEREST, addInvInterest),
        takeLatest(INVESTOR.FETCH_INVESTOR_LIST, fetchInvestorList),
        takeLatest(INVESTOR.FETCH_BY_INVESTOR_ID, fetchByInvestorId),
        takeLatest(INVESTOR.MODIFY_INVESTOR, modifyInvestor),
        takeLatest(INVESTOR.MODIFY_INV_INTEREST, modifyInvInterest),
        takeLatest(INVESTOR.DELETE_INVESTOR, deleteInvestor),
        takeLatest(INVESTOR.DELETE_INV_INTEREST, deleteInvInterest),
    ]);
}
