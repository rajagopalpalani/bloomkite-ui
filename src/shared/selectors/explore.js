export const exploreSelector = state => {
    const { users } = state.exploreReducer;
    const { totalRecords = 0, advisors = [] } = users || {};
    return {
        appState: state.appStateReducer,
        advisorDetails: state.advisorReducer.advisorDetails || {},
        totalRecords,
        users: advisors,
        isLoading: state.appStateReducer.isLoading,
        allStateCityPincode: state.advisorReducer.allStateCityPincode,
        productList: state.advisorReducer.productList,
    }
};
