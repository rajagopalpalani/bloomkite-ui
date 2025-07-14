import { API } from '../simpleApi';
import { pageURI } from '../../constants/apiAttributes';

export const sendOtp = payload => {
    return API.post(`${pageURI.sendOtp}`, payload).then(response => {
        return response.data;
    });
};