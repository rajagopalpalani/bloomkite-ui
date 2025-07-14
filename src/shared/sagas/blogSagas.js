import { put, takeLatest, call, all } from 'redux-saga/effects';

import { BLOG } from '../actions/actionTypes';
import * as blogService from '../services/blog';
import { toastrError } from '../helpers/toastrHelper';
import { toastrMessage } from '../constants/toastrMessage';

function* createArticlePost({ payload }) {
    try {
        const data = yield call(blogService.createArticlePost, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.CREATE_ARTICLE_POST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.createArticleError);
        }
    } catch (error) {
        toastrError(toastrMessage.createArticleError);
    }
}

function* createArticlePostComment({ payload }) {
    try {
        const data = yield call(blogService.createArticlePostComment, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.CREATE_ARTICLE_POST_COMMENT_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.createArticleCommentError);
        }
    } catch (error) {
        toastrError(toastrMessage.createArticleCommentError);
    }
}

function* fetchArticleComment({ payload }) {
    try {
        const data = yield call(blogService.fetchArticleComment, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ARTICLE_COMMENT_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.articleCommentError);
        }
    } catch (error) {
        toastrError(toastrMessage.articleCommentError);
    }
}

function* fetchArticleListByPartyId({ payload }) {
    try {
        const data = yield call(blogService.fetchArticleListByPartyId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ARTICLE_LIST_BY_PARTY_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.articleListByPartyError);
        }
    } catch (error) {
        toastrError(toastrMessage.articleListByPartyError);
    }
}

function* fetchArticlePostByArticle({ payload }) {
    try {
        const data = yield call(blogService.fetchArticlePostByArticle, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ARTICLE_POST_BY_ARTICLE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.articlePostByArticleError);
        }
    } catch (error) {
        toastrError(toastrMessage.articlePostByArticleError);
    }
}

function* createArticleVote({ payload }) {
    try {
        const data = yield call(blogService.createArticleVote, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.CREATE_ARTICLE_VOTE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.createArticleVoteError);
        }
    } catch (error) {
        toastrError(toastrMessage.createArticleVoteError);
    }
}

function* changeArticleStatus({ payload }) {
    try {
        const data = yield call(blogService.changeArticleStatus, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.CHANGE_ARTICLE_STATUS_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.changeArticleStatusError);
        }
    } catch (error) {
        toastrError(toastrMessage.changeArticleStatusError);
    }
}

function* fetchArticlePost() {
    try {
        const data = yield call(blogService.fetchArticlePost);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ARTICLE_POST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.articlePostError);
        }
    } catch (error) {
        toastrError(toastrMessage.articlePostError);
    }
}

function* fetchAllArticleInApprovedOrder() {
    try {
        const data = yield call(blogService.fetchAllArticleInApprovedOrder);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ALL_ARTICLE_IN_APPROVED_ORDER_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.inApprovedOrderError);
        }
    } catch (error) {
        toastrError(toastrMessage.inApprovedOrderError);
    }
}

function* fetchAllForumCategory() {
    try {
        const data = yield call(blogService.fetchAllForumCategory);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ALL_FORUM_CATEGORY_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.allForumCategoryError);
        }
    } catch (error) {
        toastrError(toastrMessage.allForumCategoryError);
    }
}

function* fetchRecentArticlePostList() {
    try {
        const data = yield call(blogService.fetchRecentArticlePostList);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_RECENT_ARTICLE_POST_LIST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.recentArticlePostListError);
        }
    } catch (error) {
        toastrError(toastrMessage.recentArticlePostListError);
    }
}

function* fetchRecentApprovedArticle() {
    try {
        const data = yield call(blogService.fetchRecentApprovedArticle);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FECTH_RECENT_APPROVED_ARTICLE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.recentApprovedArticleError);
        }
    } catch (error) {
        toastrError(toastrMessage.recentApprovedArticleError);
    }
}

function* moderateArticlePost({ payload }) {
    try {
        const data = yield call(blogService.moderateArticlePost, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.MODERATE_ARTICLE_POST_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.moderateArticlePostError);
        }
    } catch (error) {
        toastrError(toastrMessage.moderateArticlePostError);
    }
}

function* moderateArticlePostComment({ payload }) {
    try {
        const data = yield call(blogService.moderateArticlePostComment, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.MODERATE_ARTICLE_POST_COMMENT_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.moderateArticleCommentError);
        }
    } catch (error) {
        toastrError(toastrMessage.moderateArticleCommentError);
    }
}

function* deleteArticle({ payload }) {
    try {
        const data = yield call(blogService.deleteArticle, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.DELETE_ARTICLE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.deleteArticleError);
        }
    } catch (error) {
        toastrError(toastrMessage.deleteArticleError);
    }
}

function* deleteArticleComment({ payload }) {
    try {
        const data = yield call(blogService.deleteArticleComment, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.DELETE_ARTICLE_COMMENT_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.deleteArticleCommentError);
        }
    } catch (error) {
        toastrError(toastrMessage.deleteArticleCommentError);
    }
}

function* fetchFavouriteArticlesByPartyId({ payload }) {
    try {
        const data = yield call(blogService.fetchFavoriteArticlesByPartyId, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_FAVOURITE_ARTICLES_BY_PARTY_ID_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.articleListByPartyError);
        }
    } catch (error) {
        toastrError(toastrMessage.articleListByPartyError);
    }
}

function* addArticleToFavorite({ payload }) {
    try {
        const data = yield call(blogService.addArticleToFavorite, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.ADD_ARTICLE_TO_FAVORITE_SUCCESS,
                payload: data.responseData.data
            });
        } else {
            toastrError(toastrMessage.addArticleToFavoriteError);
        }
    } catch (error) {
        toastrError(toastrMessage.addArticleToFavoriteError);
    }
}

function* fetchArticleUpCount({ payload }) {
    try {
        const data = yield call(blogService.fetchArticleUpCount, payload);
        if (data && data.responseMessage && data.responseMessage.responseCode === 6000) {
            yield put({
                type: BLOG.FETCH_ARTICLE_UPCOUNT_SUCCESS,
                payload: data.responseData.data
            });
        }
    } catch (error) {
        toastrError(toastrMessage.somethingError);
    }
}

export function* blogWatcher() {
    yield all([
        takeLatest(BLOG.CREATE_ARTICLE_POST, createArticlePost),
        takeLatest(BLOG.CREATE_ARTICLE_POST_COMMENT, createArticlePostComment),
        takeLatest(BLOG.FETCH_ARTICLE_COMMENT, fetchArticleComment),
        takeLatest(BLOG.FETCH_ARTICLE_LIST_BY_PARTY_ID, fetchArticleListByPartyId),
        takeLatest(BLOG.FETCH_ARTICLE_POST_BY_ARTICLE, fetchArticlePostByArticle),
        takeLatest(BLOG.CREATE_ARTICLE_VOTE, createArticleVote),
        takeLatest(BLOG.CHANGE_ARTICLE_STATUS, changeArticleStatus),
        takeLatest(BLOG.FETCH_ARTICLE_POST, fetchArticlePost),
        takeLatest(BLOG.FETCH_ALL_ARTICLE_IN_APPROVED_ORDER, fetchAllArticleInApprovedOrder),
        takeLatest(BLOG.FETCH_ALL_FORUM_CATEGORY, fetchAllForumCategory),
        takeLatest(BLOG.FETCH_RECENT_ARTICLE_POST_LIST, fetchRecentArticlePostList),
        takeLatest(BLOG.FECTH_RECENT_APPROVED_ARTICLE, fetchRecentApprovedArticle),
        takeLatest(BLOG.MODERATE_ARTICLE_POST, moderateArticlePost),
        takeLatest(BLOG.MODERATE_ARTICLE_POST_COMMENT, moderateArticlePostComment),
        takeLatest(BLOG.DELETE_ARTICLE, deleteArticle),
        takeLatest(BLOG.DELETE_ARTICLE_COMMENT, deleteArticleComment),
        takeLatest(BLOG.FETCH_FAVOURITE_ARTICLES_BY_PARTY_ID, fetchFavouriteArticlesByPartyId),
        takeLatest(BLOG.ADD_ARTICLE_TO_FAVORITE, addArticleToFavorite),
        takeLatest(BLOG.FETCH_ARTICLE_UPCOUNT, fetchArticleUpCount)
    ]);
}
