import axios from 'axios';
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { CALCULATE } from './actionTypes';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';

/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const addPlanDetails = (value) => ({
    type: CALCULATE.ADD_PLAN_DETAILS,
    payload: value
});
export const calculateCashFlowDetails = (value) => ({
    type: CALCULATE.CALCULATE_CASHFLOW_DETAILS,
    payload: value
});
export const emiCalculatorDetails = (value) => ({
    type: CALCULATE.EMI_CALCULATOR_DETAILS,
    payload: value
});
export const emiCapacityDetails = (value) => ({
    type: CALCULATE.EMI_CAPACITY_DETAILS,
    payload: value
});
export const emiChangeDetails = (value) => ({
    type: CALCULATE.EMI_CHANGE_DETAILS,
    payload: value
});
export const emiInterestChangeDetails = (value) => ({
    type: CALCULATE.EMI_INTEREST_CHANGE_DETAILS,
    payload: value
});
export const calculateGoalDetails = (value) => ({
    type: CALCULATE.CALCULATE_GOAL_DETAILS,
    payload: value
});
export const calculateInsuranceDetails = (value) => ({
    type: CALCULATE.CALCULATE_INSURANCE_DETAILS,
    payload: value
});
export const interestChangeDetails = (value) => ({
    type: CALCULATE.INTEREST_CHANGE_DETAILS,
    payload: value
});
export const calculateNetworthDetails = (value) => ({
    type: CALCULATE.CALCULATE_NETWORTH_DETAILS,
    payload: value
});
export const calculatePartialPaymentDetails = (value) => ({
    type: CALCULATE.CALCULATE_PARTIAL_PAYMENT_DETAILS,
    payload: value
});
export const calculatePrioritiesDetails = (value) => ({
    type: CALCULATE.CALCULATE_PRIORITIES_DETAILS,
    payload: value
});
export const calculateRiskProfileDetails = (value) => ({
    type: CALCULATE.CALCULATE_RISK_PROFILE_DETAILS,
    payload: value
});

export const addPlan = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.addPlan}`, options)
        .then((response) => {
            toastrSuccess('Plan added successfully');
            dispatch(addPlanDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculateCashFlow = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculateCashFlow}`, options)
        .then((response) => {
            toastrSuccess('Calculate cashflow added successfully');
            dispatch(calculateCashFlowDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const emiCalculator = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.emiCalculator}`, options)
        .then((response) => {
            toastrSuccess('EMI calculator added successfully');
            dispatch(emiCalculatorDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const emiCapacity = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.emiCapacity}`, options)
        .then((response) => {
            toastrSuccess('EMI capacity added successfully');
            dispatch(emiCapacityDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const emiChange = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.emiChange}`, options)
        .then((response) => {
            toastrSuccess('EMI change added successfully');
            dispatch(emiChangeDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const emiInterestChange = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.emiInterestChange}`, options)
        .then((response) => {
            toastrSuccess('EMI interest change added successfully');
            dispatch(emiInterestChangeDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculateGoal = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculateGoal}`, options)
        .then((response) => {
            toastrSuccess('Calculate goal added successfully');
            dispatch(calculateGoalDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculateInsurance = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculateInsurance}`, options)
        .then((response) => {
            toastrSuccess('Calculate insurance added successfully');
            dispatch(calculateInsuranceDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const interestChange = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.interestChange}`, options)
        .then((response) => {
            toastrSuccess('Interest change added successfully');
            dispatch(interestChangeDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculateNetworth = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculateNetworth}`, options)
        .then((response) => {
            toastrSuccess('Calculate networth added successfully');
            dispatch(calculateNetworthDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculatePartialPayment = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculatePartialPayment}`, options)
        .then((response) => {
            toastrSuccess('Calculate partial payment added successfully');
            dispatch(calculatePartialPaymentDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculatePriorities = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculatePriorities}`, options)
        .then((response) => {
            toastrSuccess('Calculate priorities added successfully');
            dispatch(calculatePrioritiesDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};

export const calculateRiskProfile = (options) => (dispatch) => {
    axios
        .post(`${apibaseURI}${pageURI.calculateRiskProfile}`, options)
        .then((response) => {
            toastrSuccess('Calculate risk profile added successfully');
            dispatch(calculateRiskProfileDetails(response.data));
        })
        .catch((error) => {
            toastrError('Error Occured: ' + error);
        });
};
