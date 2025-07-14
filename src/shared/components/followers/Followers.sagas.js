import { put, takeLatest, call, all } from 'redux-saga/effects';
import { blockUser, fetchFollowers, fetchFollowersRequest, approveFollower, followRequest, unFollow } from './Followers.api';
import {
    FOLLOW,
    APPROVE_FOLLOWER,
    fetchFollowersRequestSuccess,
    fetchAllFollowersSuccess,
    FETCH_FOLLOWERS,
    BLOCK_FOLLOWER,
    FETCH_FOLLOWERS_REQUEST,
    UNFOLLOW_FOLLOWER
} from './Followers.actions';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';
import { APP_STATE } from '../../actions/actionTypes';

function* getFollowers({ payload }) {
    try {
        const data = yield call(fetchFollowers, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(fetchAllFollowersSuccess(data.responseData.data));
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* getFollowersRequest({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const data = yield call(fetchFollowersRequest, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put(fetchFollowersRequestSuccess(data.responseData.data));
        } else {
            toastrError(toastrMessage.somethingError);
        }
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* sendFollowRequest({ payload }) {
    try {
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: true
        });
        const { name, ...rest } = payload;
        const data = yield call(followRequest, rest);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            const request = { userId: rest.userId, statusId: rest.statusId };
            yield getFollowersRequest({ payload: request });
        } else {
            toastrError(toastrMessage.somethingError);
        }
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* blockFollower({ payload }) {
    try {
        const { statusId, type, ...rest } = payload;
        const data = yield call(blockUser, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            const request = { advId: rest.advId, statusId };
            yield getFollowers({ payload: request });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* approveFollowerRequest({ payload }) {
    try {
        const { userId, ...rest } = payload;
        const data = yield call(approveFollower, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield getFollowers({ payload: rest });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

function* unFollowFollower({ payload }) {
    try {
        yield put({ type: APP_STATE.CHANGE_LOADING, isLoading: true });
        const { statusId, type, ...rest } = payload;
        const data = yield call(unFollow, rest);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            const request = { userId: rest.userId, statusId: rest.statusId };
            yield getFollowersRequest({ payload: request });
        } else {
            toastrError(toastrMessage.somethingError);
        }
        yield put({
            type: APP_STATE.CHANGE_LOADING,
            isLoading: false
        });
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* followersWatcher() {
    yield all([
        takeLatest(FETCH_FOLLOWERS, getFollowers),
        takeLatest(FETCH_FOLLOWERS_REQUEST, getFollowersRequest),
        takeLatest(FOLLOW, sendFollowRequest),
        takeLatest(BLOCK_FOLLOWER, blockFollower),
        takeLatest(APPROVE_FOLLOWER, approveFollowerRequest),
        takeLatest(UNFOLLOW_FOLLOWER, unFollowFollower)
    ]);
}
