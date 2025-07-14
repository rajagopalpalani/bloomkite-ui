import { TENURE_FINDER, PLANNING } from '../../actions/actionTypes';
import { MONEY } from '../../constants/appConstants';

const initialState = {
    futureValue: 0,
    futureValueInLakshs: true,
    presentValue: 0,
    presentValueInLakshs: true,
    rateOfInterest: 0,
    tenure: 0,
    isLoading: false,
    requestCount: 0
};

export const tenureFinderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TENURE_FINDER.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let presentValue = state.presentValue;
            if (name === 'presentValueInLakshs') {
                if (value) {
                    if (state.presentValue < 1) {
                        presentValue = state.presentValue * 100;
                    } else {
                        presentValue = 1 * 100;
                    }
                }
                else if (!value && state.presentValue > 10) {
                    presentValue = state.presentValue / 100;
                }
            }
            let futureValue = state.futureValue;
            if (name === 'futureValueInLakshs') {
                if (value) {
                    if (state.futureValue < 1) {
                        futureValue = state.futureValue * 100;
                    } else {
                        futureValue = 1 * 100;
                    }
                }
                else if (!value && state.futureValue > 10) {
                    futureValue = state.futureValue / 100;
                }
            }

            return {
                ...state,
                presentValue,
                futureValue,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case TENURE_FINDER.CALCULATE_RESPONSE: {
            let { payload } = action;
            return {
                ...state,
                isLoading: false,
                tenure: Math.round(payload.tenure),
                requestCount: state.requestCount + 1
            };
        }
        case TENURE_FINDER.CLEAR_TENUREFINDER: {
            return {
                ...state,
                futureValue: 0,
                futureValueInLakshs: true,
                presentValue: 0,
                presentValueInLakshs: true,
                rateOfInterest: 0,
                tenure: 0,
                isLoading: false,
                requestCount: 0
            }
        }
        case PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS:
            let { tenureFinder } = action.payload;
            if (tenureFinder) {
                let futureValue = tenureFinder.futureValue;
                let futureValueInLakshs = false;
                if (futureValue < MONEY.CRORE) {
                    futureValueInLakshs = true;
                    futureValue = futureValue / MONEY.LAKSH;
                } else {
                    futureValue = futureValue / MONEY.CRORE;
                }
                let presentValue = tenureFinder.presentValue;
                let presentValueInLakshs = false;
                if (presentValue < MONEY.CRORE) {
                    presentValueInLakshs = true;
                    presentValue = presentValue / MONEY.LAKSH;
                } else {
                    presentValue = presentValue / MONEY.CRORE;
                }
                return {
                    ...state,
                    tenureFinderId: tenureFinder.tenureFinderId,
                    invType: tenureFinder.invType,
                    presentValue,
                    futureValue,
                    rateOfInterest: tenureFinder.rateOfInterest,
                    tenure: Math.round(tenureFinder.tenure)
                };
            }
            return {
                ...state,
                requestCount: state.requestCount + 1
            };

        default:
            return state;
    }
};
