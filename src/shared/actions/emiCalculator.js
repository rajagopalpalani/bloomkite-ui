import { EMI_CALCULATOR } from './actionTypes';

export const onChange = (name, value, type) => ({
    type: EMI_CALCULATOR.ON_VALUE_CHANGE,
    payload: {
        name,
        value,
        type
    }
});

export const calculateEmi = () => ({
    type: EMI_CALCULATOR.CALCULATE_EMI_REQUEST
});

export const changeEmiCalculatorButtonClicked = () => ({
    type: EMI_CALCULATOR.CHANGE_EMI_CALCULATOR_BUTTON_CLICKED
});

export const clearEmiCalculator = () => ({
    type: EMI_CALCULATOR.CLEAR_EMI_CALCULATOR
});

export const calculateShare = () => ({
    type: EMI_CALCULATOR.CALCULATE_SHARE_REQUEST
});