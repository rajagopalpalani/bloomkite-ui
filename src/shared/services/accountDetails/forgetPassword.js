import { API } from '../simpleApi';
import { pageURI } from '../../constants/apiAttributes';

export const forgetPassword = payload => {
    return API.put(`${pageURI.forgetPassword}`, payload).then(response => {
        return response.data;
    });
};