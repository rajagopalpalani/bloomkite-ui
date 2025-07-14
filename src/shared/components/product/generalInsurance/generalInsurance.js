import React from 'react';
import ProfileHeader from '../../profileHeader';
import { homeMessage } from '../../../constants/homeConstant';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


class GeneralInsurance extends React.Component {
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
        const GeneralInsurance = ["Overview", "Types", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        generalInsurance={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {GeneralInsurance && GeneralInsurance.map((item, index) => (
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
                                            <p>{homeMessage.generalOverview}</p>
                                            <p>{homeMessage.generalOverview1}</p>

                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.generalHead1}</h5>
                                            <p> {homeMessage.generalType1}</p>
                                            <p>{homeMessage.generalType2}</p>
                                            <h5 className="overview-align">{homeMessage.generalHead2} </h5>
                                            <p>{homeMessage.generalType3}</p>
                                            <p>{homeMessage.generalType4}</p>
                                            <p>{homeMessage.generalType5}</p>
                                            <h5 className="overview-align">{homeMessage.generalHead3} </h5>
                                            <p>{homeMessage.generalType6}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by General Insurance</Link>
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

export default GeneralInsurance;