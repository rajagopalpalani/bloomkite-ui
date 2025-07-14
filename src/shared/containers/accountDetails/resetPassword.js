import React, { Component } from 'react';
import FontIcon from '../../components/common/fontAwesomeIcon';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/common/loader';
import { resetPasswordSelector } from '../../selectors/accountDetails/resetPassword';
import { connect } from 'react-redux';
import CustomReactTooltip from '../../components/common/customReactTooltip';
import { maxLength } from '../../constants/commonRules';
import { resetPassword } from '../../actions/accountDetails/resetPassword';
import { forgetPassword } from '../../actions/accountDetails/forgetPassword';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';
import { verificationMessage } from '../../constants/verificationMessage';
import PasswordInput from '../../components/common/passwordInput';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: '',
            advId: '',
            newPassword: '',
            confirmNewPassword: '',
            emailId: '',
            loading: false,
            disableButton: true,
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

    componentDidMount() {
        const bloomkite = window.localStorage && JSON.parse(window.localStorage.getItem('bloomkiteUsername'));
        const roleId = bloomkite && bloomkite.roleId;
        // this.props.resetPassword();
        this.setState({ domLoaded: true });
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advId) != JSON.stringify(oldProps.advId) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advId: this.props.advId, currentTab: this.props.currentTab, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }
    handleResetPassword = (e) => {
        e.preventDefault();
        if (this.state.newPassword && this.state.confirmNewPassword) {
            const urlParams = new URLSearchParams(window.location.search);
            const key = urlParams.get('key');
            if (this.state.newPassword === this.state.confirmNewPassword) {
                let options = {
                    newPassword: this.state.newPassword
                };
                this.props.resetPassword(options, key);
            } else {
                toastrError(toastrMessage.emptyConfirmPassword);
            }
        } else {
            toastrError(toastrMessage.emptyError);
        }
    };

    render() {
        return (
            <div className="main-container pt-1">
                {/* <Header
                    logout={this.logout}
                    role={this.state.currentRole}
                    signupButton={!this.state.currentRole ? true : false}
                    disableButton={this.state.disableButton}
                /> */}
                <div className="col-12">
                    <div className="page-center forget-align bg-white">
                        <h2>{verificationMessage.resetPassword}</h2>
                        <form className="form">
                            <label className="password-font">{verificationMessage.newPassword}</label>
                            <br />
                            <PasswordInput
                                className="forget-text-box"
                                name="newPassword"
                                maxLength={maxLength.password}
                                onChange={this.handleChange}
                                value={this.state.newPassword}
                            />
                            <br />
                            <br />
                            <a className="comments-icon-reset" id="comments-icon" data-tip data-for="rejectComments">
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
                            <label className="password-font">{verificationMessage.confirmPassword}</label>
                            <br />
                            <PasswordInput
                                className="forget-text-box"
                                name="confirmNewPassword"
                                maxLength={maxLength.password}
                                onChange={this.handleChange}
                                value={this.state.confirmPassword}
                            />
                            <br />
                            <br />
                        </form>
                        <button className="save-btn2" onClick={(e) => this.handleResetPassword(e)}>
                            Save
                        </button>
                    </div>
                    <Loader loading={this.state.loading} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => resetPasswordSelector(state);

export default connect(mapStateToProps, {
    resetPassword,
    forgetPassword
})(ResetPassword);
