import axios from 'axios';
import { toastrError, toastrSuccess } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

// Ensure baseURL is always HTTP
const HTTP_BASE_URL = 'http://ec2-54-91-87-30.compute-1.amazonaws.com:8080/';

export const API = axios.create({ baseURL: HTTP_BASE_URL });

// Override axios defaults to prevent HTTPS
API.defaults.baseURL = HTTP_BASE_URL;

API.interceptors.request.use(
    function (config) {
        // Always set baseURL to HTTP (prevent any HTTPS)
        config.baseURL = HTTP_BASE_URL;
        
        // Force HTTP - convert any HTTPS to HTTP in URL
        if (config.url && config.url.startsWith('https://')) {
            console.warn('⚠️ Detected HTTPS URL, converting to HTTP:', config.url);
            config.url = config.url.replace('https://', 'http://');
        }
        
        // Ensure final URL is HTTP
        if (config.url && !config.url.startsWith('http://') && !config.url.startsWith('/')) {
            config.url = HTTP_BASE_URL.replace(/\/$/, '') + config.url;
        }
        
        const token = JSON.parse(localStorage.getItem('bloomkiteBusinessUser'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log final URL for debugging
        const finalURL = (config.baseURL || HTTP_BASE_URL) + (config.url || '').replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '');
        console.log('🔗 API Request URL:', finalURL);
        
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function (response) {
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
            if (!(response && response.status == 500)) {
                toastrError(toastrMessage.somethingError);
            }
        }
        return Promise.reject(error);
    }
);
