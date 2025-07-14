import React, { Component } from 'react';
import Header from '../../components/userHeader';
import Loader from '../../components/common/loader';
import { fetchByAdvisorID } from '../../actions/advisor';
import { advisorSelector } from '../../selectors/advisor';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FinancialPlanning from '../../components/product/financialPlanning/financialPlanning';
import EquityInvestments from '../../components/product/equityInvestment/equityInvestment';
import MutualFunds from '../../components/product/mutualFund/mutualFund';
import PortfolioManagement from '../../components/product/portfolioManagement/portfolioManagement';
import FixedIncome from '../../components/product/fixedIncome/fixedIncome';
import LifeInsurance from '../../components/product/lifeInsurance/lifeInsurance';
import GeneralInsurance from '../../components/product/generalInsurance/generalInsurance';
import HealthInsurance from '../../components/product/healthInsurance/healthInsurance';
import Loans from '../../components/product/loans/loans';
import PersonalLoans from '../../components/product/personalLoans/personalLoans';
import HomeLoans from '../../components/product/homeLoans/homeLoans';
import LoanAgainstProperty from '../../components/product/loanAgainstProperty/loanAgainstProperty';
import RealEstate from '../../components/product/realEstate/realEstate';
import Taxation from '../../components/product/taxation/taxation';
// import MainHeader from '../../components/MainHeader';
import Footer from '../../components/home/footer';
import { homeMessage } from '../../constants/homeConstant';
import ErrorBoundary from '../errorBoundary';

class Product extends Component {
    constructor(props) {
        const { advisorDetails } = props;
        super(props);
        this.state = {
            currentRole: '',
            name: '',
            titleContainer: true,
            advisorDetails
        };
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    handleTabChange = (index) => {
        this.setState({ currentTab: index, titleContainer: false, productTitle: index });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleEmpty = () => {
        this.setState({ titleContainer: true, productTitle: 0 });
    };

    productList = ['Financial Planning', 'Equity Investments', 'Mutual Funds', 'Fixed Income', 'Life Insurance', 'Loans', 'Health Insurance', 'General Insurance'];

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <div className="container main-container pt-1">
                        <div className="col-12 bg-white nopadding plan-overview-size">
                            {this.state.titleContainer && (
                                <ul className="new-product">
                                    <h1 className="heading">{homeMessage.productHeader}</h1>
                                    <div className="col-12 row nopadding nomargin">
                                        <div className="col-12 row design-sample">
                                            {this.productList.map((item, i) => (
                                                <li
                                                    className={classNames({
                                                        'new-prod-title': (i + 1) % 2 != 0,
                                                        'new-prod-title1': (i + 1) % 2 == 0,
                                                        active: this.props.productTitle == i + 1
                                                    })}>
                                                    <a className="product-static-heading" onClick={() => this.handleTabChange(i + 1)}>
                                                        {item}
                                                    </a>
                                                    <span>
                                                        <img className="left-img" src={`/images/product/product-${i + 1}.png`} alt="product" />
                                                    </span>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </ul>
                            )}
                            {!this.state.titleContainer && (
                                <div>
                                    {this.state.productTitle == 1 && <FinancialPlanning />}
                                    {this.state.productTitle == 2 && <EquityInvestments />}
                                    {this.state.productTitle == 3 && <MutualFunds />}
                                    {/* {
                                    (this.state.productTitle == 4) &&
                                    <PortfolioManagement />
                                } */}
                                    {this.state.productTitle == 4 && <FixedIncome />}
                                    {this.state.productTitle == 5 && <LifeInsurance />}
                                    {this.state.productTitle == 6 && <Loans />}
                                    {this.state.productTitle == 7 && <HealthInsurance />}
                                    {this.state.productTitle == 8 && <GeneralInsurance />}
                                    
                                    {/* {
                                    (this.state.productTitle == 10) &&
                                    <PersonalLoans />
                                }
                                {
                                    (this.state.productTitle == 11) &&
                                    <HomeLoans />
                                }
                                {
                                    (this.state.productTitle == 12) &&
                                    <LoanAgainstProperty />
                                } */}
                                    {/* {
                                    (this.state.productTitle == 13) &&
                                    <RealEstate />
                                } */}
                                    {/* {
                                    (this.state.productTitle == 14) &&
                                    <Taxation />
                                } */}
                                </div>
                            )}
                        </div>
                    </div>
                    <Loader loading={this.state.loading} />
                    {/* <Footer /> */}
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => advisorSelector(state);

Product.defaultProps = {
    advisorDetails: {}
};

export default connect(mapStateToProps, {
    fetchByAdvisorID
})(Product);
