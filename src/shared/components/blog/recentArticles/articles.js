import React from 'react';

const Articles = (props) => {
    return (
        <div className="recentArticle">
            {props.articleList &&
                props.articleList.length > 0 &&
                props.articleList.map((article, i) => {
                    return (
                        <div id="myChange1" key={i}>
                            <span>
                                <img src={article.imagePath ? article.imagePath : "/images/avatar.png"} height="50px" width="50px" alt="/images/avatar.png" />
                            </span>
                            <span>
                                <table className="insurance-tab">
                                    <tbody>
                                        <tr>
                                            <th className="advisor-name" id="advisor-name-1">
                                                {article.name}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="advisor-name" id="advisor-name-1">
                                                {article.designation}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="advisor-post" id="invest-post-1"></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                            <h3 className="article-show">
                                <a
                                    className="recent-link"
                                    id="title-link-1"
                                    onClick={() => {
                                        props.handleChangeLatestPost(article);
                                    }}
                                    dangerouslySetInnerHTML={{ __html: ( article.content.length > 200 ? article.content.substr(0,200)+"..." : article.content)  }}></a>
                                <article className="article-pub" id="publish-1">
                                    {article.updated.substr(0, 10)}
                                </article>
                            </h3>
                            {props.showStatus && (
                                <React.Fragment>
                                    <div className="status-blog">
                                        Status : <span>{article.forumStatus}</span>
                                    </div>
                                    <div className="display-blog">
                                        Display : <span>{article.articleStatus}</span>
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
