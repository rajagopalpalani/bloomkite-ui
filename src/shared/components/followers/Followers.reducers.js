import * as CONSTANTS from './Followers.actions';

const initialState = {
    followers: [],
    followings: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_FOLLOWERS: {
            return {
                ...state,
                loading: true
            };
        }
        case CONSTANTS.FETCH_FOLLOWERS_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                followers: payload
            };
        }
        case CONSTANTS.FETCH_FOLLOWERS_REQUEST_SUCCESS: {
            const { payload } = action;
            return {
                ...state,
                loading: false,
                followersRequest: payload
            };
        }
        default:
            return state;
    }
};
