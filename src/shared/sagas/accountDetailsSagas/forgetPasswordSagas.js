import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError} from '../../helpers/toastrHelper';
import { FORGETPASSWORD } from '../../actions/actionTypes';
import { toastrMessage } from '../../constants/toastrMessage';
import * as forgetPasswordService from '../../services/accountDetails/forgetPassword';


function* forgetPassword({ payload }) {
    try {
        const data = yield call(forgetPasswordService.forgetPassword, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: FORGETPASSWORD.FORGET_PASSWORD_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* forgetPasswordWatcher() {
    yield all([
        takeLatest(FORGETPASSWORD.FORGET_PASSWORD, forgetPassword)
    ]);
}