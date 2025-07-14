import { PROMOTIONS } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const promotionsState = fromJS({
    success: false,
});

export const promotionsReducer = function (state = promotionsState, action) {
    switch (action.type) {
        case PROMOTIONS.ADD_PROMOTIONS: {
            return {
                ...state,
                loading: action.payload,
                success: false,
            };
        }
        case PROMOTIONS.ADD_PROMOTIONS_SUCCESS: {
            return {
                ...state,
                success: true,
            };
        }
        default:
            return state;
    }
};
