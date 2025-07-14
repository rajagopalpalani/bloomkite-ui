import React from 'react';

class PostComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideOpen: false
        };
    }

    render() {
        return (
            <div>
                <div className="comment-view">
                    {this.props.articleComment &&
                        this.props.articleComment.articleCommentList &&
                        this.props.articleComment.articleCommentList.length > 0 &&
                        this.props.articleComment.articleCommentList.map((comment) => {
                            return (
                                <div key={`comment-${comment.commentId}`}>
                                    <div className="Profile-5">
                                        <img className="comment-img" src={comment.imagePath ? comment.imagePath : "/images/avatar.png"} alt="/images/avatar.png" />
                                        <table className="insurance-tab">
                                            <tbody>
                                                <tr>
                                                    <th className="advisor-name" id="advisor-name-1">
                                                        {comment.name}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className="advisor-name" id="advisor-name-1">
                                                        {comment.designation}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className="advisor-post" id="invest-post-1"></th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="latest-content">{comment.content}</div>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
export default PostComment;
