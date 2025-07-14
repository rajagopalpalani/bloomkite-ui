import { RATE_FINDER, PLANNING } from '../../actions/actionTypes';
import { MONEY } from '../../constants/appConstants';

const initialState = {
    futureValue: 0,
    futureValueInLakshs: true,
    duration: 0,
    durationInYear: true,
    presentValue: 0,
    presentValueInLakshs: true,
    rateOfInterest: 0,
    isLoading: false,
    requestCount: 0
};

export const rateFinderReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATE_FINDER.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let duration = state.duration;
            if (name === 'durationInYear') {
                if (value && state.duration > 30) {
                    duration = state.duration / 12;
                } else if (!value && state.duration <= 30) {
                    duration = state.duration * 12;
                }
            }
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
                duration,
                presentValue,
                futureValue,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case RATE_FINDER.CALCULATE_RESPONSE: {
            let { payload } = action;
            return {
                ...state,
                isLoading: false,
                rateOfInterest: Math.round(payload.rateOfInterest),
                requestCount: state.requestCount + 1
            };
        }
        case RATE_FINDER.CLEAR_RATEFINDER: {
            return {
                ...state,
                futureValue: 0,
                futureValueInLakshs: true,
                duration: 0,
                durationInYear: true,
                presentValue: 0,
                presentValueInLakshs: true,
                rateOfInterest: 0,
                isLoading: false,
                requestCount: 0
            }
        }  

        case PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS:
            let { rateFinder } = action.payload;
            if (rateFinder) {
                let futureValue = rateFinder.futureValue;
                let futureValueInLakshs = false;
                if (futureValue < MONEY.CRORE) {
                    futureValueInLakshs = true;
                    futureValue = futureValue / MONEY.LAKSH;
                } else {
                    futureValue = futureValue / MONEY.CRORE;
                }
                let presentValue = rateFinder.presentValue;
                let presentValueInLakshs = false;
                if (presentValue < MONEY.CRORE) {
                    presentValueInLakshs = true;
                    presentValue = presentValue / MONEY.LAKSH;
                } else {
                    presentValue = presentValue / MONEY.CRORE;
                }
                return {
                    ...state,
                    rateFinderId: rateFinder.rateFinderId,
                    invType: rateFinder.invType,
                    presentValue,
                    futureValue,
                    duration: rateFinder.duration,
                    durationType: rateFinder.durationType,
                    rateOfInterest: Math.round(rateFinder.rateOfInterest)
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
