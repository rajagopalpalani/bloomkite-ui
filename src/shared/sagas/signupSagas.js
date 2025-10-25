import { put, takeLatest, call } from 'redux-saga/effects';
import { API } from '../services/simpleApi';
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { SIGNUP } from '../actions/actionTypes';
import * as advisorService from '../services/advisor';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';
import { APP_STATE } from '../actions/actionTypes';

export const getSignupDetails = (payload) => {
    console.log("API Called")
    return API.post(`${pageURI.signup}`, payload).then((response) => {
        return response.data;
    });
};

export function* handleSignup({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        let response = yield call(getSignupDetails, payload);
        if (response && response.responseMessage && response.responseMessage.responseCode === 6000) {
            toastrSuccess(toastrMessage.signupSuccess);
            yield put({
                type: SIGNUP.SIGNUP_USER_DETAILS,
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
    } finally {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    }
}

function* validateUniqueFields({ payload }) {
    try {
        const data = yield call(advisorService.validateUniqueFields, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            toastrError(data.responseData.data.USERNAME || data.responseData.data.PHONENUMBER || data.responseData.data.EMAILID || data.responseData.data.PAN);
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* signupWatcher() {
    yield takeLatest(SIGNUP.SIGNUP_REQUESTING, handleSignup);
    yield takeLatest(SIGNUP.VALIDATE_UNIQUE_FIELDS, validateUniqueFields);
}
