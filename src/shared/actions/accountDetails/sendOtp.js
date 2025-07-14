import { SENDOTP } from '../actionTypes';

export const sendOtp = (payload) => ({
    type: SENDOTP.SEND_OTP,
    payload
});
