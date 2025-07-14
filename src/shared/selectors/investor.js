export const investorSelector = state => ({
    investorDetails: state.investorReducer.investorDetails,
    invInterest: state.investorReducer.invInterest,
    investorList: state.investorReducer.investorList,
    categoryList: state.advisorReducer.categoryList,
    uploadFileDetails: state.uploadFileReducer.uploadFileDetails,
    loading: state.appStateReducer.isLoading,
    verifyOtpDetails: state.verifyOtpReducer,
    productList: state.advisorReducer.productList
});
