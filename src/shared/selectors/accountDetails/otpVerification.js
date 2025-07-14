const verifyOtpSelector = (state) => ({
    verifyOtpDetails: state.verifyOtpReducer,
    isPasswordVerified: state.advisorReducer.isPasswordVerified
});

export default verifyOtpSelector;
