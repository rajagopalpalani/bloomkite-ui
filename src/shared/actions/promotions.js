import { PROMOTIONS } from './actionTypes';

export const addPromotions = value => ({
    type: PROMOTIONS.ADD_PROMOTIONS,
    payload: value
});
