import React from 'react';
import ProfileHeader from '../../profileHeader';
import { homeMessage } from  '../../../constants/homeConstant';
import classNames from 'classnames';

class HomeLoans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advisorDetails: this.props.advisorDetails,
            render: false,
            currentTab: 1
        }
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index });
    }

    render() {
        return (
            <div>
                <ProfileHeader 
                   showProduct={true}
                   homeLoans={true}
                   advisorDetails={this.props.advisorDetails}
                   />
                <div className="prod-design">
                  <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 1), 'no-active' : (this.props.currentTab != 1)})}><a onClick={() => this.handleTabChange(1)} >{homeMessage.overview}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 2), 'no-active' : (this.props.currentTab != 2)})}><a onClick={() => this.handleTabChange(2)} >{homeMessage.types}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 3), 'no-active' : (this.props.currentTab != 3)})}><a onClick={() => this.handleTabChange(3)} >{homeMessage.benefits}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 4), 'no-active' : (this.props.currentTab != 4)})}><a onClick={() => this.handleTabChange(4)} >{homeMessage.eligibility}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 5), 'no-active' : (this.props.currentTab != 5)})}><a onClick={() => this.handleTabChange(5)} >{homeMessage.brands}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 6), 'no-active' : (this.props.currentTab != 6)})}><a onClick={() => this.handleTabChange(6)} >{homeMessage.categories}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 7), 'no-active' : (this.props.currentTab != 7)})}><a onClick={() => this.handleTabChange(7)} >{homeMessage.definitions}</a></li>
                                    <li className={classNames('btnMenu', {active : (this.props.currentTab == 8), 'no-active' : (this.props.currentTab != 8)})}><a onClick={() => this.handleTabChange(8)} >{homeMessage.explore}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 nopadding">
                            <div className="col-12 center-page planning-right row">
                                <div className="page-center bg-white" >
                                    {
                                        (this.state.currentTab == 1) &&
                                        <div>
                                            Overview content 1
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div>
                                            Types content 2
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div>
                                            Benefits content 3
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div>
                                            Eligibility content 4
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 5) &&
                                        <div>
                                            Brands content 5
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 6) &&
                                        <div>
                                            Catagories content 6
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 7) &&
                                        <div>
                                            Definitions content 7
                                    </div>
                                    }
                                    {
                                        (this.state.currentTab == 8) &&
                                        <div>
                                            Explore content 8
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeLoans;