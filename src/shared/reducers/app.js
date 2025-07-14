import { APP_STATE } from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

export const appStateReducer = (state = initialState, action) => {
    switch (action.type) {        
        case APP_STATE.CHANGE_LOADING: {
            return {
                isLoading : action.isLoading
            };
        }
        default:
            return state;
    }
};
