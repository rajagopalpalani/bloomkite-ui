import { PROFILE } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const profileState = fromJS({
    isLoading: false,
    profile: {}
});

export const profileReducer = function (state = profileState, action) {
    switch (action.type) {
    case PROFILE.GET_PROFILE_WITHOUT_TOKEN:
    case PROFILE.GET_PROFILE: {
        return {
            ...state,
            isLoading: true,
            profile: {}
        };
    }
    case PROFILE.CLEAR_PROFILE: {
        return {
            ...state,
            isLoading: false,
            profile: {}
        };
    }
    case PROFILE.GET_PROFILE_SUCCESS: {
        return {
            ...state,
            profile: action.payload ? action.payload : { isUserNotAvailable: true },
            isLoading: false
        };
    }
    case PROFILE.GET_PROFILE_ERROR: {
        return {
            ...state,
            isLoading: false
        };
    }
    default:
        return state;
    }
};
