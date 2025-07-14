export const resendMailSelector = state => ({
    // resendMailDetails: state.resendMailReducer.resendMailDetails,
    resendMailDetails: state.resendMailReducer.resendMailDetails ? state.resendMailReducer.resendMailDetails.responseMessage.responseDescription : ''

});