export const teamSignupSelector = state => ({
    teamDetails: state.teamSignupReducer && state.teamSignupReducer.teamDetails,
    keyPeopleDetails: state.teamSignupReducer && state.teamSignupReducer.keyPeopleDetails,
    file: state.uploadFileReducer.uploadFileDetails
});
