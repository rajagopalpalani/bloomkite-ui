import React from 'react';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';
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
import { connect } from 'react-redux';
import { fetchByInvestorId } from '../../../actions/investor';

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
            phoneNumber: this.props.investorDetails.phoneNumber,
            showVerifyOtp: true
        };
        this.setState({ phoneNumber: this.props.investorDetails.phoneNumber, showVerifyOtp: true });
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
            phoneNumber: this.props.investorDetails.phoneNumber,
            showVerifyOtp: true
        };
        this.setState({ phoneNumber: this.props.investorDetails.phoneNumber, showVerifyOtp: true });
        this.props.sendOtp(options);
    };

    handleVerifyOtp = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.investorDetails.phoneNumber,
            otp: this.state.otp,
            type: 'Mobile Verification'
        };
        this.setState({ phoneNumber: this.props.investorDetails.phoneNumber });
        this.props.verifyOtp(options);
        setTimeout(() => {
            let invId = this.props.investorDetails.invId;
            this.props.fetchByInvestorId(invId);
        }, 1000);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { investorDetails } = this.props;
        const { userName } = investorDetails || {};
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.investorDetails.displayName || (this.props.investorDetails && this.props.investorDetails.name)}
                        location={this.props.investorDetails && this.props.investorDetails.city}
                        designation={this.props.investorDetails.designation}
                        showSaveButton={false}
                        onPublish={this.props.onPublish}
                        investorDetails={this.props.investorDetails}
                        publicinvestorDetails={this.props.publicinvestorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <InvestorLeftbar
                        userName={userName}
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.investorDetails.parentPartyId != 0 ? this.props.investorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page row" style={{ paddingRight: '0px' }}>
                            <div className="page-center bg-white">
                                {investorDetails.isMobileVerified !== 1 && (
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
                                        </div>
                                    </form>
                                )}
                                {investorDetails.isMobileVerified == 1 && <div className="mobile-verified-text"> Your mobile number is verified!</div>}
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
export default connect(mapStateToProps, { sendOtp, verifyOtp, fetchByInvestorId })(MobileVerification);
