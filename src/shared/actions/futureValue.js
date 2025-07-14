import { FUTURE_VALUE } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: FUTURE_VALUE.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculate = () => ({
    type: FUTURE_VALUE.CALCULATE_REQUEST
});

export const calculateShare = () => ({
    type: FUTURE_VALUE.CALCULATE_SHARE_REQUEST
});

export const clearFutureValue = () => ({
    type: FUTURE_VALUE.CLEAR_FUTUREVALUE
});