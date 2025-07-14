import { MEMBERSHIP } from './actionTypes';

export const updateSubscription = (value) => ({
    type: MEMBERSHIP.UPDATE_SUBSCRIPTION,
    payload: value
});

export const fetchAllMembershipPlan = (value) => ({
    type: MEMBERSHIP.FETCH_ALL_MEMBERSHIP_PLAN,
    payload: value
});

export const createSubscription = (value) => ({
    type: MEMBERSHIP.CREATE_SUBSCRIPTION,
    payload: value
});

export const cancelSubscription = (value) => ({
    type: MEMBERSHIP.CANCEL_SUBSCRIPTION,
    payload: value
});

export const createSinglePaymentOrder = (value) => ({
    type: MEMBERSHIP.CREATE_SINGLE_PAYMENT_ORDER,
    payload: value
});

export const verifySinglePayment = (value) => ({
    type: MEMBERSHIP.VERIFY_SINGLE_PAYMENT,
    payload: value
});

export const verifySubscription = (value) => ({
    type: MEMBERSHIP.VERIFY_SUBSCRIPTION,
    payload: value
});

export const fetchSubscription = (value) => ({
    type: MEMBERSHIP.FETCH_SUBSCRIPTION,
    payload: value
});

export const createOrderNumber = (value) => ({
    type: MEMBERSHIP.CREATE_ORDER_NUMBER,
    payload: value
})

export const updateOrderDetail = (value) => ({
    type: MEMBERSHIP.UPDATE_ORDER_DETAIL,
    payload: value
})

export const onPaid = (value) => ({
    type: MEMBERSHIP.ON_PAID,
    payload: value
})
