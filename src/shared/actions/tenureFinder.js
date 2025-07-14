import { TENURE_FINDER } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: TENURE_FINDER.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculate = () => ({
    type: TENURE_FINDER.CALCULATE_REQUEST
});

export const calculateShare = () => ({
    type: TENURE_FINDER.CALCULATE_SHARE_REQUEST
});

export const clearTenureFinder = () => ({
    type: TENURE_FINDER.CLEAR_TENUREFINDER
});