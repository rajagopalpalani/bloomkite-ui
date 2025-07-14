import React from 'react';
import BlogHeader from '../blogHeader';
import BlogLeftbar from '../blogLeftside';
import BlogRightbar from '../blogRightside';
import CreateBlog from '../createBlog/createBlog';
import Comment from '../createBlog/comment';
import FontIcon from '../../common/fontAwesomeIcon';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ShowBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogcontent: true,
            trigger: false,
            id: 0,
            subId: 0,
            latestPost: this.props.allRecentArticlePostList && this.props.allRecentArticlePostList[0]
        };
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.userDetails) != JSON.stringify(oldProps.userDetails)) {
            this.setState({ redirect: true });
        }
        if (JSON.stringify(this.props.allRecentArticlePostList) != JSON.stringify(oldProps.allRecentArticlePostList)) {
            if (this.props.allRecentArticlePostList && this.props.allRecentArticlePostList.length > 0) {
                this.setState({ latestPost: this.props.allRecentArticlePostList[0] });
                this.props.fetchArticleComment({
                    id: this.props.allRecentArticlePostList[0].articleId
                });
                this.props.fetchArticleUpCount(this.props.allRecentArticlePostList[0].articleId);
            }
        }
    }

    componentDidMount() {
        if (this.props.allRecentArticlePostList && this.props.allRecentArticlePostList.length > 0) {
            this.props.fetchArticleComment({ id: this.props.allRecentArticlePostList[0].articleId });
            this.props.fetchArticleUpCount(this.props.allRecentArticlePostList[0].articleId);
        }
    }

    handleTabChange = (id, subId) => {
        this.setState({ id, subId });
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.calculateCostHire();
        });
    }

    handleCreatepost = (isblogcontent) => {
        this.setState({ blogcontent: isblogcontent });
    };

    handleClick = (selectedPerson) => {
        this.setState({
            person: selectedPerson
        });
    };

    handleRightChange = (index) => {
        this.setState({ currentTab: index });
    };

    triggerComments = (articleId) => {
        if (!this.state.trigger) {
            if (articleId) {
                this.props.fetchArticleComment({ id: articleId });
                this.props.fetchArticleUpCount(articleId);
                this.setState({ trigger: true });
            }
        }
    };

    addArticleToFavorite = () => {
        let options = {
            articleId: this.state.latestPost.articleId,
            partyId: this.props.partyId
        };
        this.props.addArticleToFavorite(options);
        setTimeout(() => {
            this.props.fetchFavoriteArticlesByPartyId(this.props.partyId);
        }, 1000);
    };

    createArticleVote = () => {
        let options = {
            articleId: this.state.latestPost.articleId,
            partyId: this.props.partyId,
            voteType: 1
        };
        this.props.createArticleVote(options);
        setTimeout(() => {
            this.props.fetchArticleUpCount(this.state.latestPost.articleId);
        }, 1000);
    };

    handleTextBoxClose = () => {
        this.setState({ blogcontent: true });
    };

    handleChangeLatestPost = (article) => {
        this.setState({ latestPost: article, trigger: !this.state.trigger, blogcontent: true });
    };

    render() {
        let articles, myPosts, favPosts, approvedArticles;
        if (this.state.latestPost && this.state.latestPost.articleId) {
            this.triggerComments(this.state.latestPost.articleId);
        }
        if (this.state.id !== 0) {
            if (this.state.id !== 0 && (!this.state.subId || this.state.subId == 0)) {
                articles = this.props.allRecentArticlePostList && this.props.allRecentArticlePostList.filter((item) => item.forumCategoryId == this.state.id);
                approvedArticles = this.props.allArticleInApprovedOrder && this.props.allArticleInApprovedOrder.filter((item) => item.forumCategoryId == this.state.id);
                myPosts = this.props.articleListByPartyId && this.props.articleListByPartyId.filter((item) => item.forumCategoryId == this.state.id);
                favPosts = this.props.favouriteArticleListByPartyId && this.props.favouriteArticleListByPartyId.filter((item) => item.forumCategoryId == this.state.id);
            } else {
                articles =
                    this.props.allRecentArticlePostList &&
                    this.props.allRecentArticlePostList.filter((item) => item.forumCategoryId == this.state.id && item.forumSubCategoryId == this.state.subId);
                approvedArticles =
                    this.props.allArticleInApprovedOrder &&
                    this.props.allArticleInApprovedOrder.filter((item) => item.forumCategoryId == this.state.id && item.forumSubCategoryId == this.state.subId);
                myPosts =
                    this.props.articleListByPartyId &&
                    this.props.articleListByPartyId.filter((item) => item.forumCategoryId == this.state.id && item.forumSubCategoryId == this.state.subId);
                favPosts =
                    this.props.favouriteArticleListByPartyId &&
                    this.props.favouriteArticleListByPartyId.filter((item) => item.forumCategoryId == this.state.id && item.forumSubCategoryId == this.state.subId);
            }
        } else {
            articles = this.props.allRecentArticlePostList;
            approvedArticles = this.props.allArticleInApprovedOrder;
            myPosts = this.props.articleListByPartyId;
            favPosts = this.props.favouriteArticleListByPartyId;
        }
        return (
            <div>
                <div className="col-lg-12">
                    <BlogHeader handleCreatepost={this.handleCreatepost} investorDetails={this.props.investorDetails} />
                </div>
                <div className="row col-lg-12">
                    <BlogLeftbar handleTabChange={this.handleTabChange} allForumCategory={this.props.allForumCategory} currentTab={this.state.currentTab} />
                    <div className="col-10">
                        <div className="planning-center row" style={{ paddingRight: '0px' }}>
                            <div className="col-7 bg-white">
                                {/* {this.state.person && */}
                                <div className="bg-white BLog-Align">
                                    <div id="myChange">
                                        {this.state.blogcontent && (
                                            <div>
                                                <div className="Insurance-bor">
                                                    <table className="Insurance-Tab">
                                                        <tbody>
                                                            <tr>
                                                                <th className="advisor-name" id="advisor-name">
                                                                    {this.props.fullName}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th className="advisor-post" id="invest-post">
                                                                    {this.props.designation}
                                                                </th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table className="Follow-list">
                                                        <tbody>
                                                            <tr>
                                                                <td id="follower-list"></td>
                                                                <td id="article-list"></td>
                                                                <td id="ans"></td>
                                                            </tr>
                                                            <tr className="Follow-Sublist">
                                                                <td id="follower-count"></td>
                                                                <td id="article-count"></td>
                                                                <td id="ans-count"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {this.state.latestPost && (
                                                    <div>
                                                        <h3>
                                                            <a id="title-link" href="#baskar" onClick={() => this.handleClick(person)}></a>
                                                            <article className="article-pub" id="publish">
                                                                {this.state.latestPost.name}
                                                            </article>
                                                        </h3>
                                                        <h3>
                                                            <a id="title-link" href="#baskar" onClick={() => this.handleClick(person)}></a>
                                                            <article className="article-pub" id="publish">
                                                                {this.state.latestPost.designation}
                                                            </article>
                                                        </h3>
                                                        <h3>
                                                            <a id="title-link" href="#baskar" onClick={() => this.handleClick(person)}></a>
                                                            <article className="article-pub" id="publish">
                                                                {this.state.latestPost.updated}
                                                            </article>
                                                        </h3>

                                                        {this.state.latestPost.content && (
                                                            <div
                                                                className="latest-content"
                                                                id="page-content"
                                                                dangerouslySetInnerHTML={{ __html: this.state.latestPost.content }}></div>
                                                        )}
                                                        <br />
                                                        <br />

                                                        <div>
                                                            <button id="cmt" className="Insurance-cmt">
                                                                comments
                                                            </button>
                                                            <button className="Share-btn">
                                                                <img src="images\share.svg" alt="share" height="15px" width="15px" />
                                                                Share
                                                            </button>
                                                            {this.state.latestPost && this.state.latestPost.partyId != this.props.partyId && (
                                                                <button className="add-fav" onClick={() => this.addArticleToFavorite()}>
                                                                    <img src="images\fav.png" alt="favorite" height="19px" width="19px" />
                                                                    Add to Favorite
                                                                </button>
                                                            )}
                                                            <button className="add-fav" onClick={() => this.createArticleVote()}>
                                                                Like
                                                                <img src="images\like.jpg" alt="like" height="23px" width="23px" />
                                                                {`${this.props.upCount} `}likes
                                                            </button>
                                                            <br />
                                                            <br />
                                                        </div>
                                                        <Comment
                                                            articleId={this.state.latestPost.articleId}
                                                            partyId={this.props.partyId}
                                                            createArticlePostComment={this.props.createArticlePostComment}
                                                            articleComment={this.props.articleComment}
                                                            fetchArticleComment={this.props.fetchArticleComment}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {!this.state.blogcontent && (
                                            <div>
                                                <a onClick={this.handleTextBoxClose}>
                                                    <FontIcon icon={faChevronLeft} /> Back to Article
                                                </a>
                                                <CreateBlog
                                                    post={'POST'}
                                                    partyId={this.props.partyId}
                                                    categoryList={this.props.allForumCategory}
                                                    pension={'pension'}
                                                    createArticlePost={this.props.createArticlePost}
                                                    fetchArticleListByPartyId={this.props.fetchArticleListByPartyId}
                                                    fetchRecentArticlePostList={this.props.fetchRecentArticlePostList}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-5 bg-white" style={{ padding: '0px' }}>
                                <BlogRightbar
                                    allRecentArticlePostList={articles}
                                    allArticleInApprovedOrder={approvedArticles}
                                    articleListByPartyId={myPosts}
                                    favouriteArticleListByPartyId={favPosts}
                                    handleChangeLatestPost={this.handleChangeLatestPost}
                                    investorDetails={this.props.investorDetails}
                                    advisorDetails={this.props.advisorDetails}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowBlog;
