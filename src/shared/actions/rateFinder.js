import { RATE_FINDER } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: RATE_FINDER.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculate = () => ({
    type: RATE_FINDER.CALCULATE_REQUEST
});

export const calculateShare = () => ({
    type: RATE_FINDER.CALCULATE_SHARE_REQUEST
});

export const clearRateFinder = () => ({
    type: RATE_FINDER.CLEAR_RATEFINDER
});