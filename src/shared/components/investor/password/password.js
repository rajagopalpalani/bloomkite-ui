import React from 'react';
import ProfileHeader from '../../profileHeader';
import InvestorLeftbar from '../investorLeftbar';
import Loader from '../../common/loader';
import { maxLength } from '../../../constants/commonRules';
import { connect } from 'react-redux';
import OtpPopup from '../../otp/otpPopup';
import { verificationMessage } from '../../../constants/verificationMessage';
import verifyOtpSelector from '../../../selectors/accountDetails/otpVerification';
import { sendOtp } from '../../../actions/accountDetails/sendOtp';
import { toastrError } from '../../../helpers/toastrHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import PasswordInput from '../../common/passwordInput';
import CustomReactTooltip from '../../common/customReactTooltip';
import FontIcon from '../../common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { validatePassword, clearValidatePassword } from '../../../actions/advisor';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investorDetails: this.props.investorDetails,
            invId: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            loading: false,
            disableButton: true,
            phoneNumber: '',
            openPopup: false
        };
    }

    state = {
        openPopup: false
    };

    componentDidMount() {
        this.setState({ domLoaded: true });
        this.props.clearValidatePassword();
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.invId) != JSON.stringify(oldProps.invId) || this.state.currentTab != this.props.currentTab) {
            this.setState({ invId: this.props.invId, currentTab: this.props.currentTab, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
        if (this.props.isPasswordVerified !== oldProps.isPasswordVerified) {
            if (this.props.isPasswordVerified) {
                this.sendOtp();
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                if (this.state.newPassword != '' || this.state.confirmPassword != '' || this.state.currentPassword != '') {
                    if (this.state.newPassword.length >= 8 && this.state.confirmPassword.length >= 8) {
                        if (this.state.newPassword == this.state.confirmPassword) {
                            this.setState({ disableButton: false });
                        } else {
                            this.setState({ disableButton: true });
                        }
                    }
                } else {
                    this.setState({ disableButton: true });
                }
            }
        );
    };

    validatePassword = () => {
        if (!this.state.disableButton) {
            let options = {
                currentPassword: this.state.currentPassword,
                roleBasedId: this.props.investorDetails.invId
            };
            this.props.validatePassword(options);
        }
    };

    sendOtp = () => {
        let options = {
            phoneNumber: this.props.phoneNumber
        };
        this.props.sendOtp(options);
        this.onOpenModal();
    };

    handlePassword = () => {
        if (!this.state.disableButton) {
            if (this.state.newPassword == this.state.confirmPassword) {
                if (this.state.newPassword && this.state.currentPassword && this.state.confirmPassword) {
                    let options = {
                        roleBasedId: this.props.invId,
                        currentPassword: this.state.currentPassword,
                        newPassword: this.state.newPassword,
                        confirmPassword: this.state.confirmPassword
                    };
                    this.props.updatePassword(options);
                    this.setState({ loading: true });
                    this.setState({ disableButton: true });
                } else {
                    toastrError(toastrMessage.emptyError);
                }
            } else {
                this.setState({ disableButton: true });
            }
        }
        this.props.clearValidatePassword();
    };

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    render() {
        return (
            <div>
                <div className="col-12">
                    <ProfileHeader
                        name={this.props.investorDetails && this.props.investorDetails.name}
                        handleSave={this.validatePassword}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        investorDetails={this.props.investorDetails}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <OtpPopup
                        openPopup={this.state.openPopup}
                        roleName={'investor'}
                        phoneNumber={this.props.phoneNumber}
                        onCloseModal={this.onCloseModal}
                        otpType={'password'}
                        handlePassword={this.handlePassword}></OtpPopup>
                    <InvestorLeftbar handleTabChange={this.props.handleTabChange} currentTab={this.props.currentTab} showBrandTag={this.props.showBrandTag} />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="page-center bg-white">
                                <form className="form">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label className="password-font">Old Password</label>
                                        </div>
                                        <div className="col-lg-12">
                                            <PasswordInput
                                                parentClassName="text-box-container password-box"
                                                className="text-box"
                                                name="currentPassword"
                                                maxLength={maxLength.password}
                                                onChange={this.handleChange}
                                                value={this.state.currentPassword}
                                            />
                                            <a className="comments-icon-password" id="comments-icon" data-tip data-for="rejectComments">
                                                <FontIcon icon={faInfo} />
                                            </a>
                                            {this.state.domLoaded && (
                                                <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                    <span className="comments-details">
                                                        Password must be 8-16 characters
                                                        <br />
                                                        one capital
                                                        <br /> one special character
                                                        <br />
                                                        numeric value
                                                    </span>
                                                </CustomReactTooltip>
                                            )}
                                        </div>
                                        <div className="col-lg-12">
                                            <label className="password-font">New Password</label>
                                        </div>
                                        <div className="col-lg-12">
                                            <PasswordInput
                                                parentClassName="text-box-container password-box"
                                                className="text-box"
                                                name="newPassword"
                                                maxLength={maxLength.password}
                                                onChange={this.handleChange}
                                                value={this.state.newPassword}
                                            />
                                            <a className="comments-icon-password" id="comments-icon" data-tip data-for="rejectComments">
                                                <FontIcon icon={faInfo} />
                                            </a>
                                            {this.state.domLoaded && (
                                                <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                    <span className="comments-details">
                                                        Password must be 8-16 characters
                                                        <br />
                                                        one capital
                                                        <br /> one special character
                                                        <br />
                                                        numeric value
                                                    </span>
                                                </CustomReactTooltip>
                                            )}
                                        </div>
                                        <div className="col-lg-12">
                                            <label className="password-font">Confirm Password</label>
                                        </div>
                                        <div className="col-lg-12">
                                            <PasswordInput
                                                parentClassName="text-box-container password-box"
                                                className="text-box"
                                                name="confirmPassword"
                                                maxLength={maxLength.password}
                                                onChange={this.handleChange}
                                                value={this.state.confirmPassword}
                                            />
                                            <a className="comments-icon-password" id="comments-icon" data-tip data-for="rejectComments">
                                                <FontIcon icon={faInfo} />
                                            </a>
                                            {this.state.domLoaded && (
                                                <CustomReactTooltip id="rejectComments" type="info" effect="solid">
                                                    <span className="comments-details">
                                                        Password must be 8-16 characters
                                                        <br />
                                                        one capital
                                                        <br /> one special character
                                                        <br />
                                                        numeric value
                                                    </span>
                                                </CustomReactTooltip>
                                            )}
                                        </div>
                                    </div>
                                </form>
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
export default connect(mapStateToProps, { sendOtp, validatePassword, clearValidatePassword })(Password);
