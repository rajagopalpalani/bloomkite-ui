import React from 'react';
import ProfileHeader from '../../profileHeader';
import { Link } from 'react-router-dom';
import { homeMessage } from '../../../constants/homeConstant';
import classNames from 'classnames';


class LifeInsurance extends React.Component {
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
        const lifeInsurance = ["Overview", "Types", "Benefits", "Eligibility", "Brands", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        lifeInsurance={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {lifeInsurance && lifeInsurance.map((item, index) => (
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
                                            <p>{homeMessage.lifeOverview}</p>

                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.lifeType1}</h5>
                                            <p>{homeMessage.lifeType11}</p>
                                            <h5 className="overview-align">{homeMessage.lifeType2}</h5>
                                            <p>{homeMessage.lifeType21}</p>
                                            <h5 className="overview-align">{homeMessage.lifeType3}</h5>
                                            <p>{homeMessage.lifeType31}</p>
                                            <h5 className="overview-align">{homeMessage.lifeType4}</h5>
                                            <p>{homeMessage.lifeType41}</p>
                                            <h5 className="overview-align">{homeMessage.lifeType5}</h5>
                                            <p>{homeMessage.lifeType51}</p>

                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.lifeBenefits}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.lifeEligibility1} </p>
                                            <h5 className="overview-align">{homeMessage.lifeEligibility2}</h5>
                                            <p>{homeMessage.lifeEligibility21} </p>
                                            <h5 className="overview-align">{homeMessage.lifeEligibility3}</h5>
                                            <p>{homeMessage.lifeEligibility31} </p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 5) &&
                                        <div className="overview-size">
                                            <ol className="product-pointer">
                                                <li>{homeMessage.lifeBrand1}</li>
                                                <li>{homeMessage.lifeBrand2}</li>
                                                <li>{homeMessage.lifeBrand3}</li>
                                                <li>{homeMessage.lifeBrand4}</li>
                                                <li>{homeMessage.lifeBrand5}</li>
                                                <li>{homeMessage.lifeBrand6}</li>
                                                <li>{homeMessage.lifeBrand7}</li>
                                                <li>{homeMessage.lifeBrand8}</li>
                                                <li>{homeMessage.lifeBrand9}</li>
                                                <li>{homeMessage.lifeBrand10}</li>
                                                <li>{homeMessage.lifeBrand11}</li>
                                                <li>{homeMessage.lifeBrand12}</li>
                                                <li>{homeMessage.lifeBrand13}</li>
                                                <li>{homeMessage.lifeBrand14}</li>
                                                <li>{homeMessage.lifeBrand15}</li>
                                                <li>{homeMessage.lifeBrand16}</li>
                                                <li>{homeMessage.lifeBrand17}</li>
                                                <li>{homeMessage.lifeBrand18}</li>
                                                <li>{homeMessage.lifeBrand19}</li>
                                                <li>{homeMessage.lifeBrand20}</li>
                                                <li>{homeMessage.lifeBrand21}</li>
                                                <li>{homeMessage.lifeBrand22}</li>
                                                <li>{homeMessage.lifeBrand23}</li>
                                                <li>{homeMessage.lifeBrand24}</li>
                                            </ol>

                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 6) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts">Explore by Life Insurance</Link>
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

export default LifeInsurance;