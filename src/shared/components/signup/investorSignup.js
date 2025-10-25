import React from 'react';
import moment from 'moment';
import { Link, Navigate } from 'react-router-dom';
import CustomReactTooltip from '../common/customReactTooltip';
import { signupUser } from '../../actions/signup';
import signupSelector from '../../selectors/signup';
import { signupMessage } from '../../constants/signupInfo';
import { connect } from 'react-redux';
import PopUp from '../popup';
import {
    maxLength,
    validEmailRegex,
    validInvestorPANnumberRegex,
    validPasswordRegex,
    validPhoneNumberRegex,
    validPincodeNumberRegex,
    checkboxTermsAndConditionsMessage,
    panMethod,
    numberMethod,
    contentMethod
} from '../../constants/commonRules';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';
import CustomDatePicker from '../common/datePicker';
import FontIcon from '../common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import TermsAndConditionPopup from '../termsAndConditionPopup';

class InvestorSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            fullName: '',
            displayName: '',
            pincode: '',
            dob: '',
            gender: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            roleId: 2,
            redirect: false,
            submitted: false,
            domLoaded: false,
            openPopup: false,
            clear: false,
            termsConditions: false,
            fullNameError: false,
            pincodeError: false,
            phoneNumberError: false,
            emailIdError: false,
            passwordError: false,
            confirmPasswordError: false
        };
    }

    componentDidUpdate(oldProps) {
        if (!this.state.redirect && this.state.submitted && JSON.stringify(this.props.loggedDetails) != JSON.stringify(oldProps.loggedDetails)) {
            this.setState({ redirect: true, submitted: false });
        }
    }
    componentDidMount() {
        this.setState({ domLoaded: true });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFocus = (e) => {
        const { name, value } = e.target;
        this.setState({ [`${name}Info`]: true });
    };

    handleBlur = (e) => {
        const { name, value } = e.target;
        let fullNameError = false;
        let displayNameError = false;
        // let dobError = false;
        let pincodeError = false;
        let phoneNumberError = false;
        let emailIdError = false;
        let passwordError = false;
        let confirmPasswordError = false;
        if (name === 'fullName') {
            fullNameError = value.length < 3;
            fullNameError && toastrError(toastrMessage.emptyName);
            this.setState({ fullNameError: fullNameError })
        }
        if (name === 'pincode') {
            pincodeError = !validPincodeNumberRegex.test(value);
            pincodeError && toastrError(toastrMessage.emptyPincode);
            this.setState({ pincodeError: pincodeError })
        }
        if (name === 'phoneNumber') {
            phoneNumberError = !validPhoneNumberRegex.test(value);
            phoneNumberError && toastrError(toastrMessage.emptyPhoneNumber);
            this.setState({ phoneNumberError: phoneNumberError })
        }
        if (name === 'emailId') {
            emailIdError = !validEmailRegex.test(value);
            emailIdError && toastrError(toastrMessage.emptyMail);
            this.setState({ emailIdError: emailIdError })
        }
        if (name === 'password') {
            passwordError = !validPasswordRegex.test(value);
            passwordError && toastrError(toastrMessage.emptyPassword);
            this.setState({ passwordError: passwordError })
        }
        if (name === 'confirmPassword') {
            confirmPasswordError = this.state.password !== value;
            confirmPasswordError && toastrError(toastrMessage.emptyConfirmPassword);
            this.setState({ confirmPasswordError: confirmPasswordError })
        }
        this.setState({ [`${name}Info`]: false });
    };

    handleCheckBox = (e) => {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    };

    handleDate = (day) => {
        var testDateUtc = moment.utc(this.state.dob);
        var localDate = testDateUtc.local();
        this.setState({ dob: day });
        if (this.props.dob != localDate.format('MM-DD-YYYY')) {
            this.setState({ disableButton: false });
        } else {
            this.setState({ disableButton: true });
        }
    };

    handleSignup = (e) => {
        console.log("Create Account 2025");
        e.preventDefault();

        if (
            this.state.emailId != '' &&
            this.state.fullName != '' &&
            this.state.pincode != '' &&
            this.state.password != '' &&
            this.state.phoneNumber != '' &&
            this.state.confirmPassword != ''
        ) {
            if (this.state.fullName.length > 3) {
                if (validEmailRegex.test(this.state.emailId)) {
                    if (validPhoneNumberRegex.test(this.state.phoneNumber)) {
                        if (validPasswordRegex.test(this.state.password)) {
                            if (this.state.confirmPassword === this.state.password) {
                                if (validPincodeNumberRegex.test(this.state.pincode)) {
                                    if (this.state.termsConditions) {
                                        var testDateUtc = moment.utc(this.state.dob);
                                        var localDate = testDateUtc.local();
                                        let options = {
                                            emailId: this.state.emailId,
                                            userName: this.state.emailId,
                                            fullName: this.state.fullName,
                                            password: this.state.password,
                                            pincode: this.state.pincode,
                                            phoneNumber: this.state.phoneNumber,
                                            confirmPassword: this.state.confirmPassword,
                                            roleId: this.state.roleId
                                        };
                                        console.log("Investore SignUp")
                                        this.props.handleSignup(options);
                                    } else {
                                        toastrError(toastrMessage.emptyTerms);
                                    }
                                } else {
                                    toastrError(toastrMessage.emptyPincode);
                                }
                            } else {
                                toastrError(toastrMessage.emptyConfirmPassword);
                            }
                        } else {
                            toastrError(toastrMessage.emptyPassword);
                        }
                    } else {
                        toastrError(toastrMessage.emptyPhoneNumber);
                    }
                } else {
                    toastrError(toastrMessage.emptyMail);
                }
            } else {
                toastrError(toastrMessage.emptyName);
            }
        } else {
            toastrError(toastrMessage.emptyAll);
        }
    };
    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };
    clearState = () => {
        this.setState({
            emailId: '',
            fullName: '',
            pincode: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            userName: '',
            termsConditions: false,
            clear: true
        });
    };

    render() {
        const { emailId, fullName, pincode, displayName, gender, dob, password, confirmPassword, phoneNumber } = this.state;
        if (this.props.clear && !this.state.clear) {
            this.clearState();
        }
        let curDate = new Date();
        curDate.setFullYear(curDate.getFullYear() - 15);
        return (
            <div id="signup" className="new-signup-details">
                {this.props.loggedDetails && this.props.loggedDetails.roleBasedId && <Redirect to="investor" />}
                <div>
                    <form className="form" action="#" method="post" autoComplete={false} onSubmit={this.handleSignup}>
                        <div id="investor" className="signup-form-group">
                            <div className="row">
                                <div className="col-xs-6 signup-box-top box-side">
                                    <label className="signup-label">{signupMessage.signupName}</label>
                                    <input
                                        className={`${this.state.fullNameError ? "name-error" : 'new-signup-border'}`}
                                        autoComplete="fullName"
                                        name="fullName"
                                        id="fullName"
                                        type="text"
                                        spellCheck="false"
                                        maxLength={maxLength.content}
                                        onKeyPress={(e) => contentMethod(e)}
                                        value={fullName}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        onChange={this.handleChange}
                                        noValidate
                                    />
                                    {this.state.fullNameInfo && <span className="fullNameInfo signup-color">{signupMessage.nameInfo}</span>}
                                </div>
                                <div className="col-xs-6 signup-box-top">
                                    <label className="signup-label">{signupMessage.signupEmailId}</label>
                                    <input
                                        className={`${this.state.emailIdError ? "name-error" : 'new-signup-border'}`}
                                        name="emailId"
                                        id="email"
                                        autoComplete="off"
                                        type="email"
                                        spellCheck="false"
                                        maxLength={maxLength.email}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        value={emailId}
                                        onChange={this.handleChange}
                                        noValidate
                                    />
                                    {this.state.emailIdInfo && <span className="emailIdInfo signup-color">{signupMessage.emailInfo}</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6 signup-box-top box-side">
                                    <label className="signup-label">{signupMessage.signupMobile}</label>
                                    <input
                                        className={`${this.state.phoneNumberError ? "name-error" : 'new-signup-border'}`}
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        autoComplete="phoneNumber"
                                        type="text"
                                        spellCheck="false"
                                        maxLength={maxLength.phoneNumber}
                                        onKeyPress={(e) => numberMethod(e)}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        value={phoneNumber}
                                        onChange={this.handleChange}
                                        noValidate
                                    />
                                    {this.state.phoneNumberInfo && <span className="phoneNumberInfo signup-color">{signupMessage.phoneNumberInfo}</span>}
                                </div>
                                <div className="col-xs-6 signup-box-top">
                                    <label className="signup-label">Pincode</label>
                                    <input
                                        className={`${this.state.pincodeError ? "name-error" : 'new-signup-border'}`}
                                        name="pincode"
                                        id="pincode"
                                        type="text"
                                        autoComplete="displayName"
                                        spellCheck="false"
                                        maxLength={maxLength.pincode}
                                        onKeyPress={(e) => numberMethod(e)}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        onChange={this.handleChange}
                                        value={pincode}
                                        noValidate
                                    />
                                    {this.state.pincodeInfo && <span className="pincodeInfo signup-color">{'pincode should be 6 in digits'}</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6 signup-box-top box-side">
                                    <label className="signup-label">{signupMessage.signupPassword}</label>
                                    <input
                                        className={`${this.state.passwordError ? "name-error" : 'new-signup-border'}`}
                                        name="password"
                                        id="password"
                                        type="password"
                                        spellCheck="false"
                                        maxLength={maxLength.password}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        value={password}
                                        onChange={this.handleChange}
                                        noValidate
                                    />
                                    <a className="comments-icon" id="comments-icon" data-tip data-for="rejectComments">
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
                                    {this.state.passwordInfo && <span className="passwordInfo signup-color">{signupMessage.passwordInfo}</span>}
                                </div>
                                <div className="col-xs-6 signup-box-top">
                                    <label className="signup-label">{signupMessage.signupConfirm}</label>
                                    <input
                                        className={`${this.state.confirmPasswordError ? "name-error" : 'new-signup-border'}`}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"
                                        spellCheck="false"
                                        maxLength={maxLength.password}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        value={confirmPassword}
                                        onChange={this.handleChange}
                                        noValidate
                                    />
                                    {this.state.confirmPasswordInfo && <span className="confirmPasswordInfo signup-color">{signupMessage.confirmPasswordInfo}</span>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="new-signup-check-elm">
                        <input className="signup-checkbox" type="checkbox" id="termsConditions" name="termsConditions" onChange={this.handleCheckBox} checked={this.state.termsConditions} />
                        <label className="signup-check" htmlFor="termsConditions">
                            {' '}
                            {signupMessage.signupAgree} <a onClick={this.onOpenModal}>Terms and Conditions</a>
                        </label>
                    </div>
                    {/* <div className="signup-btn-layout"> */}
                    <button type="submit" className="btn btn-primary btn-lg new-signup-btn-inv" onClick={(e) => this.handleSignup(e)}>
                        Create Account
                    </button>
                    {/* </div> */}
                    <TermsAndConditionPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => signupSelector(state);

export default connect(mapStateToProps, {
    signupUser
})(InvestorSignup);
