const signupSelector = (state) => ({
    signupDetails: state.signupReducer && state.signupReducer.userDetails,
    isLoading: state.appStateReducer.isLoading,
    loggedDetails: state.loginReducer,
    validateUniqueField: state.signupReducer.validateUniqueField
});

export default signupSelector;
