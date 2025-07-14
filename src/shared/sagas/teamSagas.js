import { put, takeLatest, call } from 'redux-saga/effects';
import { API } from '../services/simpleApi';
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { APP_STATE, TEAM_SIGNUP } from '../actions/actionTypes';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import * as advisorService from '../services/advisor';
import { toastrMessage } from '../constants/toastrMessage';

export const getTeamSignupDetails = (payload) => {
    return API.post(`${pageURI.signup}`, payload)
        .then((response) => {
            if (response.data.responseMessage.responseCode === 6000) {
                return response.data;
            } else {
                return response.data;
            }
        })
        .catch((error) => {
            return error;
        });
};

export function* handleTeamSignup({ payload }) {
    try {
        let response = yield call(getTeamSignupDetails, payload);
        if (response && response.responseMessage && response.responseMessage.responseCode === 6000) {
            yield call(fetchTeam, { payload: payload.parentPartyId });
            toastrSuccess(toastrMessage.teamSignupSuccess);
            yield put({
                type: TEAM_SIGNUP.TEAM_CREATION_USER_DETAILS,
                payload: response.responseData.data
            });
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
        } else {
            toastrError(toastrMessage.signupError);
        }
    }
}

export function* handleKeyPeopleSignup({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        let response = yield call(advisorService.addKeyPeople, payload);
        if (response && response.responseMessage && response.responseMessage.responseCode === 6000) {
            toastrSuccess(toastrMessage.keySignupSuccess);

            yield call(fetchKeyPeopleByParentId, { payload: payload.parentPartyId });
            yield put({
                type: TEAM_SIGNUP.KEYPEOPLE_CREATION_USER_DETAILS,
                payload: response
            });
        } else {
            toastrError(response && response.responseMessage && response.responseMessage.responseDescription);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.addKeyPeopleError);
    }
}

function* fetchTeam({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchTeam, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: TEAM_SIGNUP.TEAM_MEMBER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* fetchKeyPeopleByParentId({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.fetchKeyPeopleByParentId, payload);
        if (data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: TEAM_SIGNUP.KEY_PEOPLE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* teamMemberDeactivate({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.teamMemberDeactivate, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchTeam, { payload: payload.parentPartyId });
            yield put({
                type: TEAM_SIGNUP.TEAM_MEMBER_DEACTIVATE_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.deletePlan);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.deletePlan);
    }
}

function* deleteKeypeople({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.deleteKeypeople, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield call(fetchKeyPeopleByParentId, { payload: payload.parentPartyId });
            yield put({
                type: TEAM_SIGNUP.KEY_PEOPLE_DELETE_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.deletePlan);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.deletePlan);
    }
}

function* modifyKeyPeople({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(advisorService.modifyKeyPeople, payload);
        if (data.responseMessage.responseCode === 6000) {
            yield call(fetchKeyPeopleByParentId, { payload: payload.parentPartyId });
            yield put({
                type: TEAM_SIGNUP.MODIFY_KEY_PEOPLE_SUCCESS,
                payload: data.responseMessage.responseDescription
            });
        } else {
            toastrError(toastrMessage.addKeyPeopleError);
        }
    } catch (error) {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
        toastrError(toastrMessage.addKeyPeopleError);
    }
}

export function* teamSignupWatcher() {
    yield takeLatest(TEAM_SIGNUP.TEAM_CREATION_REQUESTING, handleTeamSignup);
    yield takeLatest(TEAM_SIGNUP.KEYPEOPLE_CREATION_REQUESTING, handleKeyPeopleSignup);
    yield takeLatest(TEAM_SIGNUP.TEAM_MEMBER_DETAILS, fetchTeam);
    yield takeLatest(TEAM_SIGNUP.KEY_PEOPLE_DETAILS, fetchKeyPeopleByParentId);
    yield takeLatest(TEAM_SIGNUP.KEY_PEOPLE_DELETE, deleteKeypeople);
    yield takeLatest(TEAM_SIGNUP.MODIFY_KEY_PEOPLE, modifyKeyPeople);
    yield takeLatest(TEAM_SIGNUP.TEAM_MEMBER_DEACTIVATE, teamMemberDeactivate);
}
