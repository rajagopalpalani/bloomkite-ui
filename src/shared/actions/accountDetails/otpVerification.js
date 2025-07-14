import { VERIFYOTP } from '../actionTypes';


export const verifyOtp = (payload) => ({
    type: VERIFYOTP.VERIFY_OTP,
    payload
});


export const clearMessage = () => ({
    type: VERIFYOTP.CLEAR_MESSAGE,
});