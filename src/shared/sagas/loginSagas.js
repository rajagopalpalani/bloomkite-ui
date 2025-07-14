import { put, takeLatest, call, all } from 'redux-saga/effects';
import moment from 'moment';
import { pageURI } from '../constants/apiAttributes';
import { LOGIN } from '../actions/actionTypes';
import { API } from '../services/simpleApi';
import { headersToken } from '../constants/apiAttributes';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';
import cookieUtil from '../utils/cookieUtils';

export const getLoginDetails = (payload) => {
    return API.post(`${pageURI.login}`, payload).then((response) => {
        return response.data;
    });
};

export const getToken = () => {
    const token = JSON.parse(localStorage.getItem('bloomkiteBusinessUser'));
    const options = headersToken(token);
    return API.get(`${pageURI.refreshToken}`, options).then((response) => {
        return response.data;
    });
};

export function* refreshToken() {
    try {
        let response = yield call(getToken);
        if (response && response.token) {
            updateResponseToStorage(response);
            yield put({
                type: LOGIN.LOGGED_USER_DETAILS,
                payload: response
            });
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            toastrError(response && response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
        }
    }
}

const updateResponseToStorage = (response) => {
    localStorage.setItem('bloomkiteBusinessUser', JSON.stringify(response.token));
    localStorage.setItem('bloomkiteUsername', JSON.stringify(response));
    const timeStamps = moment().format('x');
    localStorage.setItem('bloomkiteUserLoggedInTime', JSON.stringify(timeStamps));
    cookieUtil.setCookie('bloomkiteBusinessUser', JSON.stringify(response.token), 1);
    cookieUtil.setCookie('bloomkiteUsername', JSON.stringify(response), 1);
    cookieUtil.setCookie('bloomkiteUserLoggedInTime', JSON.stringify(timeStamps), 1);
};

export function* handleLogin({ payload, fromSignup }) {
    try {
        let response = yield call(getLoginDetails, payload);
        if (response && response.token) {
            updateResponseToStorage(response);
            yield put({
                type: LOGIN.LOGGED_USER_DETAILS,
                payload: response
            });
            if (!fromSignup) {
                toastrSuccess(toastrMessage.loginSuccess);
            }
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            toastrError(response && response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
        } else {
            toastrError(toastrMessage.loginError);
        }
    }
}

export function* loginWatcher() {
    yield all([takeLatest(LOGIN.LOGIN_REQUESTING, handleLogin), takeLatest(LOGIN.REFRESH_TOKEN, refreshToken)]);
}
