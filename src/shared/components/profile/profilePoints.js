import React from 'react';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';

const ProfilePoints = (props) => {
    const { onFollowClick, onUnfollowClick, onRefollowClick, onChatClick, canFollow, user = {} } = props;
    const { contactLink } = props;
    const renderControls = (
        <div className="points-group">
            {user.status === 1 && (
                <button className="btn btn-success" onClick={onUnfollowClick} title="Unfollow">
                    <FontIcon icon={faUser} /> Unfollow
                </button>
            )}
            {!(user.status === 1 || user.status === 3 || user.status === 4) && canFollow && (
                <button className="btn btn-primary" onClick={onFollowClick} title="Follow">
                    <FontIcon icon={faUser} /> Follow
                </button>
            )}
            {user.status === 3 && (
                <button className="btn btn-primary" onClick={onRefollowClick} title="Re-follow">
                    <FontIcon icon={faUser} /> Re-follow
                </button>
            )}
            {user.status === 4 && (
                <button className="btn btn-primary" disabled title="Follow Requested">
                    <FontIcon icon={faUser} /> Follow Requested
                </button>
            )}
            {contactLink}
        </div>
    );
    return <div className="bloomkite-profile-points-container">{renderControls}</div>;
};

export default ProfilePoints;
