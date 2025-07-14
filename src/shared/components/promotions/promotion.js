import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';

class Promotion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: this.props.index,
            isOpen: false
        };
    }

    //const Promotion = (props) => {
    render() {
        const { photoIndex, isOpen } = this.state;
        const { onRemove, info, images, index } = this.props;
        const { title, description, fileUrl, type } = info;
        const removeHandler = (e) => {
            e.preventDefault();
            onRemove();
        };
        const imgUrl = fileUrl || '/images/noimage.png';
        const showBody = !!(title || description);
        return (
            <div className="card promotion-card">
                <a className="promotion-close" href="/" onClick={removeHandler}>
                    &times;
                </a>
                <img className={classNames('card-img-top', {' image-cursor' : fileUrl})} onClick={fileUrl ? () => this.setState({ isOpen: true }) : () => {}} src={imgUrl} alt={title} />
                {isOpen && images && (
                    <Lightbox
                        mainSrc={images[photoIndex].fileUrl}
                        imageTitle={images[photoIndex].title}
                        nextSrc={images[(photoIndex + 1) % images.length].fileUrl}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length].fileUrl}
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
                {showBody && (
                    <div className="card-body">
                        {title && <h5 className="card-title text-truncate">{title}</h5>}
                        {description && <p className="card-text text-truncate">{description}</p>}
                    </div>
                )}
            </div>
        );
    }
}

export default Promotion;
