import { EMI_CAPACITY } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: EMI_CAPACITY.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculateEmiCapacity = payload => ({
    type: EMI_CAPACITY.CALCULATE_EMI_CAPACITY_REQUEST,
    payload
});

export const changeEmiCapacityButtonClicked = () => ({
    type: EMI_CAPACITY.CHANGE_EMI_CAPACITY_BUTTON_CLICKED
});

export const clearEmiCapacity = () => ({
    type: EMI_CAPACITY.CLEAR_EMI_CAPACITY
});

export const calculateShare = () => ({
    type: EMI_CAPACITY.CALCULATE_SHARE_REQUEST
});