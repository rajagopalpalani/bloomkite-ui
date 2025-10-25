import React from 'react';
import LightboxWrapper from '../common/LightboxWrapper';
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
                    <LightboxWrapper
                        open={isOpen}
                        close={() => this.setState({ isOpen: false })}
                        index={photoIndex}
                        slides={images.map(img => ({ src: img.fileUrl, title: img.title }))}
                        on={{
                            view: ({ index }) => this.setState({ photoIndex: index })
                        }}
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
