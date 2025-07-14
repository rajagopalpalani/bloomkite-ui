import { RESETPASSWORD } from '../actionTypes';


export const resetPassword = (options, key) => ({
    type: RESETPASSWORD.RESET_PASSWORD,
    payload: { options, key }
});
