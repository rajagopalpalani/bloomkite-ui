import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError } from '../helpers/toastrHelper';
import { PROFILE } from '../actions/actionTypes';
import * as profileActions from '../actions/profile';
import * as deleteFileService from '../services/deleteFile';
import * as advisorService from '../services/advisor';
import * as investorService from '../services/investor';
import { toastrMessage } from '../constants/toastrMessage';
import { APP_STATE, FETCH_ADVISOR, INVESTOR } from '../actions/actionTypes';

function* getProfile({ payload }) {
    try {
        const data = yield call(advisorService.fetchByAdvisorID, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(profileActions.getProfileSuccess(data.responseData.data));
        } else {
            yield put(profileActions.getProfileError());
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        yield put(profileActions.getProfileError());
        toastrError(toastrMessage.somethingError);
    }
}

function* getProfileByUserName({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchAdvisorByUserName, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(profileActions.getProfileSuccess(data.responseData.data));
        } else {
            yield put(profileActions.getProfileError());
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        yield put(profileActions.getProfileError());
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* getProfileWithoutToken({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchAdvisorByUserNameWithOutToken, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(profileActions.getProfileSuccess(data.responseData.data));
        } else {
            yield put(profileActions.getProfileError());
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        yield put(profileActions.getProfileError());
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* updateProfile({ payload }) {
    const { oldFileName, ...rest } = payload;
    try {
        const data = yield call(advisorService.modifyAdvisor, rest);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_BY_ADVISOR_ID,
                payload: payload.advId
            });
            yield put(profileActions.getProfileSuccess(rest));
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    }
}

function* updateInvestorProfile({ payload }) {
    const { oldFileName, ...rest } = payload;
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(investorService.modifyInvestor, rest);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: INVESTOR.FETCH_BY_INVESTOR_ID,
                payload: payload.invId
            });
            yield put(profileActions.getProfileSuccess(rest));
        } else {
            toastrError(toastrMessage.personalInfoError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.somethingError);
    }
}

export function* profileWatcher() {
    yield all([
        takeLatest(PROFILE.GET_PROFILE, getProfile),
        takeLatest(PROFILE.GET_PROFILE_WITHOUT_TOKEN, getProfileWithoutToken),
        takeLatest(PROFILE.UPDATE_PROFILE, updateProfile),
        takeLatest(PROFILE.UPDATE_INVESTOR_PROFILE, updateInvestorProfile),
        takeLatest(PROFILE.GET_PROFILE_BY_USERNAME, getProfileByUserName)
    ]);
}
