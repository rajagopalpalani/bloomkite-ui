import React, { Component } from 'react';
// import Header from '../components/mainHeader';
import loginSelector from '../selectors/login';
import { connect } from 'react-redux';
import { homeStaticMessage } from '../constants/homeStatic';

class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: ''
        };
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    componentDidMount() {
        const bloomkite = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        const roleId = bloomkite && bloomkite.roleId;
        let token = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteBusinessUser'));
        this.setState({ currentRole: roleId, token });
    }

    render() {
        return (
            <div>
                {/* <Header logout={this.logout} role={this.state.currentRole} signupButton={!this.state.currentRole ? true : false} /> */}
                <div className="container container how-it-deisgns main-container pt-1">
                    <div className="col-12 nopadding">
                        <div className="policy-center">
                            <h1 className="heading">{homeStaticMessage.privacyPolicy}</h1>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.policyIntroduction}</h3>
                                {homeStaticMessage.privacyInfo}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.personalInformationWeCollect}</h3>
                                {homeStaticMessage.primaryWeCollectInformation}
                            </div>
                            <ul className="privacy" type="1">
                                <li>{homeStaticMessage.policyCollectInfo1}</li>
                                <li>{homeStaticMessage.policyCollectInfo2}</li>
                            </ul>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.policyProvideUs}</h3>
                                {homeStaticMessage.policyProvideUsInformation}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.InformationWeAutomaticallyCollect}</h3>
                                {homeStaticMessage.policyWeAutomaticallyCollectInfo}
                            </div>
                            <ul className="privacy">
                                <li>{homeStaticMessage.policyListRegularUser}</li>
                                <li>{homeStaticMessage.policyListYourIdentity}</li>
                                <li>{homeStaticMessage.policyListWebsiteExperienceTarget}</li>
                                <li>{homeStaticMessage.policyListProgress}</li>
                                <li>{homeStaticMessage.policyListMeasureAnalyzeWebsite}</li>
                                <li>{homeStaticMessage.policyListCompileStatistics}</li>
                                <li>{homeStaticMessage.policyListConductOtherResearch}</li>
                            </ul>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.shareInformationAboutYou}</h3>
                                {homeStaticMessage.policyHowWeShareInformationAboutYou}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.yourChoices}</h3>
                                {homeStaticMessage.yourChoicesInformation}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.security}</h3>
                                {homeStaticMessage.securityInformation}
                                <br></br>
                                <div>{homeStaticMessage.securityInfo}</div>
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.rightKnowAccessInformation}</h3>
                                {homeStaticMessage.rightKnowAccessInfo}
                            </div>
                        </div>
                        <div className="">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.deletionInformation}</h3>
                                {homeStaticMessage.policyDeletionInformation}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.changesPrivacyPolicy}</h3>
                                {homeStaticMessage.changesPrivacyPolicyInfo}
                            </div>
                        </div>
                        <div className="policy">
                            <div className="privacy">
                                <h3 className="policy-heading">{homeStaticMessage.policyContact}</h3>
                                {homeStaticMessage.policyContactInfo} <a href="mailto:info@bloomkite.com">info@bloomkite.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => loginSelector(state);

export default connect(mapStateToProps, {})(Privacy);
