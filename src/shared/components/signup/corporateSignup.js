import React from 'react';
import { Redirect } from 'react-router-dom';
import CustomReactTooltip from '../common/customReactTooltip';
import PopUp from '../popup';
import { signupUser } from '../../actions/signup';
import signupSelector from '../../selectors/signup';
import { signupMessage } from '../../constants/signupInfo';
import { validateUniqueFields } from '../../actions/signup';
import { connect } from 'react-redux';
import {
    maxLength,
    validEmailRegex,
    validCorporatePANnumberRegex,
    validPasswordRegex,
    validPhoneNumberRegex,
    aplhaNumericWithoutSpace,
    panMethod,
    numberMethod,
    contentCompanyName
} from '../../constants/commonRules';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';
import FontIcon from '../common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import TermsAndConditionPopup from '../termsAndConditionPopup';

class CorporateSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            name: '',
            panNumber: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            userName: '',
            roleId: 3,
            redirect: false,
            submitted: false,
            domLoaded: false,
            openPopup: false,
            clear: false,
            termsConditions: false,
            nameError : false,
            panError : false,
            phoneNumberError : false,
            emailIdError : false,
            passwordError : false,
            confirmPasswordError : false
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
        this.setState({
            [name]: name == 'panNumber' ? value.toLocaleUpperCase() : value
        });
    };

    handleFocus = (e) => {
        const { name, value } = e.target;
        this.setState({ [`${name}Info`]: true });
    };

    handleBlur = (e) => {
        const { name, value } = e.target;
        let nameError = false;
        let panError = false;
        let userNameError = false;
        let phoneNumberError = false;
        let emailIdError = false;
        let passwordError = false;
        let confirmPasswordError = false;
        if (name === 'name') {
            nameError = value.length < 3;
            nameError && toastrError(toastrMessage.emptyName);
            this.setState({nameError : nameError})
        }
        if (name === 'userName') {
            userNameError = value.length < 3;
            userNameError && toastrError(toastrMessage.emptyName);
            let options = {
                userName: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'panNumber') {
            panError = !validCorporatePANnumberRegex.test(value);
            panError && toastrError(toastrMessage.emptyPan);
            this.setState({panError : panError})
            let options = {
                panNumber: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'phoneNumber') {
            phoneNumberError = !validPhoneNumberRegex.test(value);
            phoneNumberError && toastrError(toastrMessage.emptyPhoneNumber);
            this.setState({phoneNumberError : phoneNumberError})
            let options = {
                phoneNumber: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'emailId') {
            emailIdError = !validEmailRegex.test(value);
            emailIdError && toastrError(toastrMessage.emptyMail);
            this.setState({emailIdError : emailIdError})
            let options = {
                emailId: value
            };
            if (value.length > 3) {
                this.props.validateUniqueFields(options, name);
            }
        }
        if (name === 'password') {
            passwordError = !validPasswordRegex.test(value);
            passwordError && toastrError(toastrMessage.emptyPassword);
            this.setState({passwordError : passwordError})
        }
        if (name === 'confirmPassword') {
            confirmPasswordError = this.state.password !== value;
            confirmPasswordError && toastrError(toastrMessage.emptyConfirmPassword);
            this.setState({confirmPasswordError : confirmPasswordError})
        }
        this.setState({ [`${name}Info`]: false });
    };

    handleCheckBox = (e) => {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    };

    handleSignup = (e) => {
        e.preventDefault();
        if (
            this.state.emailId.trim() != '' &&
            this.state.name.trim() != '' &&
            this.state.panNumber.trim() != '' &&
            this.state.password.trim() != '' &&
            this.state.phoneNumber.trim() != '' &&
            this.state.confirmPassword.trim() != ''
        ) {
            if (this.state.name.length > 3) {
                if (validCorporatePANnumberRegex.test(this.state.panNumber)) {
                    if (validPhoneNumberRegex.test(this.state.phoneNumber)) {
                        if (validEmailRegex.test(this.state.emailId)) {
                            if (validPasswordRegex.test(this.state.password)) {
                                if (this.state.confirmPassword === this.state.password) {
                                    if (this.state.termsConditions) {
                                        let options = {
                                            emailId: this.state.emailId,
                                            name: this.state.name,
                                            panNumber: this.state.panNumber,
                                            password: this.state.password,
                                            phoneNumber: this.state.phoneNumber,
                                            confirmPassword: this.state.confirmPassword,
                                            roleId: this.state.roleId
                                        };
                                        this.props.handleSignup(options);
                                    } else {
                                        toastrError(toastrMessage.emptyTerms);
                                    }
                                } else {
                                    toastrError(toastrMessage.emptyConfirmPassword);
                                }
                            } else {
                                toastrError(toastrMessage.emptyPassword);
                            }
                        } else {
                            toastrError(toastrMessage.emptyMail);
                        }
                    } else {
                        toastrError(toastrMessage.emptyPhoneNumber);
                    }
                } else {
                    toastrError(toastrMessage.emptyPan);
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
            name: '',
            panNumber: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            userName: '',
            termsConditions: false,
            clear: true
        });
    };
    render() {
        const { emailId, name, panNumber, password, confirmPassword, userName, phoneNumber } = this.state;
        if (this.props.clear && !this.state.clear) {
            this.clearState();
        }
        return (
            <div id="signup" className="new-signup-details">
                {this.props.loggedDetails && this.props.loggedDetails.roleBasedId && <Redirect to="corporate" />}
                <form action="#" method="post" autoComplete={false} onSubmit={this.handleSignup}>
                    <div id="individual" className="signup-form-group">
                        <div className="row">
                            <div className="col-xs-6 signup-box-top box-side">
                                <label className="signup-label">{signupMessage.signupCompanyName}</label>
                                <input
                                    className={`${this.state.nameError ? "name-error" : 'new-signup-border'}`}
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    type="text"
                                    spellCheck="false"
                                    maxLength={maxLength.content}
                                    onKeyPress={(e) => contentCompanyName(e)}
                                    value={name}
                                    onBlur={this.handleBlur}
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    noValidate
                                />
                                {this.state.nameInfo && <span className="nameInfo signup-color">{signupMessage.nameInfo}</span>}
                            </div>
                            <div className="col-xs-6 signup-box-top">
                                <label className="signup-label">{signupMessage.signupCompanyPan}</label>
                                <input
                                    className={`${this.state.panError ? "name-error" : 'new-signup-border'}`}
                                    name="panNumber"
                                    autoComplete="panNumber"
                                    id="panNumber"
                                    type="text"
                                    spellCheck="false"
                                    maxLength={maxLength.panNumber}
                                    onKeyPress={(e) => panMethod(e)}
                                    onBlur={this.handleBlur}
                                    onFocus={this.handleFocus}
                                    value={panNumber}
                                    onChange={this.handleChange}
                                    noValidate
                                />
                                {this.state.panNumberInfo && <span className="panNumberInfo signup-color">{signupMessage.corpPanInfo}</span>}
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

                            <div className="col-xs-6 signup-box-top ">
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
                    <button type="submit" className="signup-btn btn btn-primary btn-lg new-signup-btn" onClick={(e) => this.handleSignup(e)}>
                        Create Account
                    </button>
                </div>
                <TermsAndConditionPopup openPopup={this.state.openPopup} showCloseIcon={true} onCloseModal={this.onCloseModal} />
            </div>
        );
    }
}

const mapStateToProps = (state) => signupSelector(state);
export default connect(mapStateToProps, {
    signupUser,
    validateUniqueFields
})(CorporateSignup);
