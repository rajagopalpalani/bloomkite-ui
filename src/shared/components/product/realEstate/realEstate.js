import React from 'react';
import ProfileHeader from '../../profileHeader';
import classNames from 'classnames';

class RealEstate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advisorDetails: this.props.advisorDetails,
            render: false,
            currentTab: 1
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    };

    render() {
        return (
            <div>
                <ProfileHeader showProduct={true} realEstate={true} advisorDetails={this.props.advisorDetails} />
                <div className="prod-design">
                    <div className="row col-12 advisor-gap">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 1, 'no-active': this.props.currentTab != 1 })}>
                                        <a onClick={() => this.handleTabChange(1)}>Overview</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 2, 'no-active': this.props.currentTab != 2 })}>
                                        <a onClick={() => this.handleTabChange(2)}>Types</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 3, 'no-active': this.props.currentTab != 3 })}>
                                        <a onClick={() => this.handleTabChange(3)}>Benefits</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 4, 'no-active': this.props.currentTab != 4 })}>
                                        <a onClick={() => this.handleTabChange(4)}>Eligibility</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 5, 'no-active': this.props.currentTab != 5 })}>
                                        <a onClick={() => this.handleTabChange(5)}>Brands</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 6, 'no-active': this.props.currentTab != 6 })}>
                                        <a onClick={() => this.handleTabChange(6)}>Catagories</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 7, 'no-active': this.props.currentTab != 7 })}>
                                        <a onClick={() => this.handleTabChange(7)}>Definitions</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.props.currentTab == 8, 'no-active': this.props.currentTab != 8 })}>
                                        <a onClick={() => this.handleTabChange(8)}>Explore</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 nopadding">
                            <div className="col-12 center-page row" style={{ paddingRight: '0px' }}>
                                <div className="page-center bg-white">
                                    {this.state.currentTab == 1 && <div>Overview content 1</div>}
                                    {this.state.currentTab == 2 && <div>Types content 2</div>}
                                    {this.state.currentTab == 3 && <div>Benefits content 3</div>}
                                    {this.state.currentTab == 4 && <div>Eligibility content 4</div>}
                                    {this.state.currentTab == 5 && <div>Brands content 5</div>}
                                    {this.state.currentTab == 6 && <div>Catagories content 6</div>}
                                    {this.state.currentTab == 7 && <div>Definitions content 7</div>}
                                    {this.state.currentTab == 8 && <div>Explore content 8</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RealEstate;
