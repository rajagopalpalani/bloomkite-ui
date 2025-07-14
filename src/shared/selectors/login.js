const loginSelector = state => ({ 
    loggedDetails: state.loginReducer
});

export default loginSelector;