import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classNames from 'classnames';
import FontIcon from '../common/fontAwesomeIcon';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    render() {
        const { displayName, designation, city, image, downloadLink, contactLink } = this.props;
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        const imagePath = image ? `${image}?time=${Date.now()}` : '/images/avatar.png';
        return (
            <div className="bloomkite-profile-info-container d-flex">
                <img
                    className={classNames('card-img-top', { ' image-cursor': imagePath })}
                    onClick={imagePath ? () => this.setState({ isOpen: true }) : () => {}}
                    src={imagePath}
                    alt={'profile image'}
                />
                {this.state.isOpen && <Lightbox mainSrc={imagePath} onCloseRequest={() => this.setState({ isOpen: false })} />}
                <div className="bloomkite-profile-info">
                    {displayName && <h4 className="profile-name">{displayName}</h4>}
                    {designation && <h5 className="profile-designation">{designation}</h5>}
                    {this.props.corporate && <h5 className="profile-designation">{this.props.corporate}</h5>}
                    <div className="profile-options">
                        {city && (
                            <span>
                                <FontIcon icon={faMapMarker} /> {city}
                            </span>
                        )}
                    </div>
                    {(downloadLink || (!bloomkiteUsername && contactLink)) && (
                        <div className="points-group">
                            {downloadLink}
                            {!bloomkiteUsername && contactLink}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ProfileInfo;
