import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const uploadFile = payload => {
    const formData = new FormData();
    formData.append('file', payload);
    return API.post(`${pageURI.uploadFile}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data;
    });
};






