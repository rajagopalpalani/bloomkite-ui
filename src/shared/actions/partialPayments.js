import { PARTIAL_PAYMENTS, EMI_CALCULATOR } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: PARTIAL_PAYMENTS.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculatePartialPayments = payload => ({
    type: PARTIAL_PAYMENTS.CALCULATE_PARTIAL_PAYMENTS_REQUEST,
    payload
});

export const changePartialPaymentsButtonClicked = () => ({
    type: PARTIAL_PAYMENTS.CHANGE_PARTIAL_PAYMENTS_BUTTON_CLICKED
});

export const clearPartialPayments = () => ({
    type: PARTIAL_PAYMENTS.CLEAR_PARTIAL_PAYMENTS
});

export const calculateShare = () => ({
    type: PARTIAL_PAYMENTS.CALCULATE_SHARE_REQUEST
});
