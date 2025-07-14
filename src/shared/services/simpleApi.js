import axios from 'axios';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

export const API = axios.create({ baseURL: 'https://api-prod.bloomkite.com/app/' });

API.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function (response) {
        if (response.status == 200) {
            return response;
        }
        if (response.data && response.data.responseMessage && response.data.responseMessage.responseCode < 6000) {
            toastrError(toastrMessage.somethingError);
            return Promise.reject(null);
        }
        if (response.config.method === 'post') {
            if (response.data.responseMessage.responseDescription !== 'Success') {
                toastrSuccess(response.data.responseMessage.responseDescription);
            }
        }
        if (response.config.method === 'put') {
            toastrSuccess(response.data.responseMessage.responseDescription);
        }
        return response;
    },
    function (error) {
        let { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
            // logout here
            toastrError(toastrMessage.expireError);
            // localStorage.clear();
            // window.location.href = window.location.origin;
        } else {
            if (response.data.responseMessage.responseDescription) {
                toastrError(response.data.responseMessage.responseDescription);
            } else {
                toastrError(toastrMessage.somethingError);
            }
        }
        return Promise.reject(error);
    }
);
