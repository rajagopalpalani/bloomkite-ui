import { combineReducers } from 'redux';
import { appStateReducer } from './app';
import { environment } from './environment';
import { loginReducer } from './login';
import { teamSignupReducer } from './team';
import { advisorReducer } from './advisor';
import { planningReducer } from './planning';
import { blogReducer } from './blog';
import { investorReducer } from './investor';
import { goalReducer } from './planning/goal';
import { emiCalculatorReducer } from './planning/emiCalculator';
import { emiCapacityReducer } from './planning/emiCapacity';
import { partialPaymentsReducer } from './planning/partialPayments';
import { changeInEmiReducer } from './planning/changeInEmi';
import { changeInInterestReducer } from './planning/changeInInterest';
import { futureValueReducer } from './investment/futureValue';
import { targetValueReducer } from './investment/targetValue';
import { rateFinderReducer } from './investment/rateFinder';
import { tenureFinderReducer } from './investment/tenureFinder';
import { uploadFileReducer } from './uploadFile';
import { promotionsReducer } from './promotions';
import { profileReducer } from './profile';
import { resetPasswordReducer } from './accountDetails/resetPassword';
import { verifySignupReducer } from './accountDetails/mailVerification';
import { forgetPasswordReducer } from './accountDetails/forgetPassword';
import { resendMailReducer } from './accountDetails/resendMail';
import { signupReducer } from './signup';
import { exploreReducer } from './explore';
import { verifyOtpReducer } from './accountDetails/otpVerification';
import { publicAdvisorReducer } from './publicAdvisor';
import chatReducer from './../components/chats/Chat.reducers';
import followersReducer from './../components/followers/Followers.reducers';
import { membershipReducer } from './membership';

export default combineReducers({
    appStateReducer,
    environment,
    loginReducer,
    teamSignupReducer,
    advisorReducer,
    planningReducer,
    blogReducer,
    investorReducer,
    goalReducer,
    emiCalculatorReducer,
    emiCapacityReducer,
    partialPaymentsReducer,
    changeInEmiReducer,
    changeInInterestReducer,
    uploadFileReducer,
    promotionsReducer,
    profileReducer,
    futureValueReducer,
    targetValueReducer,
    rateFinderReducer,
    tenureFinderReducer,
    resetPasswordReducer,
    verifySignupReducer,
    forgetPasswordReducer,
    resendMailReducer,
    signupReducer,
    exploreReducer,
    verifyOtpReducer,
    publicAdvisorReducer,
    chatReducer,
    followersReducer,
    membershipReducer
});
