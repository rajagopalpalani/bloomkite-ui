import { BLOG } from './actionTypes';

export const createArticlePost = (value) => ({
    type: BLOG.CREATE_ARTICLE_POST,
    payload: value
});

export const createArticlePostComment = (value) => ({
    type: BLOG.CREATE_ARTICLE_POST_COMMENT,
    payload: value
});

export const fetchArticleComment = (value) => ({
    type: BLOG.FETCH_ARTICLE_COMMENT,
    payload: value
});

export const fetchArticleListByPartyId = (value) => ({
    type: BLOG.FETCH_ARTICLE_LIST_BY_PARTY_ID,
    payload: value
});

export const fetchArticlePostByArticle = (value) => ({
    type: BLOG.FETCH_ARTICLE_POST_BY_ARTICLE,
    payload: value
});

export const createArticleVote = (value) => ({
    type: BLOG.CREATE_ARTICLE_VOTE,
    payload: value
});

export const changeArticleStatus = (value) => ({
    type: BLOG.CHANGE_ARTICLE_STATUS,
    payload: value
});

export const fetchArticlePost = () => ({
    type: BLOG.FETCH_ARTICLE_POST
});

export const fetchAllArticleInApprovedOrder = () => ({
    type: BLOG.FETCH_ALL_ARTICLE_IN_APPROVED_ORDER
});

export const fetchAllForumCategory = () => ({
    type: BLOG.FETCH_ALL_FORUM_CATEGORY
});

export const fetchRecentArticlePostList = () => ({
    type: BLOG.FETCH_RECENT_ARTICLE_POST_LIST
});

export const fetchRecentApprovedArticle = () => ({
    type: BLOG.FECTH_RECENT_APPROVED_ARTICLE
});

export const moderateArticlePost = (value) => ({
    type: BLOG.MODERATE_ARTICLE_POST,
    payload: value
});

export const moderateArticlePostComment = (value) => ({
    type: BLOG.MODERATE_ARTICLE_POST_COMMENT,
    payload: value
});

export const deleteArticle = (value) => ({
    type: BLOG.DELETE_ARTICLE,
    payload: value
});

export const deleteArticleComment = (value) => ({
    type: BLOG.DELETE_ARTICLE_COMMENT,
    payload: value
});

export const fetchFavoriteArticlesByPartyId = (value) => ({
    type: BLOG.FETCH_FAVOURITE_ARTICLES_BY_PARTY_ID,
    payload: value
});

export const addArticleToFavorite = (value) => ({
    type: BLOG.ADD_ARTICLE_TO_FAVORITE,
    payload: value
});
export const fetchArticleUpCount = (value) => ({
    type: BLOG.FETCH_ARTICLE_UPCOUNT,
    payload: value
});
