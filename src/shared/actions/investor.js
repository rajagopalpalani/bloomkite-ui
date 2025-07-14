import { INVESTOR } from './actionTypes';

/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const addInvInterest = (value) => ({
    type: INVESTOR.ADD_INV_INTEREST,
    payload: value
});

export const fetchInvestorList = () => ({
    type: INVESTOR.FETCH_INVESTOR_LIST
});

export const fetchByInvestorId = (value) => ({
    type: INVESTOR.FETCH_BY_INVESTOR_ID,
    payload: value
});

export const fetchByInvestorIDSuccess = (value) => ({
    type: INVESTOR.FETCH_BY_INVESTOR_ID_SUCCESS,
    payload: value
});

export const modifyInvestor = (value) => ({
    type: INVESTOR.MODIFY_INVESTOR,
    payload: value
});

export const modifyInvInterest = (value) => ({
    type: INVESTOR.MODIFY_INV_INTEREST,
    payload: value
});

export const deleteInvestor = (value) => ({
    type: INVESTOR.DELETE_INVESTOR,
    payload: value
});

export const deleteInvInterest = (value) => ({
    type: INVESTOR.DELETE_INV_INTEREST,
    payload: value
});



