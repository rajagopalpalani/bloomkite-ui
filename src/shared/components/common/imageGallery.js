import React from 'react';
import LightboxWrapper from './LightboxWrapper';
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
                    <LightboxWrapper
                        open={isOpen}
                        close={() => this.setState({ isOpen: false })}
                        index={photoIndex}
                        slides={images.map(img => ({ src: img.imagePath, title: img.title }))}
                        on={{
                            view: ({ index }) => this.setState({ photoIndex: index })
                        }}
                    />
                )}
            </div>
        );
    }
}

export default ImageGallery;
