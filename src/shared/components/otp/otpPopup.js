import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyOtp, clearMessage } from '../../actions/accountDetails/otpVerification';
import verifyOtpSelector from '../../selectors/accountDetails/otpVerification';
import { verificationMessage } from '../../constants/verificationMessage';
import { Link } from 'react-router-dom';
import CustomModal from '../common/customModal';
import { sendOtp } from '../../actions/accountDetails/sendOtp';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
};

class OtpPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            phoneNumber: '',
            resend: false
        };
    }
    handleChange = (event) => {
        this.setState({ otp: event.target.value });
    };

    componentDidUpdate() {
        if (this.props.verifyOtpDetails.verifyOtpMessage == verificationMessage.otpVerification) {
            this.props.onCloseModal();
        }
        if (this.props.verifyOtpDetails.isVerified) {
            if (this.props.otpType === 'deletePlan') {
                this.props.handleDeletePlan();
            }
            if (this.props.otpType === 'sharePlan') {
                this.props.handleSharePlan();
            }
            if (this.props.otpType === 'downloadPlan') {
                this.props.downloadHandler();
            }
            if (this.props.otpType === 'password') {
                this.props.handlePassword();
            }
            setTimeout(
                function () {
                    this.props.clearMessage();
                    this.setState({ otp: '' });
                }.bind(this),
                3000
            );
        }
        if (this.props.openPopup) {
            setTimeout(() => {
                this.setState({
                    resend: true
                });
            }, 60000);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.phoneNumber,
            otp: this.state.otp
        };
        this.props.verifyOtp(options);
    };

    handleSendOtp = (event) => {
        event.preventDefault();
        let options = {
            phoneNumber: this.props.phoneNumber
        };
        this.props.sendOtp(options);
    };

    render() {
        return (
            <div style={styles}>
                <CustomModal open={this.props.openPopup} showCloseIcon={false} closeOnOverlayClick={false}>
                    <div>
                        <h4 className="heading-otp">OTP verification</h4>
                        <div className="modal-body-otp">Enter OTP sent to your phonenumber, your otp will expire in 30 min</div>
                        <div className="input-otp">
                            <label>
                                <input type="text" value={this.state.otp} onChange={this.handleChange} autoComplete="off" />
                            </label>
                        </div>
                        <div className="modal-footer">
                            {/* <button onClick={this.props.onCloseModal} className="btn btn-light">Cancel</button> */}
                            {this.props.roleName == 'advisor' && (
                                <Link to="/advisor" className="btn btn-light">
                                    Cancel
                                </Link>
                            )}
                            {this.props.roleName == 'investor' && (
                                <Link to="/investor" className="btn btn-light">
                                    Cancel
                                </Link>
                            )}
                            {this.props.roleName == 'corporate' && (
                                <Link to="/corporate" className="btn btn-light">
                                    Cancel
                                </Link>
                            )}
                            {this.state.resend && (
                                <a href="" onClick={this.handleSendOtp}>
                                    Resend OTP
                                </a>
                            )}
                            {this.props.roleName == 'planning' && (
                                <Link to="/planning-list" className="btn btn-light">
                                    Cancel
                                </Link>
                            )}
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => verifyOtpSelector(state);
export default connect(mapStateToProps, { verifyOtp, clearMessage, sendOtp })(OtpPopup);
