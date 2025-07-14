import React from 'react';
import ProfileImage from '../profileImage';
import classNames from 'classnames';

class InvestorLeftbar extends React.Component {
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
        const { userName } = this.props;
        return (
            <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                <ProfileImage userName={userName} />
                <div className="left-advisor-sidebar">
                    <ul>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 1), 'no-active': (this.props.currentTab != 1) })}><a onClick={() => this.handleTabChange(1)} >Personal Information</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 2), 'no-active': (this.props.currentTab != 2) })}><a onClick={() => this.handleTabChange(2)} >Area of Interest</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 3), 'no-active': (this.props.currentTab != 3) })}><a onClick={() => this.handleTabChange(3)} >Password</a></li>
                        <li className={classNames('btnMenu', { active: (this.props.currentTab == 4), 'no-active': (this.props.currentTab != 4) })}><a onClick={() => this.handleTabChange(4)} >Following</a></li>
                        <li className={`btnMenu ${this.props.currentTab == 10 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(10)} >Mobile Verification</a></li>
                        {/* <li className={`btnMenu ${this.props.currentTab == 5 ? 'active' : 'no-active'}`}><a onClick={() => this.handleTabChange(5)} >Dashboard</a></li>  */}
                    </ul>
                </div>
            </div>
        )
    }
}

export default InvestorLeftbar;



