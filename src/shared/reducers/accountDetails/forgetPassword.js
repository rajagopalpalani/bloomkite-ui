import { LOGIN, FORGETPASSWORD } from '../../actions/actionTypes';
import { fromJS } from 'immutable';

const forgetPasswordState = fromJS({
    forgetPasswordDetails: {},
    loading: false
})

export const forgetPasswordReducer = function (state = forgetPasswordState, action) {
    switch (action.type) {
        case FORGETPASSWORD.FORGET_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgetPasswordDetails: action.payload
            };
        }
        default:
            return state;
    }
};

