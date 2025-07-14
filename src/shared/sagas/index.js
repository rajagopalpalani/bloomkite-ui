import { all } from 'redux-saga/effects';
import { loginWatcher } from './loginSagas';
import { signupWatcher } from './signupSagas';
import { planningWatcher } from './planningSagas';
import { investorWatcher } from './investorSagas';
import { advisorWatcher } from './advisorSagas';
import { uploadFileWatcher } from './uploadFileSagas';
import { blogWatcher } from './blogSagas';
import { goalWatcher } from './myGoalSagas';
import { emiCalculatorWatcher } from './emiCalculatorSagas';
import { partialPaymentsWatcher } from './partialPaymentsSagas';
import { changeInEmiWatcher } from './changeInEmiSagas';
import { changeInInterestWatcher } from './changeInInterestSagas';
import { emiCapacityWatcher } from './emiCapacitySagas';
import { teamSignupWatcher } from './teamSagas';
import { promotionsWatcher } from './promotionsSagas';
import { deleteFileWatcher } from './deleteFileSagas';
import { profileWatcher } from './profileSagas';
import { futureValueWatcher } from './futureValueSagas';
import { targetValueWatcher } from './targetValueSagas';
import { rateFinderWatcher } from './rateFinderSagas';
import { tenureFinderWatcher } from './tenureFinderSagas';
import { resetPasswordWatcher } from './accountDetailsSagas/resetPasswordSagas';
import { verifySignupWatcher } from './accountDetailsSagas/mailVerificationSagas';
import { forgetPasswordWatcher } from './accountDetailsSagas/forgetPasswordSagas';
import { resendMailWatcher } from './accountDetailsSagas/resendMailSagas';
import { exploreWatcher } from './exploreSagas';
import { downloadPlanWatcher } from './downloadPlanSagas';
import { sendOtpWatcher } from './accountDetailsSagas/sendOtpSagas';
import { verifyOtpWatcher } from './accountDetailsSagas/otpVerificationSagas';
import { membershipWatcher } from './membershipSagas';

import { chatWatcher } from './../components/chats/Chat.sagas';
import { followersWatcher } from './../components/followers/Followers.sagas';

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        signupWatcher(),
        teamSignupWatcher(),
        planningWatcher(),
        advisorWatcher(),
        blogWatcher(),
        investorWatcher(),
        uploadFileWatcher(),
        goalWatcher(),
        emiCalculatorWatcher(),
        partialPaymentsWatcher(),
        changeInEmiWatcher(),
        changeInInterestWatcher(),
        emiCapacityWatcher(),
        promotionsWatcher(),
        deleteFileWatcher(),
        profileWatcher(),
        futureValueWatcher(),
        targetValueWatcher(),
        rateFinderWatcher(),
        tenureFinderWatcher(),
        resetPasswordWatcher(),
        verifySignupWatcher(),
        forgetPasswordWatcher(),
        resendMailWatcher(),
        exploreWatcher(),
        downloadPlanWatcher(),
        sendOtpWatcher(),
        verifyOtpWatcher(),
        membershipWatcher(),
        chatWatcher(),
        followersWatcher()
    ]);
}
