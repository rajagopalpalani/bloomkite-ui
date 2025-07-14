import { CHANGE_IN_INTEREST } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: CHANGE_IN_INTEREST.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculateInterestChange = payload => ({
    type: CHANGE_IN_INTEREST.CALCULATE_INTEREST_CHANGE_REQUEST,
    payload
});

export const changeInInterestButtonClicked = () => ({
    type: CHANGE_IN_INTEREST.CHANGE_IN_INTEREST_BUTTON_CLICKED
});

export const clearInterestChange = () => ({
    type: CHANGE_IN_INTEREST.CLEAR_CHANGE_IN_INTEREST
});

export const calculateShare = () => ({
    type: CHANGE_IN_INTEREST.CALCULATE_SHARE_REQUEST
});
