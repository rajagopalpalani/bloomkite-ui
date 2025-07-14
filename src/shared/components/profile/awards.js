import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';
import FontIcon from '../common/fontAwesomeIcon';
import { faAward } from '@fortawesome/free-solid-svg-icons';

class Awards extends React.Component {
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
            <div className="bloomkite-profile-awards">
                <h5 className="profile-title">
                    <strong className="experts-head">Awards</strong>
                </h5>
                <div className="row nomargin nopadding">
                    {list &&
                        list.map((item, index) => {
                            const { title, issuedBy, year, imagePath } = item;
                            return (
                                <div key={'awards-' + index} className="awards col-lg-4 col-md-4 col-sm-12">
                                    <div className="bg-white padding15 profile-border">
                                        <h5>
                                            <FontIcon className="profile-icon" icon={faAward} /> {title}
                                        </h5>
                                        <section className="profile-awards">
                                            <p>{issuedBy}</p>
                                            <p>{year}</p>
                                            {imagePath && (
                                                <img
                                                    className={classNames('card-img-top', { ' image-cursor': imagePath })}
                                                    onClick={imagePath ? () => this.setState({ isOpen: true, photoIndex: index }) : () => {}}
                                                    src={imagePath}
                                                    alt={'profile image'}
                                                />
                                            )}
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

export default Awards;
