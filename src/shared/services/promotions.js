import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const addPromotions = payload => {
    return API.post(`${pageURI.addPromotion}`, payload).then(response => {
        return response.data;
    });
};

