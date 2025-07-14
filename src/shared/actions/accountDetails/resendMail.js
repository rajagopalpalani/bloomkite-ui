import { RESENDMAIL } from '../actionTypes';


export const resendMail = (value) => ({
    type: RESENDMAIL.RESEND_MAIL,
    payload: value
});