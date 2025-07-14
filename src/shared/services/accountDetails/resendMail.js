import { API } from '../simpleApi';
import { pageURI } from '../../constants/apiAttributes';

export const resendMail = payload => {
    return API.post(`${pageURI.resendMail}`, payload).then(response => {
        return response.data;
    });
};