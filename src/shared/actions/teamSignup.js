import { TEAM_SIGNUP } from './actionTypes';

export const teamSignupUser = value => ({
    type: TEAM_SIGNUP.TEAM_CREATION_REQUESTING,
    payload: value
});

export const keypeopleSignupUser = value => ({
    type: TEAM_SIGNUP.KEYPEOPLE_CREATION_REQUESTING,
    payload: value
});

export const fetchTeam = value => ({
    type: TEAM_SIGNUP.TEAM_MEMBER_DETAILS,
    payload: value
});

export const fetchKeyPeopleByParentId = value => ({
    type: TEAM_SIGNUP.KEY_PEOPLE_DETAILS,
    payload: value
});

export const teamMemberDeactivate = value => ({
    type: TEAM_SIGNUP.TEAM_MEMBER_DEACTIVATE,
    payload: value
});

export const deleteKeypeople = value => ({
    type: TEAM_SIGNUP.KEY_PEOPLE_DELETE,
    payload: value
});

export const modifyKeypeople = (value) => ({
    type: TEAM_SIGNUP.MODIFY_KEY_PEOPLE,
    payload: value
});
export const validateUniqueFields = value => ({
    type: TEAM_SIGNUP.VALIDATE_UNIQUE_FIELDS,
    payload: value
});