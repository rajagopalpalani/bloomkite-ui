import React from 'react';
import ProfileImage from '../profileImage';
import classNames from 'classnames';

class AdvisorLeftbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadFile: false
        };
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    };

    render() {
        const profileMenuList = [
            'Personal Information',
            'Awards/Certificates',
            'Product/Service',
            'Brand Tag',
            'Membership Plan',
            'Promotions',
            'Public Profile',
            'Password',
            'Mobile Verification',
            'Followers'
        ];
        const { currentTab, showBrandTag, parentPartyId } = this.props;
        return (
            <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                <ProfileImage />
                <div className="left-advisor-sidebar">
                    <select className="hidden-lg-up" defaultValue={currentTab} onChange={(e) => this.handleTabChange(e.target.value)}>
                        {profileMenuList &&
                            profileMenuList.map((item, index) =>
                                (showBrandTag && index + 1 == 4) || (!parentPartyId && index + 1 == 5) ? (
                                    <option
                                        value={index + 1}
                                        className={classNames('btnMenu', {
                                            active: currentTab == index + 1,
                                            'no-active': currentTab != index + 1
                                        })}>
                                        {item}
                                    </option>
                                ) : (
                                    <option
                                        value={index + 1}
                                        className={classNames('btnMenu', {
                                            active: currentTab == index + 1,
                                            'no-active': currentTab != index + 1
                                        })}>
                                        {item}
                                    </option>
                                )
                            )}
                    </select>
                    <ul className="hidden-lg-down">
                        {profileMenuList &&
                            profileMenuList.map((item, index) =>
                                (showBrandTag && index + 1 == 4) || (!parentPartyId && index + 1 == 5) ? (
                                    <li className={classNames('btnMenu', { active: currentTab == index + 1, 'no-active': currentTab != index + 1 })}>
                                        <a onClick={() => this.handleTabChange(index + 1)}>{item}</a>
                                    </li>
                                ) : (
                                    <li className={classNames('btnMenu', { active: currentTab == index + 1, 'no-active': currentTab != index + 1 })}>
                                        <a onClick={() => this.handleTabChange(index + 1)}>{item}</a>
                                    </li>
                                )
                            )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default AdvisorLeftbar;
