import { LOGIN, RESETPASSWORD } from '../../actions/actionTypes';
import { fromJS } from 'immutable';

const resetPasswordState = fromJS({
    resetPasswordDetails: {},
    loading: false
})

export const resetPasswordReducer = function (state = resetPasswordState, action) {
    switch (action.type) {
        case RESETPASSWORD.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordDetails: action.payload
            };
        }
        default:
            return state;
    }
};

