import { put, takeLatest, call, all } from 'redux-saga/effects';
import { EXPLORE } from '../actions/actionTypes';
import * as exploreService from '../services/explore';
import { toastrError } from '../helpers/toastrHelper';
import { exploreByUserSuccess } from '../actions/explore';
import { APP_STATE } from '../actions/actionTypes';


function* exploreByUser({ payload }) {
    try {
        const token = window.localStorage.getItem('bloomkiteBusinessUser');
        const fn = token ? exploreService.exploreByUser : exploreService.exploreByUserWithoutLogin;
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: true });
        const data = yield call(fn, payload);
        if (data &&
            data.responseMessage &&
            data.responseMessage.responseCode === 6000) {
            yield put(exploreByUserSuccess(data.responseData.data));
        } else {
            toastrError('Something went wrong.');
        }
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: false });
    } catch (error) {
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: false });
        toastrError('Something went wrong.2');
    }
}

function* exploreAdvisorsByProducts({ payload }) {
    try {
        const token = window.localStorage.getItem('bloomkiteBusinessUser');
        const fn = token ? exploreService.exploreAdvisorByProducts : exploreService.exploreAdvisorByProductsWithoutLogin;
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: true });
        const data = yield call(fn, payload);
        if (data &&
            data.responseMessage &&
            data.responseMessage.responseCode === 6000) {
            yield put(exploreByUserSuccess(data.responseData.data));
        } else {
            toastrError('Something went wrong.');
        }
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: false });
    } catch (error) {
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: false });
        toastrError('Something went wrong.2');
    }
}

export function* exploreWatcher() {
    yield all([
        takeLatest(EXPLORE.EXPLORE_BY_USER, exploreByUser),
        takeLatest(EXPLORE.EXPLORE_BY_PRODUCTS, exploreAdvisorsByProducts),
    ]);
}

