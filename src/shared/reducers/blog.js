import { BLOG } from '../actions/actionTypes';
import { fromJS } from 'immutable';

const blogState = fromJS({
    blogDetails: {},
    allArticlePost: [],
    allArticleInApprovedOrder: [],
    allRecentArticlePostList: [],
    articleComment: [],
    articleListByPartyId: [],
    articlePostByArticleId: [],
    recentApprovedArticle: [],
    forumCategoryList: [],
    allForumCategory: [],
    forumStatusList: [],
    forumSubCategoryList: [],
    favouriteArticlesByPartyId: [],
    addArticleToFavorite: [],
    upCount: 0
});

export const blogReducer = function (state = blogState, action) {
    switch (action.type) {
        case BLOG.FETCH_ALL_FORUM_CATEGORY_SUCCESS: {
            return {
                ...state,
                allForumCategory: action.payload
            };
        }
        case BLOG.FETCH_ARTICLE_POST_SUCCESS: {
            return {
                ...state,
                allArticlePost: action.payload
            };
        }
        case BLOG.FETCH_ALL_ARTICLE_IN_APPROVED_ORDER_SUCCESS: {
            return {
                ...state,
                allArticleInApprovedOrder: action.payload.articlePostList
            };
        }
        case BLOG.FETCH_RECENT_ARTICLE_POST_LIST_SUCCESS: {
            return {
                ...state,
                allRecentArticlePostList: action.payload.articlePostList
            };
        }
        case BLOG.FETCH_ARTICLE_COMMENT_SUCCESS: {
            return {
                ...state,
                articleComment: action.payload
            };
        }
        case BLOG.FETCH_ARTICLE_LIST_BY_PARTY_ID_SUCCESS: {
            return {
                ...state,
                articleListByPartyId: action.payload.articlePostList
            };
        }
        case BLOG.FETCH_ARTICLE_POST_BY_ARTICLE_SUCCESS: {
            return {
                ...state,
                articlePostByArticleId: action.payload
            };
        }
        case BLOG.FECTH_RECENT_APPROVED_ARTICLE_SUCCESS: {
            return {
                ...state,
                recentApprovedArticle: action.payload
            };
        }
        case BLOG.FETCH_FAVOURITE_ARTICLES_BY_PARTY_ID_SUCCESS: {
            return {
                ...state,
                favouriteArticlesByPartyId: action.payload.articlePostList
            };
        }
        case BLOG.ADD_ARTICLE_TO_FAVORITE_SUCCESS: {
            return {
                ...state,
                addArticleToFavorite: action.payload
            };
        }
        case BLOG.FETCH_ARTICLE_UPCOUNT_SUCCESS: {
            return {
                ...state,
                upCount: action.payload.upCount
            };
        }
        default:
            return state;
    }
};
