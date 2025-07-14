import { API } from '../../services/api';
import { pageURI } from '../../constants/apiAttributes';

export const fetchAdvisor = payload => {
    return API.post(`${pageURI.fetchByAdvisorID}`, payload).then(response => response.data);
};


export const fetchChatRequest = payload => {
    return API.post(`${pageURI.fetchRequestedChat}`, payload).then(response => response.data);
};

export const approveRequest = payload => {
    return API.put(`${pageURI.approveChat}`, payload).then(response => response.data);
};

export const fetchAllChats = payload => {
    return API.post(`${pageURI.fetchAllApprovedChatUser}`, payload).then(response => response.data);
};

export const blockChat = payload => {
    return API.put(`${pageURI.blockChat}`, payload).then(response => response.data);
};

export const chatRequest = payload => {
    return API.post(`${pageURI.addChat}`, payload).then(response => response.data);
};
