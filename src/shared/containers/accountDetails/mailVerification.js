import React, { Component } from 'react';
// import Header from '../../components/MainHeader';
import Loader from '../../components/common/loader';
import { connect } from 'react-redux';

import { verifySignup } from '../../actions/accountDetails/mailVerification';
import { forgetPassword } from '../../actions/accountDetails/forgetPassword';
import verifySignupSelector from '../../selectors/accountDetails/mailVerification';
import { maxLength } from '../../constants/commonRules';
import { verificationMessage } from '../../constants/verificationMessage';
import CustomReactTooltip from '../../components/common/customReactTooltip';
import { resendMail } from '../../actions/accountDetails/resendMail';
import FontIcon from '../../components/common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

class MailVerification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRole: '',
            name: '',
            domLoaded: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    onFromDate = (day) => {
        this.setState({ fromDate: day });
    };

    onToDate = (day) => {
        this.setState({ toDate: day });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleResendMail = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('key');
        let options = {
            key: 'signup',
            token
        };
        this.props.resendMail(options, token);
    };

    componentDidMount() {
        const bloomkite = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        const roleId = bloomkite && bloomkite.roleId;
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        this.props.verifySignup(key);
        let token = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteBusinessUser'));
        this.setState({ currentRole: roleId, token, domLoaded: true });
    }

    render() {
        return (
            <div className="main-container pt-1">
                {/* <Header logout={this.logout} role={this.state.currentRole} signupButton={!this.state.currentRole ? true : false} /> */}
                <div className="col-12 nopadding bg-white">
                    <div className="grid-align">
                        <h1 className="verify-title1">{verificationMessage.mailVerification}</h1>
                        <div className="">
                            <h5 className="verify-title2">{this.props.verifySignupDetails}</h5>
                        </div>
                        {this.props.verifySignupDetails == verificationMessage.expire && (
                            <form className="form">
                                <input
                                    className="forget-text-activation"
                                    autoComplete="off"
                                    name="emailId"
                                    id="emailId"
                                    type="email"
                                    maxLength={maxLength.content}
                                    onChange={this.handleChange}
                                    value={this.state.emailId}
                                />
                                <div className="col-1 box-align active-icon">
                                    <a className="comments-icon-active" id="comments-icon" data-tip data-for="rejectComments">
                                    <FontIcon icon={faInfo} />
                                    </a>
                                    {this.state.domLoaded && (
                                        <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                            <span className="comments-details-activation">{verificationMessage.activationLink} </span>
                                        </CustomReactTooltip>
                                    )}
                                </div>
                                <button className="save-btn2 save-btn3" onClick={(e) => this.handleResendMail(e)}>
                                    SUBMIT
                                </button>
                                <div>{this.props.resendMailDetails}</div>
                            </form>
                        )}
                        {this.props.forgetPasswordDetails}
                    </div>
                </div>
                <Loader loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => verifySignupSelector(state);

export default connect(mapStateToProps, {
    verifySignup,
    forgetPassword,
    resendMail
})(MailVerification);
