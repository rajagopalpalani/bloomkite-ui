import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { homeMessage } from '../constants/homeConstant';
import { headerSelector } from '../selectors/header';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../components/common/fontAwesomeIcon';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideOpen: false
        };
    }

    sideOpen = () => {
        this.setState({ sideOpen: !this.state.sideOpen });
    };

    render() {
        const { location } = this.props;
        const { pathname } = location || {};
        const isDevelopment = __ENV__ == 'DEV';
        return (
            <div className="gray-border1 header-fixed">
                <div className="container p-0">
                    <div className="row">
                        <div className="cl--lg-12 cl--xs-12">
                            <div className="prod-design">
                                <nav className={`navbar navbar-expand-lg navbar-light user-header`} id="header">
                                    <Link to="/" className={`navbar-brand logo-content`}>
                                        <img src="/images/logo.svg" alt="bloomkite logo" />
                                    </Link>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarNav"
                                        aria-controls="navbarNav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation">
                                        <FontIcon icon={faBars} />
                                        {/* <span className="navbar-toggler-icon"></span> */}
                                    </button>
                                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                        <ul className="nav navbar-nav">
                                            {/* <li className="nav-item-home">
                                                <Link to="/product" className={classNames('roundButton', { active: pathname == '/product' })}>
                                                    {homeMessage.productHeader}
                                                </Link>
                                            </li>
                                            <li className="nav-item-home">
                                                <Link to="/planning-static" className={classNames('roundButton', { active: pathname == '/planning-static' })}>
                                                    {homeMessage.planningHeader}
                                                </Link>
                                            </li> */}
                                            <li className="nav-item-home">
                                                <Link to="/plans" className={classNames('roundButton', { active: pathname == '/plans' })}>
                                                    {homeMessage.calculatorHeader}
                                                </Link>
                                            </li>
                                            <li className="nav-item-home">
                                                <Link to="/experts" className={classNames('roundButton', { active: pathname == '/experts' })}>
                                                    {homeMessage.exploreHeader}
                                                </Link>
                                            </li>
                                            {/* <li className="nav-item-home">
                                                <Link to="/how-it-works" className={classNames('roundButton', { active: pathname == '/how-it-works' })}>
                                                    {homeMessage.howitworksHeader}
                                                </Link>
                                            </li>
                                            <li className="nav-item-home">
                                                <Link to="/why-us" className={classNames('roundButton', { active: pathname == '/why-us' })}>
                                                    {homeMessage.whyusHeader}
                                                </Link>
                                            </li> */}
                                            <li className="nav-item-home hidden-lg-up">
                                                <Link className="dropdown-item" to="/signup?role=1">
                                                    Signup {homeMessage.asAdvisor}
                                                </Link>
                                                {/* <button
                                                    className="buttonsign dropdown-toggle"
                                                    role="button"
                                                    id="dropdownMenuLink"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <a className="roundButton">Signup</a>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <Link className="dropdown-item" to="/signup">Investor</Link> 
                                                        
                                                    </div>
                                                </button>*/}
                                            </li>
                                            <li className="nav-item-home hidden-lg-up">
                                                <Link className="dropdown-item" to="/signup?role=3">
                                                    Signup {homeMessage.asCompany}
                                                </Link>
                                            </li>
                                            {isDevelopment && (
                                                <li className="nav-item-home hidden-lg-up">
                                                    <Link className="dropdown-item" to="/signup?role=2">
                                                        Signup {homeMessage.asInvestor}
                                                    </Link>
                                                </li>
                                            )}
                                            <li className="nav-item-home hidden-lg-up">
                                                <button className="buttonsign login-btn">
                                                    <Link to="/login" className={`roundButton`}>
                                                        {homeMessage.loggingIn}
                                                    </Link>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="home-header1 hidden-lg-down">
                                        <div className="dropdown show">
                                            <button
                                                className="buttonsign signup-btn dropdown-toggle"
                                                role="button"
                                                id="dropdownMenuLink1"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <a className="roundButton">Signup</a>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                                {isDevelopment && (
                                                    <Link className="dropdown-item" to="/signup?role=2">
                                                        {homeMessage.asInvestor}
                                                    </Link>
                                                )}
                                                <Link className="dropdown-item" to="/signup?role=1">
                                                    {homeMessage.asAdvisor}
                                                </Link>
                                                <Link className="dropdown-item" to="/signup?role=3">
                                                    {homeMessage.asCompany}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-header2 hidden-lg-down">
                                        <button className="buttonsign login-btn">
                                            <Link to="/login" className={`roundButton`}>
                                                {homeMessage.loggingIn}
                                            </Link>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => headerSelector(state);

export default connect(mapStateToProps, {})(withRouter(MainHeader));
