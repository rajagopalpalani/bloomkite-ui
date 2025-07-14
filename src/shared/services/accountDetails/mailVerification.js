import { API } from '../simpleApi';
import { pageURI } from '../../constants/apiAttributes';

export const verifySignup = ({ payload }) => {
    return API.get(`${pageURI.verifySignup}?key=${payload}`).then(response => {
        return response.data;
    });
};




