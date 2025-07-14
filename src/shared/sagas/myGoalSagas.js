import { put, takeLatest, call, all, takeEvery, select } from 'redux-saga/effects';

import { MY_GOAL, APP_STATE } from '../actions/actionTypes';
import * as service from '../services/planning';
import { calculateLoanAmount } from '../helpers/planningHelper';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export function* onValueChange({ payload, type }) {
    if (type === MY_GOAL.ON_VALUE_CHANGE) {
        yield put({
            type: MY_GOAL.ON_VALUE_CHANGE_SUCCESS,
            payload
        });
    }
}

function* calculate({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(service.calculateGoal, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: MY_GOAL.CALCULATE_RESPONSE,
                payload: data.responseData.data
            });
            yield put({
                type: APP_STATE.CHANGE_LOADING,
                isLoading: false
            });

        } else {
            toastrError(toastrMessage.somethingError);
            yield put({
                type: APP_STATE.CHANGE_LOADING,
                isLoading: false
            });
        }
    } catch (error) {
        if (error) {
            const { response } = error;
            if (response) {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: false
                });
                toastrError(response.data && response.data.responseMessage && response.data.responseMessage.responseDescription);
            } else {
                yield put({
                    type: APP_STATE.CHANGE_LOADING,
                    isLoading: false
                });
                toastrError(toastrMessage.somethingError);

            }
        } else {
            toastrError(toastrMessage.somethingError);
        }
    }
}

function* fetchGoalPlanning() {
    try {
        yield put({
            type: MY_GOAL.RESET
        });
        let referenceId = window.localStorage.getItem('referenceId');
        const data = yield call(service.fetchGoalPlanning, {
            id: referenceId
        });
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: MY_GOAL.FETCH_GOAL_PLANNING_RESPONSE,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* goalWatcher() {
    yield all([takeLatest(MY_GOAL.CALCULATE_REQUEST, calculate), takeLatest(MY_GOAL.ON_VALUE_CHANGE, onValueChange), takeLatest(MY_GOAL.FETCH_GOAL_PLANNING, fetchGoalPlanning)]);
}
