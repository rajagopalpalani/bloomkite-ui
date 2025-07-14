import { put, takeLatest, call, all } from 'redux-saga/effects';
import { PROMOTIONS } from '../actions/actionTypes';
import * as promotionsService from '../services/promotions';
import { toastrError } from '../helpers/toastrHelper';
import { FETCH_ADVISOR } from '../actions/actionTypes';



function* addPromotions({ payload }) {
    try {
        const data = yield call(promotionsService.addPromotions, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: FETCH_ADVISOR.FETCH_BY_ADVISOR_ID,
                payload: payload.advId
            });
            yield put({
                type: PROMOTIONS.ADD_PROMOTIONS_SUCCESS,
            });
        } else {
            toastrError('Something went wrong.');
        } 
    } catch (error) {
        toastrError('Something went wrong.2');
    }
}

export function* promotionsWatcher() {
    yield all([
        takeLatest(PROMOTIONS.ADD_PROMOTIONS, addPromotions),
    ]);
}

