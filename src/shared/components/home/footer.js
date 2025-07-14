import React from 'react';
import { Link } from 'react-router-dom';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { homeStaticMessage } from '../../constants/homeStatic';
import { homeMessage } from '../../constants/homeConstant';
import PopUp from '../popup';

const Footer = (props) => {
    return (
        <footer className="bk-home-footer border-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link to="/product" title={homeMessage.productHeader} className="text-muted">
                                    {homeMessage.productHeader}
                                </Link>
                            </li>
                            <li>
                                <Link to="/planning-static" title={homeMessage.planningHeader} className="text-muted">
                                    {homeMessage.planningHeader}
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" title={homeMessage.howitworksHeader} className="text-muted">
                                    {homeMessage.howitworksHeader}
                                </Link>
                            </li>
                            <li>
                                <Link to="/why-us" title={homeMessage.whyusHeader} className="text-muted">
                                    {homeMessage.whyusHeader}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link className="text-muted" title="FAQ" to="/faq">
                                    {`FAQ's`}
                                </Link>
                            </li>
                            <li>
                                <a className="text-muted" href="" data-toggle="modal" title={homeStaticMessage.contactUs} data-target="#myModal12">
                                    {homeStaticMessage.contactUs}
                                </a>
                            </li>
                            <li>
                                <Link className="text-muted" title={homeStaticMessage.privacyPolicy} to="/privacy">
                                    {homeStaticMessage.privacyPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link className="text-muted" title={homeStaticMessage.termsandConditions} to="/terms-conditions">
                                    {homeStaticMessage.termsandConditions}
                                </Link>
                            </li>
                        </ul>
                        <ul className="list-unstyled text-small bloomkite-social">
                            <li className="facebook-icon">
                                <a className="footer-muted" href="#" title="Click here to facebook page">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                        </ul>
                        <PopUp title={'Contact Us'} body={'We would be happy to answer your queries, Please contact us through'} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <Link className="footer-home" title="Bloomkite" to="/">
                            <img className="footer-logo" src="/images/logo_1.svg" alt="bloomkite logo" />
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="copyright-text">{homeStaticMessage.copyRight}</div>
                    </div>
                </div>
                {(props.isHome || props.homeDashboard) && (
                    <div className="disclaimer-footer">
                        <p>{homeMessage.disclaimerHeader}</p>
                        <p>{homeMessage.disclaimerContent1}</p>
                        <p>{homeMessage.disclaimerContent2}</p>
                        <p>{homeMessage.disclaimerContent3}</p>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
