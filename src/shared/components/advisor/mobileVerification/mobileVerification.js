import React from 'react';
import ProfileHeader from '../../profileHeader';
import AdvisorLeftbar from '../advisorLeftbar';
import Loader from '../../common/loader';
import { maxLength } from '../../../constants/commonRules';
import { advisorMessage } from '../../../constants/advisorConstant';
import { toastrError } from '../../../helpers/toastrHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import PasswordInput from '../../common/passwordInput';
import OtpPopup from '../../otp/otpPopup';
import { verificationMessage } from '../../../constants/verificationMessage';
import verifyOtpSelector from '../../../selectors/accountDetails/otpVerification';
import { sendOtp } from '../../../actions/accountDetails/sendOtp';
import { verifyOtp } from '../../../actions/accountDetails/otpVerification';
import { fetchByAdvisorID } from '../../../actions/advisor';
import { connect } from 'react-redux';

class MobileVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            phoneNumber: '',
            showVerifyOtp: false,
            resend: false
        };
    }
    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advId) != JSON.stringify(oldProps.advId) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advId: this.props.advId, currentTab: this.props.currentTab, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }
    componentDidMount() {
        // this.onOpenModal();
        this.setState({ domLoaded: true });
    }

    handleSendOtp = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.advisorDetails.phoneNumber,
            showVerifyOtp: true
        };
        this.setState({ phoneNumber: this.props.advisorDetails.phoneNumber, showVerifyOtp: true });
        this.props.sendOtp(options);
        setTimeout(() => {
            this.setState({
                resend: true
            });
        }, 60000);
    };

    handleReSendOtp = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.advisorDetails.phoneNumber,
            showVerifyOtp: true
        };
        this.setState({ phoneNumber: this.props.advisorDetails.phoneNumber, showVerifyOtp: true });
        this.props.sendOtp(options);
    };

    handleVerifyOtp = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.advisorDetails.phoneNumber,
            otp: this.state.otp,
            type: 'Mobile Verification'
        };
        this.setState({ phoneNumber: this.props.advisorDetails.phoneNumber });
        this.props.verifyOtp(options);
        setTimeout(() => {
            let advId = this.props.advisorDetails.advId;
            this.props.fetchByAdvisorID(advId);
        }, 1000);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value
    //     }, () => {
    //         if (this.state.newPassword != "" || this.state.confirmPassword != "" || this.state.currentPassword != "") {
    //             if (this.state.newPassword.length > 8 && this.state.confirmPassword.length > 8) {
    //                 if (this.state.newPassword == this.state.confirmPassword) {
    //                     this.setState({ disableButton: false });
    //                 } else {
    //                     this.setState({ disableButton: true });
    //                 }
    //             }
    //         } else {
    //             this.setState({ disableButton: true });
    //         }
    //     });
    // }

    render() {
        const { advisorDetails } = this.props;
        const { userName } = advisorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        showSaveButton={false}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                        publicAdvisorDetails={this.props.publicAdvisorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <AdvisorLeftbar
                        userName={userName}
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page row" style={{ paddingRight: '0px' }}>
                            <div className="page-center bg-white">
                                {advisorDetails.isMobileVerified !== 1 && (
                                    <form className="form">
                                        <div className="row">
                                            {!this.state.showVerifyOtp && (
                                                <div className="col-lg-12">
                                                    <button className="otp-save-btn" onClick={(e) => this.handleSendOtp(e)}>
                                                        SEND OTP
                                                    </button>
                                                    <br />
                                                    <br />
                                                </div>
                                            )}

                                            {this.state.showVerifyOtp && (
                                                <div>
                                                    <div className="col-lg-12">
                                                        {/* <div className="otp-text-box" onChange={this.handleChange} /> */}
                                                        <input
                                                            className="text-border-pi"
                                                            type="text"
                                                            name="otp"
                                                            id="otp"
                                                            value={this.state.otp}
                                                            onChange={this.handleChange}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <span className="col-lg-12">
                                                        <button type="button" className="btn-verify" data-dismiss="modal" onClick={this.handleVerifyOtp}>
                                                            Verify OTP
                                                        </button>
                                                    </span>
                                                    {this.state.resend && (
                                                        <span>
                                                            <a href="" onClick={this.handleReSendOtp}>
                                                                Resend OTP
                                                            </a>
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* <label>
                            <input type="text" value={this.state.otp} onChange={this.handleChange} autoComplete="off" />
                        </label> */}
                                        </div>
                                    </form>
                                )}
                                {advisorDetails.isMobileVerified == 1 && <div className="mobile-verified-text"> Your mobile number is verified!</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.loading} />
            </div>
        );
    }
}

// export default Password;
const mapStateToProps = (state) => verifyOtpSelector(state);
export default connect(mapStateToProps, { sendOtp, verifyOtp, fetchByAdvisorID })(MobileVerification);
