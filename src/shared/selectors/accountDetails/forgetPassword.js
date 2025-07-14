export const forgetPasswordSelector = state => ({
    forgetPasswordDetails: state.forgetPasswordReducer.forgetPasswordDetails ? state.forgetPasswordReducer.forgetPasswordDetails.responseMessage.responseDescription : ''
});