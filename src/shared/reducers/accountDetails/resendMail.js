import { RESENDMAIL } from '../../actions/actionTypes';
import { fromJS } from 'immutable';

const resendMailState = fromJS({
    resendMailDetails: {},
    loading: false
});

export const resendMailReducer = function (state = resendMailState, action) {
    switch (action.type) {
        case RESENDMAIL.RESEND_MAIL_SUCCESS: {
            return {
                ...state,
                resendMailDetails: action.payload
            };
        }
        default:
            return state;
    }
};
