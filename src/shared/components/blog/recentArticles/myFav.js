import React from 'react';

const MyFavorite = props => {
    return (
        <div className="recentArticle">
            {props.favouriteArticleListByPartyId &&
                props.favouriteArticleListByPartyId.length > 0 &&
                props.favouriteArticleListByPartyId.map(
                    ({ content, designation, updated, imagePath }, i) => {
                        return (
                            <div id="myChange1" key={i}>
                                <img
                                    src={imagePath}
                                    height="50px"
                                    width="50px"
                                />
                                <table className="insurance-tab">
                                    <tbody>
                                        <tr>
                                            <th
                                                className="advisor-name"
                                                id="advisor-name-1">
                                                {designation}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                className="advisor-post"
                                                id="invest-post-1"></th>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3>
                                    <a
                                        className="recent-link"
                                        id="title-link-1">
                                        {content.substr(0, 100)}
                                    </a>
                                    <article
                                        className="article-pub"
                                        id="publish-1">
                                        {updated.substr(0, 10)}
                                    </article>
                                </h3>
                                <div className="blog-post-border"></div>
                            </div>
                        );
                    }
                )}
        </div>
    );
};

export default MyFavorite;
