import { LOGIN, UPLOADFILE, } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const uploadFileState = fromJS({
    uploadFileDetails: {},    
})

export const uploadFileReducer = function (state = uploadFileState, action) {
    switch (action.type) {
        case UPLOADFILE.UPLOAD_FILE_SUCCESS: {
            return {
                ...state,
                uploadFileDetails: action.payload
            };
        }
        case UPLOADFILE.CLEAR_IMAGE: {
            return {
                ...state,
                uploadFileDetails: {},
            };
        }
        default:
            return state;
    }
};
