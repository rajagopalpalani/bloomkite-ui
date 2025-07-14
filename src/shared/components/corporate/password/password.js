import React from 'react';
import ProfileHeader from '../../profileHeader';
import CorporateLeftbar from '../corporateLeftbar';
import Loader from '../../common/loader';
import { maxLength } from '../../../constants/commonRules';
import { corporateMessage } from '../../../constants/corporateConstant';
import { toastrError } from '../../../helpers/toastrHelper';
import { toastrMessage } from '../../../constants/toastrMessage';
import PasswordInput from '../../common/passwordInput';
import { connect } from 'react-redux';
import OtpPopup from '../../otp/otpPopup';
import verifyOtpSelector from '../../../selectors/accountDetails/otpVerification';
import { sendOtp } from '../../../actions/accountDetails/sendOtp';
import CustomReactTooltip from '../../common/customReactTooltip';
import FontIcon from '../../common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { validatePassword, clearValidatePassword } from '../../../actions/advisor';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advId: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            loading: false,
            disableButton: true,
            domLoaded: false,
            phoneNumber: '',
            openPopup: false
        };
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advId) != JSON.stringify(oldProps.advId) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advId: this.props.advId, currentTab: this.props.currentTab, loading: false });
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
    componentDidMount() {
        this.setState({ domLoaded: true });
        this.props.clearValidatePassword();
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
                roleBasedId: this.props.advisorDetails.advId
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
                        roleBasedId: this.props.advId,
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

    state = {
        openPopup: false
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
                        name={this.props.advisorDetails.displayName || (this.props.advisorDetails && this.props.advisorDetails.name)}
                        location={this.props.advisorDetails && this.props.advisorDetails.city}
                        designation={this.props.advisorDetails.designation}
                        handleSave={this.validatePassword}
                        showSaveButton={true}
                        disableButton={this.state.disableButton}
                        onPublish={this.props.onPublish}
                        advisorDetails={this.props.advisorDetails}
                        publicAdvisorDetails={this.props.publicAdvisorDetails}
                        role={true}
                    />
                </div>
                <div className="row col-12 advisor-gap">
                    <OtpPopup
                        openPopup={this.state.openPopup}
                        roleName={'corporate'}
                        phoneNumber={this.props.phoneNumber}
                        onCloseModal={this.onCloseModal}
                        otpType={'password'}
                        handlePassword={this.handlePassword}></OtpPopup>
                    <CorporateLeftbar
                        handleTabChange={this.props.handleTabChange}
                        currentTab={this.props.currentTab}
                        showBrandTag={this.props.showBrandTag}
                        parentPartyId={this.props.advisorDetails.parentPartyId != 0 ? this.props.advisorDetails.parentPartyId : ''}
                    />
                    <div className="col-10 nopadding">
                        <div className="col-12 center-page planning-right row">
                            <div className="page-center bg-white">
                                <form className="form">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label className="password-font">{corporateMessage.passwordOld}</label>
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
                                            <label className="password-font">{corporateMessage.passwordNew}</label>
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
                                            <label className="password-font">{corporateMessage.passwordConfirm}</label>
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
                                {/* <button className="save-btn2" onClick={(e) => this.handlePassword(e)}>SAVE</button> */}
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
