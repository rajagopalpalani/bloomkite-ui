import { put, takeLatest, call, all, fork } from 'redux-saga/effects';
import { toastrError} from '../../helpers/toastrHelper';
import { RESENDMAIL } from '../../actions/actionTypes';
import { toastrMessage } from '../../constants/toastrMessage';
import * as resendMailService from '../../services/accountDetails/resendMail';


function* resendMail({ payload }) {
    try {
        const data = yield call(resendMailService.resendMail, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // yield call(fetchByAdvisorID, { payload: payload.advId });
            yield put({
                type: RESENDMAIL.RESEND_MAIL_SUCCESS,
                payload: data
            });
        } else {
            toastrError(toastrMessage.somethingError);
        }
    } catch (e) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* resendMailWatcher() {
    yield all([
        takeLatest(RESENDMAIL.RESEND_MAIL, resendMail)
    ]);
}