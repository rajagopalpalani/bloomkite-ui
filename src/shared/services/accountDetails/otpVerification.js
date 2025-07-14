import { API } from '../simpleApi';
import { pageURI } from '../../constants/apiAttributes';

export const verifyOtp = payload => {
    return API.post(`${pageURI.verifyOtp}`, payload).then(response => {
        return response.data;
    });
};