import React, { Component } from 'react';
import Loader from '../../components/common/loader';
import { homeMessage } from '../../constants/homeConstant';
import classNames from 'classnames';

class Howitworks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            titleContainer: true
        };
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index, titleContainer: false, productTitle: index });
    };

    render() {
        return (
            <div>
                <div className="col-12 container how-it-deisgns main-container pt-1">
                    <h1 className="heading">{homeMessage.howitworksHeader}</h1>
                    <div className="overview-size-adv">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar-static">
                                <ul>
                                    <li className={classNames('btnMenu', { active: this.state.currentTab == 1, 'no-active': this.state.currentTab != 1 })}>
                                        <a onClick={() => this.handleTabChange(1)}>Advisor</a>
                                    </li>
                                    <li className={classNames('btnMenu', { active: this.state.currentTab == 2, 'no-active': this.state.currentTab != 2 })}>
                                        <a onClick={() => this.handleTabChange(2)}>Investor</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            {this.state.currentTab == 1 && (
                                <div className="static-content">
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor1}</span>
                                        {homeMessage.howitworksAdvisor11}
                                    </p>
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor2}</span>
                                        {homeMessage.howitworksAdvisor21}
                                    </p>
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor3}</span>
                                        {homeMessage.howitworksAdvisor31}
                                    </p>
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor4}</span>
                                        {homeMessage.howitworksAdvisor41}
                                    </p>
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor5}</span>
                                        {homeMessage.howitworksAdvisor51}
                                    </p>
                                    <p>
                                        <span className="plan-title">{homeMessage.howitworksAdvisor6}</span>
                                        {homeMessage.howitworksAdvisor61}
                                    </p>
                                </div>
                            )}
                            {this.state.currentTab == 2 && (
                                <div className="static-content">
                                    <p>{homeMessage.howitworksInvestor1}</p>
                                    <p>{homeMessage.howitworksInvestor2}</p>
                                    <p>{homeMessage.howitworksInvestor3}</p>
                                    <p>{homeMessage.howitworksInvestor4}</p>
                                    <p>{homeMessage.howitworksInvestor5}</p>
                                    <p>{homeMessage.howitworksInvestor6}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

export default Howitworks;
