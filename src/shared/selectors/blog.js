export const blogSelector = state => ({
    advisorDetails: state.advisorReducer.advisorDetails,
    investorDetails: state.investorReducer.investorDetails,
    blogDetails: state.blogReducer.blogDetails,
    allArticlePost: state.blogReducer.allArticlePost,
    allArticleInApprovedOrder: state.blogReducer.allArticleInApprovedOrder,
    allRecentArticlePostList: state.blogReducer.allRecentArticlePostList,
    articleComment: state.blogReducer.articleComment,
    articleListByPartyId: state.blogReducer.articleListByPartyId,
    articlePostByArticleId: state.blogReducer.articlePostByArticleId,
    recentApprovedArticle: state.blogReducer.recentApprovedArticle,
    forumCategoryList: state.blogReducer.forumCategoryList,
    forumStatusList: state.blogReducer.forumStatusList,
    allForumCategory: state.blogReducer.allForumCategory,
    forumSubCategoryList: state.blogReducer.forumSubCategoryList,
    favouriteArticlesByPartyId: state.blogReducer.favouriteArticlesByPartyId,
    addArticleToFavorite: state.blogReducer.addArticleToFavorite,
    upCount: state.blogReducer.upCount
});
