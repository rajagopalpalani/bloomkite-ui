import { APP_STATE } from './actionTypes';

export const changeLoading = (isLoading) => ({
    type: APP_STATE.CHANGE_LOADING,
    isLoading
});