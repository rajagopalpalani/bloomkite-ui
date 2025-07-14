import { EXPLORE } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const initState = fromJS({
    users: {},
})

export const exploreReducer = function (state = initState, action) {
    switch (action.type) {
        case EXPLORE.EXPLORE_BY_USER_SUCCESS: {
            return {
                ...state,
                users: action.payload,
            };
        }
    }
    return state;
};
