import React, { Component } from 'react';
import ShowBlog from '../../components/blog/showBlog/showBlog';
import CreateBlog from '../../components/blog/createBlog/createBlog';
import Loader from '../../components/common/loader';
import { connect } from 'react-redux';
import {
    changeArticleStatus,
    fetchArticlePost,
    fetchArticleComment,
    fetchAllArticleInApprovedOrder,
    fetchAllForumCategory,
    fetchRecentArticlePostList,
    fetchRecentApprovedArticle,
    fetchArticleListByPartyId,
    moderateArticlePost,
    moderateArticlePostComment,
    createArticlePost,
    createArticlePostComment,
    fetchFavoriteArticlesByPartyId,
    addArticleToFavorite,
    createArticleVote,
    fetchArticleUpCount
} from '../../actions/blog';
import { fetchByAdvisorID } from '../../actions/advisor';
import { fetchByInvestorId } from '../../actions/investor';
import { blogSelector } from '../../selectors/blog';
import RecentArticle from '../../components/blog/recentArticles/recentArticles';
import MyPost from '../../components/blog/recentArticles/myPost';
import MyFavorite from '../../components/blog/recentArticles/myFav';

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRole: '',
            name: '',
            currentTab: 1,
            blogDetails: {},
            advisorDetails: {},
            allForumCategory: [],
            allRecentArticlePostList: [],
            articleListByPartyId: [],
            articleComment: {},
            investorDetails: {},
            allArticleInApprovedOrder: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    };

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    onFromDate = (day) => {
        this.setState({ fromDate: day });
    };

    onToDate = (day) => {
        this.setState({ toDate: day });
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.calculateCostHire();
        });
    }

    handleCampaignChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.getAllTasksByCampaign();
        });
    };

    handleProfileChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            //this.getDashboardUserBased();
        });
    };

    handleFunnelChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.getDashboardFunnel(this.state.token);
        });
    };

    componentDidMount() {
        let self = this;
        const { roleBasedId, partyId, roleId } = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        let currentRole = window.localStorage && window.localStorage.getItem('ROLE');
        let username = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        let token = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteBusinessUser'));
        this.setState({ partyId: username.partyId });
        this.props.fetchByAdvisorID(username.advId);
        this.props.fetchByInvestorId(username.advId);
        this.props.fetchArticlePost();
        this.props.fetchAllArticleInApprovedOrder();
        this.props.fetchAllForumCategory();
        this.props.fetchRecentArticlePostList();
        this.props.fetchRecentApprovedArticle();
        this.props.fetchArticleListByPartyId(username.partyId);
        this.props.fetchFavoriteArticlesByPartyId(username.partyId);
        this.setState({ currentRole: roleId });
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.blogDetails) != JSON.stringify(oldProps.blogDetails)) {
            this.setState({
                blogDetails: this.props.blogDetails,
                allRecentArticlePostList: this.props.allRecentArticlePostList
            });
        }
        if (JSON.stringify(this.props.allForumCategory) != JSON.stringify(oldProps.allForumCategory)) {
            this.setState({ allForumCategory: this.props.allForumCategory });
        }
        if (JSON.stringify(this.props.allRecentArticlePostList) != JSON.stringify(oldProps.allRecentArticlePostList)) {
            this.setState({
                allRecentArticlePostList: this.props.allRecentArticlePostList
            });
        }
        if (JSON.stringify(this.props.allArticleInApprovedOrder) != JSON.stringify(oldProps.allArticleInApprovedOrder)) {
            this.setState({
                allArticleInApprovedOrder: this.props.allArticleInApprovedOrder
            });
        }
        if (JSON.stringify(this.props.articleListByPartyId) != JSON.stringify(oldProps.articleListByPartyId)) {
            this.setState({
                articleListByPartyId: this.props.articleListByPartyId
            });
        }
        if (JSON.stringify(this.props.articleComment) != JSON.stringify(oldProps.articleComment)) {
            this.setState({ articleComment: this.props.articleComment });
        }
        if (JSON.stringify(this.props.advisorDetails) != JSON.stringify(oldProps.advisorDetails)) {
            this.setState({ advisorDetails: this.props.advisorDetails });
        }
        if (JSON.stringify(this.props.investorDetails) != JSON.stringify(oldProps.investorDetails)) {
            this.setState({ investorDetails: this.props.investorDetails });
        }
    }

    createArticlePostComment = (options) => {
        this.props.createArticlePostComment(options);
    };

    createArticlePost = (options) => {
        this.props.createArticlePost(options);
    };

    render() {
        return (
            <div>
                <ShowBlog
                    articleComment={this.props.articleComment}
                    blogDetails={this.state.blogDetails}
                    articleId={this.state.articleId}
                    partyId={this.state.partyId}
                    allForumCategory={this.props.allForumCategory}
                    allRecentArticlePostList={this.props.allRecentArticlePostList}
                    allArticleInApprovedOrder={this.props.allArticleInApprovedOrder}
                    articleListByPartyId={this.props.articleListByPartyId}
                    createArticlePost={this.createArticlePost}
                    createArticlePostComment={this.createArticlePostComment}
                    fetchArticleComment={this.props.fetchArticleComment}
                    favouriteArticleListByPartyId={this.props.favouriteArticlesByPartyId}
                    fetchFavoriteArticlesByPartyId={this.props.fetchFavoriteArticlesByPartyId}
                    fetchArticleListByPartyId={this.props.fetchArticleListByPartyId}
                    fetchRecentArticlePostList={this.props.fetchRecentArticlePostList}
                    fetchAllArticleInApprovedOrder={this.props.fetchAllArticleInApprovedOrder}
                    investorDetails={this.props.investorDetails}
                    advisorDetails={this.props.advisorDetails}
                    addArticleToFavorite={this.props.addArticleToFavorite}
                    createArticleVote={this.props.createArticleVote}
                    fetchArticleUpCount={this.props.fetchArticleUpCount}
                    upCount={this.props.upCount}
                />
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => blogSelector(state);

export default connect(mapStateToProps, {
    changeArticleStatus,
    fetchArticlePost,
    fetchArticleComment,
    fetchAllArticleInApprovedOrder,
    fetchAllForumCategory,
    fetchRecentArticlePostList,
    fetchRecentApprovedArticle,
    moderateArticlePost,
    moderateArticlePostComment,
    createArticlePost,
    createArticlePostComment,
    fetchArticleListByPartyId,
    fetchByAdvisorID,
    fetchFavoriteArticlesByPartyId,
    fetchByInvestorId,
    addArticleToFavorite,
    createArticleVote,
    fetchArticleUpCount
})(Blog);
