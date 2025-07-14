import axios from "axios";
import { apibaseURI, pageURI } from '../constants/apiAttributes';
import { SIGNUP } from './actionTypes';

/**
 * This method is used to create the ADD_TODO action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the todo item
 * @returns {{type: string, payload: {name: *}}} ADD_TODO action
 */

export const signupUser = value => ({
    type: SIGNUP.SIGNUP_REQUESTING,
    payload: value
});
export const  validateUniqueFields = value => ({
    type: SIGNUP. VALIDATE_UNIQUE_FIELDS,
    payload: value
});

