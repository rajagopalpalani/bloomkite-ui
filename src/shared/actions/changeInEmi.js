import { CHANGE_IN_EMI } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: CHANGE_IN_EMI.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculateEmiChange = payload => ({
    type: CHANGE_IN_EMI.CALCULATE_EMI_CHANGE_REQUEST,
    payload
});

export const changeInEmiButtonClicked = () => ({
    type: CHANGE_IN_EMI.CHANGE_IN_EMI_BUTTON_CLICKED
});

export const clearEmiChange = () => ({
    type: CHANGE_IN_EMI.CLEAR_CHANGE_IN_EMI
});

export const calculateShare = () => ({
    type: CHANGE_IN_EMI.CALCULATE_SHARE_REQUEST
});

