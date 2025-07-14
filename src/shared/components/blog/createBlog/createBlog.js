import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
class CreateBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogDetails: this.props.blogDetails,
            content: '',
            forumCategoryId: '',
            forumSubCategoryId: '',
            partyId: '',
            redirect: false
        };
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.blogDetails) != JSON.stringify(oldProps.blogDetails)) {
            this.setState({ blogDetails: this.props.blogDetails });
            this.updateCurrentInformation(this.props.blogDetails);
        }
    }

    //   componentDidMount() {
    //     this.setState({ blogDetails: this.props.blogDetails });
    //     this.updateCurrentInformation(this.props.blogDetails);
    //   }

    updateCurrentInformation = (blogDetails) => {
        this.setState({
            content: blogDetails.content,
            forumCategoryId: blogDetails.forumCategoryId,
            forumSubCategoryId: blogDetails.forumSubCategoryId,
            partyId: blogDetails.partyId
        });
    };

    handleCreateBlog = (e) => {
        e.preventDefault();
        let options = {
            content: this.state.content,
            forumCategoryId: parseInt(this.state.forumCategoryId),
            forumSubCategoryId: parseInt(this.state.forumSubCategoryId),
            partyId: this.props.partyId
        };
        this.props.createArticlePost(options);
        setTimeout(() => {
            this.props.fetchArticleListByPartyId(this.props.partyId);
            this.props.fetchRecentArticlePostList();
            this.setState({
                content: ''
            });
        }, 1000);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {});
        if (name == 'forumCategoryId') {
            this.loadSubCategory(value);
        }
    };

    loadSubCategory = (categoryId) => {
        let categorySubList = [];
        this.props.categoryList.map((category) => {
            if (category.forumCategoryId == categoryId) {
                categorySubList = category.forumSubCategory;
            }
        });
        this.setState({ categorySubList });
    };

    showCategory = (categoryList) => {
        return (
            categoryList &&
            categoryList.length > 0 &&
            categoryList.map((category) => {
                return (
                    <option key={`category-${category.forumCategoryId}`} value={category.forumCategoryId}>
                        {category.name}
                    </option>
                );
            })
        );
    };

    showSubCategory = (categorySubList) => {
        return (
            categorySubList &&
            categorySubList.length > 0 &&
            categorySubList.map((category) => {
                return (
                    <option key={`category-${category.forumSubCategoryId}`} value={category.forumSubCategoryId}>
                        {category.name}
                    </option>
                );
            })
        );
    };

    handleEditorChange = (content, editor) => {
        this.setState({
            content: content
        });
    };

    render() {
        return (
            <div>
                <div className="row col-12">
                    <div className="create-page">
                        <Editor
                            initialValue=""
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                        <select className="blog-option" name="forumCategoryId" id="forumCategoryId" onChange={this.handleChange}>
                            <option value={''}>Chooose Category</option>
                            {this.showCategory(this.props.categoryList)}
                        </select>
                        <select className="blog-option" name="forumSubCategoryId" id="forumSubCategoryId" onChange={this.handleChange}>
                            <option value={''}>Chooose Sub Category</option>
                            {this.state.forumCategoryId && this.showSubCategory(this.state.categorySubList)}
                        </select>
                        <button className="post-btn" onClick={(e) => this.handleCreateBlog(e)}>
                            {this.props.post}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBlog;
