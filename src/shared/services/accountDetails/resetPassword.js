import { API } from '../api';
import { pageURI } from '../../constants/apiAttributes';

export const resetPassword = payload => {
    return API.post(`${pageURI.resetPassword}?key=${payload.key}`, payload.options).then(response => {
        return response.data;
    });
};