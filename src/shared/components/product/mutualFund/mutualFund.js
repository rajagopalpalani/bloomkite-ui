import React from 'react';
import ProfileHeader from '../../profileHeader';
import { Link } from 'react-router-dom';
import { homeMessage } from '../../../constants/homeConstant';
import classNames from 'classnames';

class MutualFunds extends React.Component {
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
        const mutualFunds = ["Overview", "Types", "Benefits", "Eligibility", "Brands", "Explore"];
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        showProduct={true}
                        mutualFunds={true}
                        advisorDetails={this.props.advisorDetails}
                    />
                </div>
                <div className="prod-design">
                    <h1 className="heading-product">{homeMessage.productHeader}</h1>
                    <div className="row col-12">
                        <div className="col-2 advisor-leftside bg-white nopadding nomargin">
                            <div className="left-advisor-sidebar">
                                <ul>
                                    {mutualFunds && mutualFunds.map((item, index) => (
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
                                            {/* <h5 className="overview-align">Overview</h5> */}
                                            <p>{homeMessage.mutualOverview1}</p>
                                            <p>{homeMessage.mutualOverview2}</p>
                                            <p>{homeMessage.mutualOverview3}</p>
                                            <p>{homeMessage.mutualOverview4}</p>
                                            <p>{homeMessage.mutualOverview5}</p>
                                            <p>{homeMessage.mutualOverview6}</p>
                                            <p>{homeMessage.mutualOverview7}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 2) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Common Types of Mutual Funds</h5> */}
                                            <h5 className="overview-align">{homeMessage.mutualtypeHeader1}</h5>
                                            <p>{homeMessage.mutualType1}</p>
                                            <p>{homeMessage.mutualType2}<strong>{homeMessage.mutualType21}</strong> {homeMessage.mutualType22}</p>
                                            <p>{homeMessage.mutualType3}</p>
                                            <p>{homeMessage.mutualType4}</p>
                                            <h5 className="overview-align">{homeMessage.mutualtypeHeader2}</h5>
                                            <p>{homeMessage.mutualType5}</p>
                                            <p>{homeMessage.mutualType6}</p>
                                            <h5 className="overview-align">{homeMessage.mutualtypeHeader3}</h5>
                                            <p>{homeMessage.mutualType7}</p>
                                            <h5 className="overview-align">{homeMessage.mutualtypeHeader4}</h5>
                                            <p>{homeMessage.mutualType8}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 3) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Benefits of Investing in Mutual Funds</h5> */}
                                            <p>{homeMessage.mutualBenefits1}</p>
                                            <p>{homeMessage.mutualBenefits2} </p>
                                            <h5 className="overview-align">{homeMessage.mutualbenefitsHeader1}</h5>
                                            <p>{homeMessage.mutualBenefits3}</p>
                                            <h5 className="overview-align">{homeMessage.mutualbenefitsHeader2}</h5>
                                            <p>{homeMessage.mutualBenefits4}</p>
                                            <h5 className="overview-align">{homeMessage.mutualbenefitsHeader3}</h5>
                                            <p>{homeMessage.mutualBenefits5}</p>
                                            <h5 className="overview-align">{homeMessage.mutualbenefitsHeader4}</h5>
                                            <p>{homeMessage.mutualBenefits6}</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 4) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Eligibility</h5> */}
                                            <ol className="product-pointer">
                                                <li>{homeMessage.mutualEligibility1}</li>
                                                <li>{homeMessage.mutualEligibility2}</li>
                                                <li>{homeMessage.mutualEligibility3}</li>
                                                <li>{homeMessage.mutualEligibility4}</li>
                                                <li>{homeMessage.mutualEligibility5}</li>
                                                <li>{homeMessage.mutualEligibility6}</li>
                                                <li>{homeMessage.mutualEligibility7}</li>
                                                <li>{homeMessage.mutualEligibility8}</li>
                                                <li>{homeMessage.mutualEligibility9}</li>
                                                <li>{homeMessage.mutualEligibility10}</li>
                                                <li>{homeMessage.mutualEligibility11}</li>
                                                <li>{homeMessage.mutualEligibility12}</li>
                                                <li>{homeMessage.mutualEligibility13}</li>
                                                <li>{homeMessage.mutualEligibility14}</li>
                                                <li>{homeMessage.mutualEligibility15}</li>
                                                <li>{homeMessage.mutualEligibility16}</li>
                                                <li>{homeMessage.mutualEligibility17}</li>
                                                <li>{homeMessage.mutualEligibility18}</li>
                                            </ol>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 5) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Brands or AMC</h5> */}
                                            <ul className="product-pointer">
                                                <li>{homeMessage.mutualBrand1}</li>
                                                <li>{homeMessage.mutualBrand2}</li>
                                                <li>{homeMessage.mutualBrand3}</li>
                                                <li>{homeMessage.mutualBrand4}</li>
                                                <li>{homeMessage.mutualBrand5}</li>
                                                <li>{homeMessage.mutualBrand6}</li>
                                                <li>{homeMessage.mutualBrand7}</li>
                                                <li>{homeMessage.mutualBrand8}</li>
                                                <li>{homeMessage.mutualBrand9}</li>
                                                <li>{homeMessage.mutualBrand10}</li>
                                                <li>{homeMessage.mutualBrand11}</li>
                                                <li>{homeMessage.mutualBrand12}</li>
                                                <li>{homeMessage.mutualBrand13}</li>
                                                <li>{homeMessage.mutualBrand14}</li>
                                                <li>{homeMessage.mutualBrand15}</li>
                                                <li>{homeMessage.mutualBrand16}</li>
                                                <li>{homeMessage.mutualBrand17}</li>
                                                <li>{homeMessage.mutualBrand18}</li>
                                                <li>{homeMessage.mutualBrand19}</li>
                                                <li>{homeMessage.mutualBrand20}</li>
                                                <li>{homeMessage.mutualBrand21}</li>
                                                <li>{homeMessage.mutualBrand22}</li>
                                                <li>{homeMessage.mutualBrand23}</li>
                                                <li>{homeMessage.mutualBrand24}</li>
                                                <li>{homeMessage.mutualBrand25}</li>

                                            </ul>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 6) &&
                                        <div>
                                            <Link className="save-btn2 prod-color" to="/experts">Explore by Mutual Funds</Link>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 7) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Categories of Mutual Fund</h5> */}
                                            <ol className="product-pointer">
                                                <li>Large Cap Funds</li>
                                                <li>Mid-Cap Funds</li>
                                                <li>Small - Cap Funds</li>
                                                <li>Sector Fund (Infra, Power, Real Estate)</li>
                                            </ol>
                                            <p>Investment can be made via lump sum investment or through SIP(Systematic Investment Plan mode in any of these fund categories</p>
                                        </div>
                                    }
                                    {
                                        (this.state.currentTab == 8) &&
                                        <div className="overview-size">
                                            {/* <h5 className="overview-align">Definitions</h5> */}
                                            <h5 className="overview-align">NFO:</h5>
                                            <p>NFO or New Fund Offer is the term given to a new fund offering for purchasing units of a mutual fund scheme by an AMC. For close-ended schemes, the NFO period is the only period for starting an investment.</p>
                                            <h5 className="overview-align">SIP:</h5>
                                            <p>A mutual fund gives you an option of either investing in a lump sum or through a Systematic Investment Plan or SIP, breaking the amount into periodic investments over a long period. For example, if Ravi wants to invest Rs 60,000 annually in a mutual fund scheme and doesn't have the lump sum amount available, he can opt for a SIP of Rs 5,000 every month.</p>
                                            <h5 className="overview-align">NAV:</h5>
                                            <p>NAV or Net Asset Value is the price of each unit of a mutual fund. During the NFO, when the mutual fund scheme is introduced, it is priced at the face value - typically Rs 10. Later it may rise or fall depending on the performance of the fund. For example, if Ravi is investing Rs 60,000 as a lump sum during the NFO period, he will get 6000 units (Rs 60,000/Rs 10), each having an NAV of Rs 10.</p>
                                            <h5 className="overview-align">Sales Price:</h5>
                                            <p>If the mutual fund scheme is an existing open-ended scheme, then the sales price is the price or NAV charged per unit for sale of units to the unit holder.</p>
                                            <h5 className="overview-align">Load:</h5>
                                            <p>Load is the fee charged (percentage of the NAV) by a mutual fund when you buy or sell units of a mutual fund. In India, presently there is no entry load when an investor buys mutual fund units. However, an exit load or a back-end load is applicable in some cases. It is the charge paid by an investor when he/she sells the units of a mutual fund before a specified period. It is deducted from the applicable NAV on redemption. It is generally levied to discourage early withdrawals.</p>
                                            <h5 className="overview-align">Repurchase Price:</h5>
                                            <p>Repurchase price is the NAV minus the exit load (if applicable).</p>
                                            <h5 className="overview-align">AUM:</h5>
                                            <p>Assets Under Management or AUM is the total value of all investments managed by the mutual fund. It can be at a scheme level or plan level.</p>
                                            <h5 className="overview-align">Portfolio:</h5>
                                            <p>Similarly, a portfolio refers to all investments made by a mutual fund scheme and the amount held in cash.</p>
                                            <h5 className="overview-align">Expense Ratio:</h5>
                                            <p>The expense ratio of a mutual fund is calculated by dividing the total expenses the fund has incurred by its AUM. It gives the cost, a mutual fund incurs, for managing each unit. A mutual fund deducts these expenses from the NAV before declaring it on a daily basis. The expense ratio is also disclosed once every six months in the scheme financials. It is also made available on the website of the mutual fund.</p>
                                            <h5 className="overview-align">Redemption/Repurchase:</h5>
                                            <p>Redemption/Repurchase is the buying back or cancellation of units by a mutual fund. It can happen on maturity or on an on-going basis.</p>
                                            <h5 className="overview-align">Switch:</h5>
                                            <p>An investor also has an option of switching or transferring his or her investment from one scheme to another scheme of the same fund house.</p>
                                            <h5 className="overview-align">STP:</h5>
                                            <p>An STP or Systematic Transfer Plan can be used in volatile markets to gradually transfer or switch small amounts of investments at chosen intervals (days/months/quarter) from one scheme to another scheme of a mutual fund. It is essentially used to transfer investments from one asset type to another.</p>
                                            <h5 className="overview-align">SWP:</h5>
                                            <p>Many mutual funds provide the facility of Systematic Withdrawal Plans or SWPs whereby the investor receives a predetermined amount on a periodic basis from the invested scheme. Investors who need regular income, like retirees, often go for this option. The payments are usually given from the fund's dividend income or capital gain distribution</p>
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

export default MutualFunds;