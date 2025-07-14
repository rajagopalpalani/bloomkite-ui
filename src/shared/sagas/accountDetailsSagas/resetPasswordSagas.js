import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError} from '../../helpers/toastrHelper';
import { RESETPASSWORD } from '../../actions/actionTypes';
import { toastrMessage } from '../../constants/toastrMessage';
import * as resetPasswordService from '../../services/accountDetails/resetPassword';


function* resetPassword({ payload }) {
    try {
        const data = yield call(resetPasswordService.resetPassword, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: RESETPASSWORD.RESET_PASSWORD_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* resetPasswordWatcher() {
    yield all([
        takeLatest(RESETPASSWORD.RESET_PASSWORD, resetPassword)
    ]);
}