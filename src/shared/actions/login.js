import { LOGIN } from './actionTypes';

export const loginUser = value => ({
    type: LOGIN.LOGIN_REQUESTING,
    payload: value
});

export const refreshToken = () => ({
    type: LOGIN.REFRESH_TOKEN,
});
