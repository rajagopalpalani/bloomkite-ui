import { FORGETPASSWORD } from '../actionTypes';


export const forgetPassword = (value) => ({
    type: FORGETPASSWORD.FORGET_PASSWORD,
    payload: value
});