import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const deleteFile = payload => {
    const url = `${pageURI.deleteFile}?fileName=${payload}`;
    return API.post(url).then(response => {
        return response.data;
    });
};






