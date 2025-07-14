import { LOGIN, ADVISOR, FETCH_ADVISOR } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const publicAdvisorState = fromJS({
    publicAdvisorDetails: {}
});

export const publicAdvisorReducer = function (state = publicAdvisorState, action) {
    switch (action.type) {
        case FETCH_ADVISOR.FETCH_BY_PUBLIC_ADVISOR_ID_SUCCESS: {
            return {
                ...state,
                publicAdvisorDetails: action.payload
            };
        }
        default:
            return state;
    }
};
