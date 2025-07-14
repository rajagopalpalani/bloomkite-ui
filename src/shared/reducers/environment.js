import { ENVIRONMENT } from '../actions/actionTypes';

/**
 * This example reducer handle the creation of todo items.
 * For more information on how reducers work, see https://redux.js.org/docs/basics/Reducers.html.
 * @param state Initial state of the reducer
 * @param action Action that comes in via the dispatcher
 * @returns {*} New state
 */
const initialState = '';
export const environment = function (state = initialState, action) {
    switch (action.type) {
        case ENVIRONMENT.GET_ENVIRONMENT:
            return action.payload;
        default:
            return state;
    }
};
