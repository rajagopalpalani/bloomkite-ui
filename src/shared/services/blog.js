import { API } from './api';
import { pageURI } from '../constants/apiAttributes';

export const fetchArticleListByPartyId = (id) => {
    return API.post(`${pageURI.fetchArticleListByPartyId}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const fetchArticlePostByArticle = (id) => {
    return API.post(`${pageURI.fetchArticlePostByArticleId}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const createArticlePost = (payload) => {
    return API.post(`${pageURI.createArticlePost}`, payload).then((response) => {
        return response.data;
    });
};

export const createArticlePostComment = (payload) => {
    return API.post(`${pageURI.createArticlePostComment}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchArticleComment = (payload) => {
    return API.post(`${pageURI.fetchArticleComment}`, payload).then((response) => {
        return response.data;
    });
};

export const createArticleVote = (payload) => {
    return API.post(`${pageURI.createArticleVote}`, payload).then((response) => {
        return response.data;
    });
};

export const changeArticleStatus = (payload) => {
    return API.put(`${pageURI.changeArticleStatus}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchArticlePost = () => {
    return API.post(`${pageURI.fetchArticlePost}`, {}).then((response) => {
        return response.data;
    });
};

export const fetchAllArticleInApprovedOrder = () => {
    return API.post(`${pageURI.fetchAllArticleInApprovedOrder}`, {}).then((response) => {
        return response.data;
    });
};

export const fetchAllForumCategory = () => {
    return API.get(`${pageURI.fetchAllForumCategory}`).then((response) => {
        return response.data;
    });
};

export const fetchRecentArticlePostList = () => {
    return API.post(`${pageURI.fetchRecentArticlePostList}`, {}).then((response) => {
        return response.data;
    });
};

export const fetchRecentApprovedArticle = () => {
    return API.post(`${pageURI.fetchRecentApprovedArticle}`, {}).then((response) => {
        return response.data;
    });
};

export const moderateArticlePost = (payload) => {
    return API.put(`${pageURI.moderateArticlePost}`, payload).then((response) => {
        return response.data;
    });
};

export const moderateArticlePostComment = (payload) => {
    return API.put(`${pageURI.moderateArticlePostComment}`, payload).then((response) => {
        return response.data;
    });
};

export const deleteArticle = (payload) => {
    return API.delete(`${pageURI.deleteArticle}`, payload).then((response) => {
        return response.data;
    });
};

export const deleteArticleComment = (payload) => {
    return API.delete(`${pageURI.deleteArticleComment}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchFavoriteArticlesByPartyId = (id) => {
    return API.post(`${pageURI.fetchFavoriteArticlesByPartyId}`, {
        id
    }).then((response) => {
        return response.data;
    });
};

export const addArticleToFavorite = (payload) => {
    return API.post(`${pageURI.addArticleToFavorite}`, payload).then((response) => {
        return response.data;
    });
};

export const fetchArticleUpCount = (id) => {
    return API.post(`${pageURI.fetchArticleUpCount}`, {
        id
    }).then((response) => {
        return response.data;
    });
};
