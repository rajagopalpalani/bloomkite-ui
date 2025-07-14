import { EXPLORE } from './actionTypes';

export const exploreByUser = value => ({
    type: EXPLORE.EXPLORE_BY_USER,
    payload: value
});

export const exploreByUserSuccess = value => ({
    type: EXPLORE.EXPLORE_BY_USER_SUCCESS,
    payload: value
});

export const exploreAdvisorByProducts = value => ({
    type: EXPLORE.EXPLORE_BY_PRODUCTS,
    payload: value
});
