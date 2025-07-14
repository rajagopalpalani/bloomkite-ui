import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError, toastrSuccess } from '../../helpers/toastrHelper';
import { SENDOTP } from '../../actions/actionTypes';
import { toastrMessage } from '../../constants/toastrMessage';
import * as sendOtpService from '../../services/accountDetails/sendOtp';

function* sendOtp({ payload }) {
    try {
        const data = yield call(sendOtpService.sendOtp, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: SENDOTP.SEND_OTP_SUCCESS,
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

export function* sendOtpWatcher() {
    yield all([takeLatest(SENDOTP.SEND_OTP, sendOtp)]);
}
