import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/login';
import loginSelector from '../selectors/login';
import { maxLength } from '../constants/commonRules';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import FontIcon from '../components/common/fontAwesomeIcon';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            otpSent: false,
            verify: false,
            otpVerify: '',
            redirect: false
        };
    }

    componentDidUpdate(oldProps) {
        if (!this.state.redirect && this.state.submitted && JSON.stringify(this.props.loggedDetails) != JSON.stringify(oldProps.loggedDetails)) {
            this.setState({ redirect: true, submitted: false });
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.verifyCheck(username, password);
        }
    };

    showPasswordHandler = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword
        });
    };

    handleVerify = (e) => {
        e.preventDefault();
        this.setState({ verify: true });
        const { username, otpVerify } = this.state;
        if (username && otpVerify) {
            this.verifyCheck(username, otpVerify);
        }
    };

    verifyCheck = (username, password) => {
        const options = {
            password: password,
            username: username
        };
        this.props.loginUser(options);
    };

    render() {
        const isDevelopment = __ENV__ == 'DEV';
        const { username, password, otpVerify, submitted, verify, otpSent, showPassword } = this.state;
        const type = showPassword ? 'text' : 'password';
        const styles = cx('show-password', { active: showPassword });
        return (
            <div className="signin-container" id="signin">
                {this.state.redirect && this.props.loggedDetails && this.props.loggedDetails.roleBasedId && this.props.loggedDetails.roleId == 1 && <Redirect to="dashboard" />}
                {this.state.redirect && this.props.loggedDetails && this.props.loggedDetails.roleBasedId && this.props.loggedDetails.roleId == 2 && <Redirect to="dashboard" />}
                {this.state.redirect && this.props.loggedDetails && this.props.loggedDetails.roleBasedId && this.props.loggedDetails.roleId == 3 && <Redirect to="dashboard" />}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 nopadding sp-design">
                            <Link to="/" className={`navbar-brand logo-content`}>
                                <img src="/images/color_logo.png" alt="bloomkite logo" />
                            </Link>
                        </div>
                        <div className="col-lg-6 nopadding sp-design">
                            <div className="signin-new-account">
                                {`Don't have an account?`}
                                <span className="home-header1">
                                    <span className="dropdown show">
                                        <a className="new-signin-signup-btn" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sign Up
                                            <span className="arrow">
                                                <img src="/images/arrow.png" alt="Arrow" />
                                            </span>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {isDevelopment && (
                                                <Link className="dropdown-item" to="/signup?role=2">
                                                    As Investor
                                                </Link>
                                            )}
                                            <Link className="dropdown-item" to="/signup?role=1">
                                                As Advisor
                                            </Link>
                                            <Link className="dropdown-item" to="/signup?role=3">
                                                As Corporate
                                            </Link>
                                        </div>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container sign-container">
                    <div className="col-lg-12 signin-inside">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="signin-left border-right">
                                    <div className="signin-left-holder">
                                        <img src="/images/circle_logo.png" alt="bloomkite logo" />
                                        <div className="signin-left-content1">Get Best!</div>
                                        <div className="signin-left-content2">Financial Advisor</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="signin-right">
                                    <div className="signin-right-content1">Welcome Back!</div>
                                    <div className="modal-body">
                                        {!otpSent ? (
                                            <form action="#" method="post" onSubmit={this.handleSubmit}>
                                                <input
                                                    type="text"
                                                    className="signin-input1"
                                                    name="username"
                                                    autoComplete="off"
                                                    placeholder="Email Address"
                                                    required="required"
                                                    maxLength={maxLength.content}
                                                    value={username}
                                                    onChange={this.handleChange}
                                                />
                                                <input
                                                    className="signin-input2"
                                                    name="password"
                                                    placeholder="Password"
                                                    type={type}
                                                    maxLength={maxLength.password}
                                                    onChange={this.handleChange}
                                                    value={password}
                                                />
                                                {password && (
                                                    <span className="password-show" href="#" onClick={this.showPasswordHandler}>
                                                        {!showPassword && <FontIcon icon={faEye} />}
                                                        {showPassword && <FontIcon icon={faEyeSlash} />}
                                                    </span>
                                                )}
                                                <div>
                                                    <a
                                                        className="forget-password"
                                                        onClick={() => {
                                                            this.props.history.push('/forget-password');
                                                        }}>
                                                        Forgot password?
                                                    </a>
                                                    <button type="submit" className="login-button">
                                                        Log in
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <form action="#" method="post" onSubmit={this.handleVerify}>
                                                <input
                                                    type="text"
                                                    className="signin-input1"
                                                    name="otpVerify"
                                                    autoComplete="off"
                                                    placeholder="OTP Verify"
                                                    required="required"
                                                    value={otpVerify}
                                                    onChange={this.handleChange}
                                                />
                                                {verify && !otpVerify && <div className="help-block"> OTP is required </div>}
                                                <button type="submit" className="otp-login-button">
                                                    Log in
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => loginSelector(state);

export default connect(mapStateToProps, {
    loginUser
})(Login);
