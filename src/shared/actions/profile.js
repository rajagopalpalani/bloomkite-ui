import { PROFILE } from './actionTypes';

export const getProfile = (payload) => ({
    type: PROFILE.GET_PROFILE,
    payload
});

export const getProfileSuccess = (payload) => ({
    type: PROFILE.GET_PROFILE_SUCCESS,
    payload
});

export const getProfileError = () => ({
    type: PROFILE.GET_PROFILE_ERROR,
});

export const updateProfile = (payload) => ({
    type: PROFILE.UPDATE_PROFILE,
    payload
});

export const updateInvestorProfile = (payload) => ({
    type: PROFILE.UPDATE_INVESTOR_PROFILE,
    payload
});

export const getProfileWithoutToken = (payload) => ({
    type: PROFILE.GET_PROFILE_WITHOUT_TOKEN,
    payload
});

export const getProfileByUserName = (payload) => ({
    type: PROFILE.GET_PROFILE_BY_USERNAME,
    payload
});

export const clearProfile = () => ({
    type: PROFILE.CLEAR_PROFILE,
});
