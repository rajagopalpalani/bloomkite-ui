import { LOGIN } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const loginState = {};

export const loginReducer = function(state = loginState, action) {
    switch (action.type) {
        case LOGIN.LOGGED_USER_DETAILS: {
            return {
                ...state,
                ...action.payload
            };
        }
    }

    return state;
};
