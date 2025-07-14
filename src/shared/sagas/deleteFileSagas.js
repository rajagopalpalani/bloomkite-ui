import { takeLatest, call, all } from 'redux-saga/effects';
import { DELETEFILE } from '../actions/actionTypes';
import * as deleteFileService from '../services/deleteFile';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';

function* deleteFile({ payload }) {
    try {
        const data = yield call(
            deleteFileService.deleteFile,
            payload
        );
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            // toastrSuccess('File deleted successfully')
        } else {
            toastrError('Something went wrong. Try again');
        }
    } catch (error) {
        toastrError('Something went wrong. Try again');
    }
}



export function* deleteFileWatcher() {
    yield all([
        takeLatest(DELETEFILE.DELETE_FILE, deleteFile),
    ]);
}
