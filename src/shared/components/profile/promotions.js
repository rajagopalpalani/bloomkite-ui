import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';

class Promotions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    render() {
        const { list } = this.props;
        const { photoIndex, isOpen } = this.state;
        return list && list.length > 0 ? (
            <div className="bloomkite-profile-promotions">
                <h5 className="profile-title"><strong className="experts-head">Promotions</strong></h5>
                <div className="row nomargin nopadding">
                    {list.map((promotion, index) => {
                        const { imagePath, title } = promotion;
                        return (
                            <div key={'promotions-' + index} className="promotion col-lg-4 col-md-4 col-sm-12">
                                <div className="bg-white padding15 h5 profile-border">
                                    {/* <h5>{title}</h5> */}
                                    <img
                                        className={classNames('card-img-top', { ' image-cursor': imagePath })}
                                        onClick={imagePath ? () => this.setState({ isOpen: true, photoIndex: index }) : () => {}}
                                        src={imagePath}
                                        alt={'profile image'}
                                    />
                                    {isOpen && (
                                        <Lightbox
                                            mainSrc={list[photoIndex].imagePath}
                                            imageTitle={list[photoIndex].title}
                                            nextSrc={list[(photoIndex + 1) % list.length].imagePath}
                                            prevSrc={list[(photoIndex + list.length - 1) % list.length].imagePath}
                                            onMovePrevRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + list.length - 1) % list.length
                                                })
                                            }
                                            onMoveNextRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + 1) % list.length
                                                })
                                            }
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null;
    }
}

export default Promotions;
