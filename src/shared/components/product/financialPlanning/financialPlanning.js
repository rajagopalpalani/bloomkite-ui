import React from 'react';
import ProfileHeader from '../../profileHeader';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { homeMessage } from '../../../constants/homeConstant';


class FinancialPlanning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advisorDetails: this.props.advisorDetails,
            render: false,
            titleContainer: true,
            currentTab: 1
        }
    }

    handleTabChange = (index) => {
        this.setState({ currentTab: index, titleContainer: false, productTitle: index });
    }
    render() {
        const FinancialPlanning = ["Overview", "Types", "Benefits", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        financialPlan={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {FinancialPlanning && FinancialPlanning.map((item, index) => (
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
                                            <p>{homeMessage.financialOverview} </p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.typeHeader1}</h5>
                                            <p>{homeMessage.financialType1} </p>
                                            <h5 className="overview-align">{homeMessage.typeHeader2}</h5>
                                            <p>{homeMessage.financialType2}</p>
                                            <h5 className="overview-align">{homeMessage.typeHeader3}</h5>
                                            <p>{homeMessage.financialType3}</p>
                                            <h5 className="overview-align">{homeMessage.typeHeader4}</h5>
                                            <p>{homeMessage.financialType4}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.benefitsHeader1}</h5>
                                            <p>{homeMessage.financialBenefits1}</p>
                                            <h5 className="overview-align">{homeMessage.benefitsHeader2}</h5>
                                            <p>{homeMessage.financialBenefits2}</p>
                                            <h5 className="overview-align">{homeMessage.benefitsHeader3}</h5>
                                            <p>{homeMessage.financialBenefits3}</p>
                                            <h5 className="overview-align">{homeMessage.benefitsHeader4}</h5>
                                            <p>{homeMessage.financialBenefits4}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by Financial Planning</Link>
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
                                            <Link className="save-btn2 prod-color" to="/experts"> Explore by Financial Planning</Link>
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

export default FinancialPlanning;