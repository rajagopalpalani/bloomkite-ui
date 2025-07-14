import React from 'react';
import ProfileHeader from '../../profileHeader';
import { homeMessage } from '../../../constants/homeConstant';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


class HealthInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advisorDetails: this.props.advisorDetails,
            render: false,
            currentTab: 1,
            titleContainer: true
        }
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index, titleContainer: false, productTitle: index });
    }

    render() {
        const healthInsurance = ["Overview", "Types", "Benefits", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        healthInsurance={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {healthInsurance && healthInsurance.map((item, index) => (
                                        <li className={classNames('btnMenu', { active: (this.state.currentTab == (index + 1)), 'no-active': (this.state.currentTab != (index + 1)) })}><a onClick={() => this.handleTabChange(index + 1)} >{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-10 nopadding">
                            <div className="col-12 center-page planning-right row">
                                <div className="page-center bg-white" >
                                    {
                                        (this.state.currentTab == 1) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.healthOverview}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.healthHead1}</h5>
                                            <p>{homeMessage.healthType1}</p>
                                            <h5 className="overview-align">{homeMessage.healthHead2}</h5>
                                            <p>{homeMessage.healthType2}</p>
                                            <h5 className="overview-align">{homeMessage.healthHead3}</h5>
                                            <p>{homeMessage.healthType3}</p>
                                            <h5 className="overview-align">{homeMessage.healthHead4}</h5>
                                            <p>{homeMessage.healthType4}</p>
                                            <h5 className="overview-align">{homeMessage.healthHead5}</h5>
                                            <p>{homeMessage.healthType5}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.healthBenefits1}</p>
                                            <h5 className="overview-align">{homeMessage.healthBenefitshead1}</h5>
                                            <p>{homeMessage.healthBenefits2}</p>
                                            <h5 className="overview-align">{homeMessage.healthBenefitshead2}</h5>
                                            <p>{homeMessage.healthBenefits3}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by Health Insurance</Link>
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

export default HealthInsurance;