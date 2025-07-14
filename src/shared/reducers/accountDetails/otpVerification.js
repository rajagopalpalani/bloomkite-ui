import { VERIFYOTP } from '../../actions/actionTypes';
import { fromJS } from 'immutable';

const verifyOtpState = fromJS({
    verifyOtpMessage: '',
    isVerified: false
});

export const verifyOtpReducer = function (state = verifyOtpState, action) {
    switch (action.type) {
        case VERIFYOTP.OTP_VERIFIED_SUCCESS: {
            return {
                ...state,
                verifyOtpMessage: action.payload.responseMessage.responseDescription,
                isVerified: action.payload.responseData.data
            };
        }
        case VERIFYOTP.CLEAR_MESSAGE: {
            return {
                ...state,
                verifyOtpMessage: '',
                isVerified: false
            };
        }
        default:
            return state;
    }
};
