import React from 'react';
import classNames from 'classnames';

class BlogLeftbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            subId: 0
        };
    }

    handleTabChange = (id, subId) => {
        this.setState({ id: id, subId: subId });
        this.props.handleTabChange(id, subId);
    };

    render() {
        return (
            <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                <div className="left-advisor-sidebar">
                    <ul>
                        {this.props.allForumCategory &&
                            this.props.allForumCategory.length > 0 &&
                            this.props.allForumCategory.map((category) => {
                                return (
                                    <li key={category.forumCategoryId}>
                                        <a
                                            className={classNames('blog-left-category', {
                                                active: this.state.id == category.forumCategoryId,
                                                'no-active': this.state.id !== category.forumCategoryId
                                            })}
                                            onClick={() => this.handleTabChange(category.forumCategoryId)}>
                                            {category.name}
                                        </a>
                                        {category.forumSubCategory &&
                                            category.forumSubCategory.length > 0 &&
                                            category.forumSubCategory.map((subCategory) => {
                                                return (
                                                    <ul key={subCategory.forumSubCategoryId}>
                                                        <li>
                                                            <a
                                                                className={classNames('blog-left-subcategory', {
                                                                    active: this.state.subId == subCategory.forumSubCategoryId && this.state.id == category.forumCategoryId,
                                                                    'no-active': this.state.subId !== subCategory.forumSubCategoryId
                                                                })}
                                                                onClick={() => this.handleTabChange(category.forumCategoryId, subCategory.forumSubCategoryId)}>
                                                                {subCategory.name}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                );
                                            })}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default BlogLeftbar;
