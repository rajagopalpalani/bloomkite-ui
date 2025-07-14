import React from 'react';

class BlogHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row full-page">
                <div className="col-lg-12 sub-nav-plan blog-header">
                    {(!this.props.investorDetails || !this.props.investorDetails.invId) && (
                        <span className="postbar-btn">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    this.props.handleCreatepost(false);
                                }}>
                                ADD POST
                            </button>
                        </span>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogHeader;
