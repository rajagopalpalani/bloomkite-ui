export const headerSelector = state => ({
    loggedDetails: state.loginReducer,
    signedDetails: state.signinReducer,
    advisorDetails: state.advisorReducer.advisorDetails,
    investorDetails: state.investorReducer.investorDetails,
    environment: state.environment
});