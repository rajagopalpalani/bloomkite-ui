import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: this.props.index,
            isOpen: false
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        const { images, index, url, name } = this.props;
        return (
            <div className="file-list-item preview">
                <a href="/" onClick={(e) => this.props.removeFile(e, index)}>
                    &times;
                </a>
                <img className={classNames({' image-cursor': url})} onClick={url ? () => this.setState({ isOpen: true }) : () => {}} src={url} alt={name} />
                {isOpen && images && (
                    <Lightbox
                        mainSrc={images[photoIndex].imagePath}
                        imageTitle={images[photoIndex].title}
                        nextSrc={images[(photoIndex + 1) % images.length].imagePath}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length].imagePath}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length
                            })
                        }
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

export default ImageGallery;
