import { LOGIN, INVESTOR, FETCH_INVESTOR } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const investorState = fromJS({
    investorDetails: {},
    invInterest: [],
    investorList: [],
    loading:false 
});

export const investorReducer = function (state = investorState, action) {
    switch (action.type) {
        case INVESTOR.INVESTOR_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case INVESTOR.FETCH_BY_INVESTOR_ID_SUCCESS: {
            return {
                ...state,
                investorDetails: {
                    ...state.investorDetails,
                    ...action.payload
                }
            };
        }
        case INVESTOR.ADD_INV_INTEREST_SUCCESS: {
            return {
                ...state,
                invInterest: action.payload
            };
        }
        case INVESTOR.FETCH_INVESTOR_LIST_SUCCESS: {
            return {
                ...state,
                investorList: action.payload
            };
        }

        default:
            return state;
    }
};
