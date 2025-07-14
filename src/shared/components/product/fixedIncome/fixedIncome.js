import React from 'react';
import { homeMessage } from '../../../constants/homeConstant';
import ProfileHeader from '../../profileHeader';
import { Link } from 'react-router-dom';
import { HTML5_FMT } from 'moment';
import classNames from 'classnames';

class FixedIncome extends React.Component {
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
        const fixedIncome = ["Overview", "Types", "Benefits", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        fixedIncome={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {fixedIncome && fixedIncome.map((item, index) => (
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
                                            <p>{homeMessage.fixedOverview}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.fixedHead1}</h5>
                                            <p>{homeMessage.fixedType1}</p>
                                            <h5 className="overview-align">{homeMessage.fixedHead2}</h5>
                                            <p>{homeMessage.fixedType2}</p>
                                            <h5 className="overview-align">{homeMessage.fixedHead3}</h5>
                                            <p>{homeMessage.fixedType3}</p>
                                            <h5 className="overview-align">{homeMessage.fixedHead4}</h5>
                                            <p>{homeMessage.fixedType4}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.fixedBenefits1}</p>
                                            <p>{homeMessage.fixedBenefits2}</p>
                                            <p>{homeMessage.fixedBenefits3}</p>
                                            <p>{homeMessage.fixedBenefits4}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by Fixed Income</Link>
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
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by Fixed Income</Link>
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

export default FixedIncome;