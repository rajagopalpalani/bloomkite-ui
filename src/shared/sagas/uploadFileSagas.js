import { put, takeLatest, call, all, fork } from 'redux-saga/effects';

import { UPLOADFILE } from '../actions/actionTypes';
import * as uploadFileService from '../services/uploadFile';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

function* uploadFile({ payload }) {
    const { value, type } = payload;
    try {
        const data = yield call(
            uploadFileService.uploadFile,
            value
        );
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // yield call(fetchByInvestorId, { payload: payload.invId });
            yield put({
                type: UPLOADFILE.UPLOAD_FILE_SUCCESS,
                payload: { type, url: data.responseData.data }
            });
        } else {
            toastrError(toastrMessage.uploadFileError);
        }
    } catch (error) {
        toastrError(toastrMessage.uploadFileError);
    }
}



export function* uploadFileWatcher() {
    yield all([
        takeLatest(UPLOADFILE.UPLOAD_FILE, uploadFile),

        //takeLatest(FETCH_ADVISOR.FETCH_ALL_ADVISOR_CONSTANTS, advisorAllConstants),
    ]);
}
