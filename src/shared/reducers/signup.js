import { SIGNUP } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const signupState = fromJS({
    userDetails: '',
});

export const signupReducer = function (state = signupState, action) {
    switch (action.type) {
        case SIGNUP.SIGNUP_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload
            };
    }

    return state;
}