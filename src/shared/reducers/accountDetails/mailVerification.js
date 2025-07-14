import { LOGIN, VERIFYSIGNUP, } from '../../actions/actionTypes';
import { fromJS } from 'immutable';

const verifySignupState = fromJS({
    verifySignupDetails: {}
});

export const verifySignupReducer = function (state = verifySignupState, action) {
    switch (action.type) {
        case VERIFYSIGNUP.VERIFY_SIGNUP_SUCCESS: {
            return {
                ...state,
                verifySignupDetails: action.payload
            };
        }
        default:
            return state;
    }
};
