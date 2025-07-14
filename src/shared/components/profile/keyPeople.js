import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';

class KeyPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            photoIndex: 0
        };
    }
    render() {
        const { list } = this.props;
        const { photoIndex, isOpen } = this.state;
        return list && list.length > 0 ? (
            <div className="bloomkite-profile-keypeople">
                <h5 className="profile-title">
                    <strong className="experts-head">Keypeople</strong>
                </h5>
                <div className="row nomargin nopadding">
                    {list.map((item, index) => {
                        const { image, fullName, designation } = item;
                        return (
                            <div key={'keypeople-' + index} className="keypeople col-lg-4 col-md-4 col-sm-12">
                                <div className="bg-white padding15 profile-border text-center">
                                    <section className="profile-keypeople">
                                        {(image || '/images/avatar.png') && (
                                            <img
                                                className={classNames('kepeople-img-top', { ' image-cursor': image || '/images/avatar.png' })}
                                                onClick={image || '/images/avatar.png' ? () => this.setState({ isOpen: true, photoIndex: index }) : () => {}}
                                                src={image || '/images/avatar.png'}
                                                alt={'profile image'}
                                            />
                                        )}
                                        {isOpen && (
                                            <Lightbox
                                                mainSrc={list[photoIndex].image || '/images/avatar.png'}
                                                imageTitle={list[photoIndex].title}
                                                nextSrc={list[(photoIndex + 1) % list.length].image || '/images/avatar.png'}
                                                prevSrc={list[(photoIndex + list.length - 1) % list.length].image || '/images/avatar.png'}
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
                                        <br />
                                        {fullName}
                                        <br />
                                        {designation}
                                    </section>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null;
    }
}

export default KeyPeople;
