export const promotionsSelector = state => ({
    appState: state.appStateReducer,
    advisorDetails: state.advisorReducer.advisorDetails,
    file: state.uploadFileReducer.uploadFileDetails,
    promotionSuccess: state.promotionsReducer.success,
});
