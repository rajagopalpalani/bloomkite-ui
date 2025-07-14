import React from 'react';

const Articles = (props) => {
    return (
        <div className="recentArticle">
            {props.articleList &&
                props.articleList.length > 0 &&
                props.articleList.map(({ content, designation, updated, imagePath, articleStatus, forumStatus }, i) => {
                    return (
                        <div id="myChange1" key={i}>
                            <img src={imagePath} height="50px" width="50px" />
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
                            <h3>
                                <a className="recent-link" id="title-link-1">
                                    {content.substr(0, 100)}
                                </a>
                                <article className="article-pub" id="publish-1">
                                    {updated.substr(0, 10)}
                                </article>
                            </h3>
                            {props.showStatus && (
                                <React.Fragment>
                                    <div className="status-blog">
                                        Status : <span>{forumStatus}</span>
                                    </div>
                                    <div className="display-blog">
                                        Display : <span>{articleStatus}</span>
                                    </div>
                                </React.Fragment>
                            )}
                            <div className="blog-post-border"></div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Articles;
