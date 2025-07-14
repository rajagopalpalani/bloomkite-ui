const verifySignupSelector = state => ({ 
    verifySignupDetails: state.verifySignupReducer.verifySignupDetails,
    forgetPasswordDetails: state.forgetPasswordReducer.forgetPasswordDetails,
    resendMailDetails: state.resendMailReducer.resendMailDetails ? state.resendMailReducer.resendMailDetails.responseMessage.responseDescription : ''
    
});

export default verifySignupSelector;