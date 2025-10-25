import React from 'react';
import LightboxWrapper from '../common/LightboxWrapper';
import classNames from 'classnames';
import FontIcon from '../common/fontAwesomeIcon';
import { faAward } from '@fortawesome/free-solid-svg-icons';
class Certificates extends React.Component {
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
                    <strong className="experts-head cert">Certificates</strong>
                </h5>
                <div className="row nomargin nopadding">
                    {list &&
                        list.map((item, index) => {
                            const { title, issuedBy, year, imagePath } = item;
                            return (
                                imagePath && (
                                    <div key={'certificates-' + index} className="awards padding15 col-lg-4 col-md-4 col-sm-12">
                                        <div className="bg-white padding15 profile-border">
                                            <h5>
                                                <FontIcon className="profile-icon" icon={faAward} /> {title}
                                            </h5>
                                            <section className="profile-awards">
                                                {issuedBy}
                                                <br />
                                                {year}
                                                <br />
                                                {imagePath && (
                                                    <img
                                                        className={classNames('card-img-top', { ' image-cursor': imagePath })}
                                                        onClick={imagePath ? () => this.setState({ isOpen: true, photoIndex: index }) : () => {}}
                                                        src={imagePath}
                                                        alt={'profile image'}
                                                    />
                                                )}
                                                {isOpen && (
                                                    <LightboxWrapper
                                                        open={isOpen}
                                                        close={() => this.setState({ isOpen: false })}
                                                        index={photoIndex}
                                                        slides={list.map(img => ({ src: img.imagePath, title: img.title }))}
                                                        on={{
                                                            view: ({ index }) => this.setState({ photoIndex: index })
                                                        }}
                                                    />
                                                )}
                                            </section>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                </div>
            </div>
        ) : null;
    }
}

export default Certificates;
