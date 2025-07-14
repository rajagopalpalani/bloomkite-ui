export const membershipSelector = state => ({
    appState: state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails,    
    membership: state.membershipReducer
});