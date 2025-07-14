import React from 'react';
import ProfileHeader from '../../profileHeader';
import { Link } from 'react-router-dom';
import { homeMessage } from '../../../constants/homeConstant';
import classNames from 'classnames';

class Loans extends React.Component {
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
        const loans = ["Overview", "Types", "Benefits", "Eligibility", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        loans={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {loans && loans.map((item, index) => (
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
                                            <p> {homeMessage.loanOverview1} </p>
                                            <p>{homeMessage.loanOverview2}</p>
                                            <p>{homeMessage.loanOverview3}
                                            </p>
                                            <p>{homeMessage.loanOverview4}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            <h5 className="overview-align">{homeMessage.loanHead1}</h5>
                                            <p>
                                                {homeMessage.loanType1}
                                            </p>
                                            <h5 className="overview-align">{homeMessage.loanHead2}</h5>
                                            <p>{homeMessage.loanType2}</p>
                                            <h5 className="overview-align">{homeMessage.loanHead3}</h5>
                                            <p>{homeMessage.loanType3}</p>
                                            <h5 className="overview-align">{homeMessage.loanHead4}</h5>
                                            <p>{homeMessage.loanType4}</p>
                                            <h5 className="overview-align">{homeMessage.loanHead5}</h5>
                                            <p>{homeMessage.loanType5}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.loanBenefits}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div className="overview-size">
                                            <p>{homeMessage.loanEligibility1}</p>
                                            <p>{homeMessage.loanEligibility2}</p>
                                            <p>{homeMessage.loanEligibility3}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 5) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts">Explore by Loans</Link>
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
                                            <Link className="save-btn2 prod-color" to="/experts">Explore by Loans</Link>
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

export default Loans;