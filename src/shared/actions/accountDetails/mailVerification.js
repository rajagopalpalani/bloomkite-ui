import { VERIFYSIGNUP } from '../actionTypes';


//import store from '../core/configureStore';

//export const action = type => store.dispatch({ type });


/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */
export const verifySignup = (payload) => ({
    type: VERIFYSIGNUP.VERIFY_SIGNUP,
    payload
});







