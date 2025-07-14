import React from 'react';

const RecentArticle = (props) => {
    return (
        <div className="recentArticle">
            {props.allRecentArticlePostList &&
                props.allRecentArticlePostList.length > 0 &&
                props.allRecentArticlePostList.map(({ content, designation, updated, imagePath }, i) => {
                    return (
                        <div id="myChange1" key={i}>
                            <span>
                                <img className="profile-image" src={imagePath} height="50px" width="50px" alt="/images/avatar.png" />
                            </span>
                            <span>
                                <table className="insurance-tab">
                                    <tbody>
                                        <tr>
                                            <th className="advisor-name" id="advisor-name-1">
                                                {designation}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="advisor-post" id="invest-post-1"></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                            <h3>
                                <a className="recent-link" id="title-link-1">
                                    {content.substr(0, 100)}
                                </a>
                                <article className="article-pub" id="publish-1">
                                    {updated.substr(0, 10)}
                                </article>
                            </h3>
                            <div className="blog-post-border"></div>
                        </div>
                    );
                })}
        </div>
    );
};
export default RecentArticle;
