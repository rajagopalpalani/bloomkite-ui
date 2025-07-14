import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError, toastrSuccess } from '../../helpers/toastrHelper';
import { VERIFYOTP } from '../../actions/actionTypes';
import { toastrMessage } from '../../constants/toastrMessage';
import * as verifyOtpService from '../../services/accountDetails/otpVerification';

function* verifyOtp({ payload }) {
    try {
        const data = yield call(verifyOtpService.verifyOtp, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode == 6000) {
            yield put({
                type: VERIFYOTP.OTP_VERIFIED_SUCCESS,
                payload: data
            });
            toastrSuccess(data.responseMessage.responseDescription);
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* verifyOtpWatcher() {
    yield all([takeLatest(VERIFYOTP.VERIFY_OTP, verifyOtp)]);
}
