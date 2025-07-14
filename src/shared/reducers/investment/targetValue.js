import { TARGET_VALUE, PLANNING } from '../../actions/actionTypes';
import { MONEY } from '../../constants/appConstants';

const initialState = {
    futureValue: 0,
    futureValueInLakshs: true,
    duration: 0,
    durationInYear: true,
    rateOfInterest: 0,
    totalPayment: 0,
    isLoading: false,
    requestCount: 0
};

export const targetValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case TARGET_VALUE.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let duration = state.duration;
            if (name === 'durationInYear') {
                if (value && state.duration > 30) {
                    duration = state.duration / 12;
                } else if (!value && state.duration <= 30) {
                    duration = state.duration * 12;
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
                futureValue,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case TARGET_VALUE.CALCULATE_RESPONSE: {
            let { payload } = action;
            return {
                ...state,
                isLoading: false,
                totalPayment: Math.round(payload.totalPayment),
                requestCount: state.requestCount + 1
            };
        }
        case TARGET_VALUE.CLEAR_TARGETVALUE: {
            return {
                ...state,
                futureValue: 0,
                futureValueInLakshs: true,
                duration: 0,
                durationInYear: true,
                rateOfInterest: 0,
                totalPayment: 0,
                isLoading: false,
                requestCount: 0
            }
        }
        case PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS:
            let { targetValue } = action.payload;
            if (targetValue) {
                let futureValue = targetValue.futureValue;
                let futureValueInLakshs = false;
                if (futureValue < MONEY.CRORE) {
                    futureValueInLakshs = true;
                    futureValue = futureValue / MONEY.LAKSH;
                } else {
                    futureValue = futureValue / MONEY.CRORE;
                }
                return {
                    ...state,
                    targetValueId: targetValue.targetValueId,
                    invType: targetValue.invType,
                    futureValue,
                    rateOfInterest: targetValue.rateOfInterest,
                    duration: targetValue.duration,
                    durationType: targetValue.durationType,
                    totalPayment: Math.round(targetValue.totalPayment)
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
