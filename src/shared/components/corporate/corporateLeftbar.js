import React from 'react';
import ProfileImage from '../profileImage';
import classNames from 'classnames';

class CorporateLeftbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadFile: false
        }
    }

    handleTabChange = (index) => {
        this.props.handleTabChange(index);
    }

    render() {
        return (
            <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                <ProfileImage />
                <div className="left-advisor-sidebar">
                    <ul>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 1), 'no-active': (this.props.currentTab != 1) })}><a onClick={() => this.handleTabChange(1)} >Corporate Information</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 2), 'no-active': (this.props.currentTab != 2) })}><a onClick={() => this.handleTabChange(2)} >Awards/Certificates</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 3), 'no-active': (this.props.currentTab != 3) })}><a onClick={() => this.handleTabChange(3)} >Team</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 4), 'no-active': (this.props.currentTab != 4) })}><a onClick={() => this.handleTabChange(4)} >Product/Service</a></li>
                        {this.props.showBrandTag && <li className={classNames('btnMenu', { active: (this.props.currentTab == 5), 'no-active': (this.props.currentTab != 5) })}><a onClick={() => this.handleTabChange(5)} >Brand Tag</a></li>}
                        {!this.props.parentPartyId && <li className={`btnMenu ${this.props.currentTab == 6 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(6)} >Membership Plan</a></li>}
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 7), 'no-active': (this.props.currentTab != 7) })}><a onClick={() => this.handleTabChange(7)} >Password</a></li>
                        {/* <li className={`btnMenu ${this.props.currentTab == 8 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(8)} >Dashboard</a></li>
                        <li className={`btnMenu ${this.props.currentTab == 9 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(9)} >Video</a></li> */}
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 13), 'no-active': (this.props.currentTab != 13) })}><a onClick={() => this.handleTabChange(13)} >Promotions</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 10), 'no-active': (this.props.currentTab != 10) })}><a onClick={() => this.handleTabChange(10)} >Public Profile</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 14), 'no-active': (this.props.currentTab != 14) })}><a onClick={() => this.handleTabChange(14)} >Mobile Verification</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 11), 'no-active': (this.props.currentTab != 11) })}><a onClick={() => this.handleTabChange(11)} >Followers</a></li>
                        {/* <li className={`btnMenu ${this.props.currentTab == 11 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(11)} >Followers</a></li>
                        <li className={`btnMenu ${this.props.currentTab == 12 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(12)} >Articles</a></li> */}


                    </ul>
                </div>
            </div>
        )
    }
}

export default CorporateLeftbar;