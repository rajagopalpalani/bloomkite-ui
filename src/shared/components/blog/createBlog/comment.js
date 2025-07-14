import React from 'react';
import PostComment from './postComment';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../../common/fontAwesomeIcon';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogDetails: this.props.blogDetails,
            articleId: 0,
            content: '',
            partyId: 0,
            redirect: false,
            disabled: true
        };
    }

    updateCurrentInformation = (blogDetails) => {
        if (blogDetails) {
            this.setState({
                articleId: this.props.articleId,
                content: blogDetails.content,
                partyId: this.props.partyId
            });
        }
    };

    handleAddComment = (e) => {
        e.preventDefault();
        if (this.state.content.trim() != '') {
            let options = {
                articleId: this.props.articleId,
                content: this.state.content,
                partyId: this.props.partyId
            };
            this.props.createArticlePostComment(options);
            this.setState({
                disabled: true
            });
            setTimeout(() => {
                this.setState({
                    content: ''
                });
                this.props.fetchArticleComment({ id: this.props.articleId });
            }, 1000);
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, disabled: false });
    };

    render() {
        return (
            <div>
                <form className="Insurance-txt-align">
                    <textarea className="Insurance-txt" placeholder="Add comments...." name="content" id="content" onChange={this.handleChange} value={this.state.content}>
                        {this.props.content}
                    </textarea>
                    <button type="submit" disabled={this.state.disabled} onClick={(e) => this.handleAddComment(e)}>
                        <FontIcon icon={faPaperPlane} /> Post Comment
                    </button>
                </form>
                <div>
                    <PostComment articleComment={this.props.articleComment} />
                </div>
            </div>
        );
    }
}

export default Comment;
