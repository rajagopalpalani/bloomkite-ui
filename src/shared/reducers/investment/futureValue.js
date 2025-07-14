import { FUTURE_VALUE, PLANNING } from '../../actions/actionTypes';
import { MONEY } from '../../constants/appConstants';

const initialState = {
    invAmount: 0,
    invAmountInLakshs: true,
    duration: 0,
    durationInYear: true,
    annualGrowth: 0,
    yearlyIncrease: 0,
    totalPayment: 0,
    isLoading: false,
    requestCount: 0
};

export const futureValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FUTURE_VALUE.ON_VALUE_CHANGE_SUCCESS: {
            let { name, value } = action.payload;
            let duration = state.duration;
            if (name === 'durationInYear') {
                if (value && state.duration > 30) {
                    duration = state.duration / 12;
                } else if (!value && state.duration <= 30) {
                    duration = state.duration * 12;
                }
            }
            let invAmount = state.invAmount;
            if (name === 'invAmountInLakshs') {
                if (value) {
                    if (state.invAmount < 1) {
                        invAmount = state.invAmount * 100;
                    } else {
                        invAmount = 1 * 100;
                    }
                }
                else if (!value && state.invAmount > 10) {
                    invAmount = state.invAmount / 100;
                }
            }

            return {
                ...state,
                duration,
                invAmount,
                isLoading: true,
                [action.payload.name]: value
            };
        }
        case FUTURE_VALUE.CLEAR_FUTUREVALUE: {
            return {
                ...state,
                invAmount: 0,
                invAmountInLakshs: true,
                duration: 0,
                durationInYear: true,
                annualGrowth: 0,
                yearlyIncrease: 0,
                totalPayment: 0,
                isLoading: false,
                requestCount: 0
            }
        }
        case FUTURE_VALUE.CALCULATE_RESPONSE: {
            let { payload } = action;
            return {
                ...state,
                isLoading: false,
                totalPayment: Math.round(payload.totalPayment),
                requestCount: state.requestCount + 1
            };
        }

        case PLANNING.FETCH_INVESTMENT_PLANNING_SUCCESS:
            let { futureValue } = action.payload;
            if (futureValue) {
                let invAmount = futureValue.invAmount;
                let invAmountInLakshs = false;
                if (invAmount < MONEY.CRORE) {
                    invAmountInLakshs = true;
                    invAmount = invAmount / MONEY.LAKSH;
                } else {
                    invAmount = invAmount / MONEY.CRORE;
                }
                return {
                    ...state,
                    futureValueId: futureValue.futureValueId,
                    invType: futureValue.invType,
                    invAmount,
                    duration: futureValue.duration,
                    durationType: futureValue.durationType,
                    annualGrowth: futureValue.annualGrowth,
                    totalPayment: Math.round(futureValue.totalPayment)
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
