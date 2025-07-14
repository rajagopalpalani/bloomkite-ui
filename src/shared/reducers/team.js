import { TEAM_SIGNUP } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const teamSignupState = fromJS({
    teamDetails: '',
    keyPeopleDetails: ''
});

export const teamSignupReducer = function (state = teamSignupState, action) {
    switch (action.type) {
        case TEAM_SIGNUP.TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                teamDetails: action.payload
            };
        case TEAM_SIGNUP.KEY_PEOPLE_SUCCESS:
            return {
                ...state,
                keyPeopleDetails: action.payload
            };
    }
    return state;
};
