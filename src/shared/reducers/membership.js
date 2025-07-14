import { MEMBERSHIP } from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    membershipPlans: [],
    subscription: null,
    subOrderNumber: null,
    payOrderNumber: null,
    subPaid: false,
    payPaid: false,
    paymentSuccess: false,
    paymentFailure: false,
    paymentClosed: false
};

export const membershipReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBERSHIP.FETCH_ALL_MEMBERSHIP_PLAN_SUCCESS: {
            return {
                ...state,
                membershipPlans: action.payload.memberShipPlans,
                isLoading: false
            };
        }
        case MEMBERSHIP.CREATE_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                subscription: action.payload,
                isLoading: false
            };
        }
        case MEMBERSHIP.FETCH_SUBSCRIPTION_SUCCESS: {
            return {
                ...state,
                subscription: action.payload,
                isLoading: false
            };
        }
        case MEMBERSHIP.CREATE_SINGLE_PAYMENT_ORDER_SUCCESS: {
            return {
                ...state,
                paymentOrder: action.payload,
                isLoading: false
            };
        }
        case MEMBERSHIP.CREATE_ORDER_NUMBER_SUCCESS: {
            if (action.payload) {
                if (action.payload.type === 'subscription') {
                    return {
                        ...state,
                        subOrderNumber: action.payload,
                        isLoading: false
                    };
                } else if (action.payload.type === 'payment') {
                    return {
                        ...state,
                        payOrderNumber: action.payload,
                        isLoading: false
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
        }
        case MEMBERSHIP.ON_PAID: {
            if (action.payload) {
                if (action.payload.type === 'success') {
                    return {
                        ...state,
                        paymentSuccess: true,
                        paymentFailure: false,
                        paymentClosed: false
                    };
                } else if (action.payload.type === 'failure') {
                    return {
                        ...state,
                        paymentFailure: true,
                        paymentSuccess: false,
                        paymentClosed: false
                    };
                } else if (action.payload.type === 'closed') {
                    return {
                        ...state,
                        paymentClosed: true,
                        paymentFailure: false,
                        paymentSuccess: false
                    };
                } else {
                    return {
                        ...state,
                        paymentClosed: false,
                        paymentFailure: false,
                        paymentSuccess: false
                    };
                }
            }
        }
        default:
            return state;
    }
};
