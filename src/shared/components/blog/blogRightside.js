import React from 'react';
import Articles from './recentArticles/articles';
import classNames from 'classnames';

class BlogRightbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        };
    }

    handleRightChange = (index) => {
        this.setState({ currentTab: index });
    };

    render() {
        return (
            <div className="col-3 blog-leftsideoption" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="bg-white">
                    <div className="right-sidebar">
                        <ul>
                            <li className={classNames('blog-btnmenu', { active: this.state.currentTab == 1, 'no-active': this.state.currentTab != 1 })}>
                                <a onClick={() => this.handleRightChange(1)}>Recent Articles</a>
                            </li>
                            {(!this.props.investorDetails || !this.props.investorDetails.invId) && (
                                <li className={classNames('blog-btnmenu', { active: this.state.currentTab == 2, 'no-active': this.state.currentTab != 2 })}>
                                    <a onClick={() => this.handleRightChange(2)}>My Posts</a>
                                </li>
                            )}
                            <li className={classNames('blog-btnmenu', { active: this.state.currentTab == 3, 'no-active': this.state.currentTab != 3 })}>
                                <a onClick={() => this.handleRightChange(3)}>My Favorites</a>
                            </li>
                            <li className={classNames('blog-btnmenu', { active: this.state.currentTab == 4, 'no-active': this.state.currentTab != 4 })}>
                                <a onClick={() => this.handleRightChange(4)}>Approved Articles</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {this.state.currentTab == 1 && <Articles articleList={this.props.allRecentArticlePostList} handleChangeLatestPost={this.props.handleChangeLatestPost} />}
                        {this.state.currentTab == 2 && (
                            <Articles articleList={this.props.articleListByPartyId} showStatus="true" handleChangeLatestPost={this.props.handleChangeLatestPost} />
                        )}
                        {this.state.currentTab == 3 && (
                            <Articles articleList={this.props.favouriteArticleListByPartyId} handleChangeLatestPost={this.props.handleChangeLatestPost} />
                        )}
                        {this.state.currentTab == 4 && <Articles articleList={this.props.allArticleInApprovedOrder} handleChangeLatestPost={this.props.handleChangeLatestPost} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogRightbar;
