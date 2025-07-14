import React from 'react';
import ProfileUploadPopup from './profileUploadPopup';
import CustomFragment from './common/customFragment';

const ProfileImage = (props) => {
    return (
        <div className="profileImage">
            <ProfileUploadPopup {...props}>
                {(image) => (
                    <CustomFragment>
                        <img
                            id="photo1"
                            className="profile-image"
                            src={image ? image : "/images/avatar.png"}
                            alt="profile image"
                        />
                        <span>Edit</span>
                    </CustomFragment>
                )}
            </ProfileUploadPopup>
        </div>
    );
};

export default ProfileImage;
