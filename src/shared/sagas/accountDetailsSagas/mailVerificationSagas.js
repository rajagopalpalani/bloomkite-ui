import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { VERIFYSIGNUP } from '../../actions/actionTypes';
import * as verifySignupService from '../../services/accountDetails/mailVerification';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';

function* verifySignup(payload) {
    try {
        const data = yield call(verifySignupService.verifySignup, payload);
        if (data) {
            yield put({
                type: VERIFYSIGNUP.VERIFY_SIGNUP_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.verifySignupError);
        }

    } catch (error) {
        toastrError(toastrMessage.verifySignupError);
    }
}

export function* verifySignupWatcher() {
    yield all([
        takeLatest(VERIFYSIGNUP.VERIFY_SIGNUP, verifySignup)
    ]);
}
