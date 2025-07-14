import { API } from '../../services/api';
import { pageURI } from '../../constants/apiAttributes';

export const fetchFollowersRequest = payload => {
    return API.post(`${pageURI.fetchFollowersRequest}`, payload).then(response => response.data);
};

export const fetchFollowers = payload => {
    return API.post(`${pageURI.fetchFollowers}`, payload).then(response => response.data);
};

export const followRequest = payload => {
    return API.post(`${pageURI.addFollowers}`, payload).then(response => response.data);
};

export const blockUser = payload => {
    return API.put(`${pageURI.blockFollowers}`, payload).then(response => response.data);
};

export const unFollow = payload => {
    return API.put(`${pageURI.unFollow}`, payload).then(response => response.data);
};

export const approveFollower = payload => {
    return API.post(`${pageURI.approveFollower}`, payload).then(response => response.data);
};
