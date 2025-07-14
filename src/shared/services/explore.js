import { API } from './api';
import { pageURI } from '../constants/apiAttributes';
import { serialize } from '../utils/queryParams';

export const exploreByUser = (payload) => {
    const queryParams = serialize(payload);
    return API.post(`${pageURI.exploreAdvisor}${queryParams}`, {}).then((response) => {
        return response.data;
    });
};

export const exploreByUserWithoutLogin = (payload) => {
    const queryParams = serialize(payload);
    return API.post(`${pageURI.exploreAdvisorWithoutToken}${queryParams}`, {}).then((response) => {
        return response.data;
    });
};

export const exploreAdvisorByProducts = (payload) => {
    const queryParams = serialize(payload);
    return API.post(`${pageURI.exploreAdvisorByProduct}${queryParams}`, {}).then((response) => {
        return response.data;
    });
};

export const exploreAdvisorByProductsWithoutLogin = (payload) => {
    const queryParams = serialize(payload);
    return API.post(`${pageURI.exploreAdvisorByProductWithOutToken}${queryParams}`, {}).then((response) => {
        return response.data;
    });
};
