import { TARGET_VALUE } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: TARGET_VALUE.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculate = () => ({
    type: TARGET_VALUE.CALCULATE_REQUEST
});

export const calculateShare = () => ({
    type: TARGET_VALUE.CALCULATE_SHARE_REQUEST
});

export const clearTargetValue = () => ({
    type: TARGET_VALUE.CLEAR_TARGETVALUE
});