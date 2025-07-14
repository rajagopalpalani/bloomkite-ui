import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const addInvInterest = payload => {
    return API.post(`${pageURI.addInvInterest}`, payload).then(response => {
        return response.data;
    });
};


export const fetchInvestorList = () => {
    return API.get(`${pageURI.fetchInvestorList}`).then(response => {
        return response.data;
    });
};


export const fetchByInvestorId = invId => {
    return API.post(`${pageURI.fetchByInvestorId}`, {
        invId
    }).then(response => {
        return response.data;
    });
};

export const modifyInvestor = (payload) => {
    return API.put(`${pageURI.modifyInvestor}`, payload).then(response => {
        return response.data;
    });
};

export const modifyInvInterest = (payload) => {
    return API.post(`${pageURI.modifyInvInterest}`, payload).then(response => {
        return response.data;
    });
};


export const deleteInvestor = (payload) => {
    return API.delete(`${pageURI.deleteInvestor}`, payload).then(response => {
        return response.data;
    });
};

export const deleteInvInterest = (payload) => {
    return API.delete(`${pageURI.deleteInvInterest}`, payload).then(response => {
        return response.data;
    });
};


