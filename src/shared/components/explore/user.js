import React from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';

const User = (props) => {
    const {
        details: { displayName, image, location },
        handleUser
    } = props;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center cursor-pointer" onClick={handleUser}>
            <div className="explore-user-container d-flex flex-direction-row justify-content-center align-items-center">
                <img className="explore-user-image" src={image || 'images/avatar.png'} alt="profile image" />
                <div className="explore-user-details">
                    {displayName && (
                        <h4 title={displayName} className="explore-user-name text-ellipsis">
                            {displayName}
                        </h4>
                    )}
                    {location && (
                        <p title={location} className="explore-user-info text-ellipsis">
                            <FontIcon icon={faMapMarker} /> {location}
                        </p>
                    )}
                </div>
                <button onClick={handleUser} className="btn btn-primary">
                    View
                </button>
            </div>
        </li>
    );
};

export default User;