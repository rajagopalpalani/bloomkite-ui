import React from 'react';
import { connect } from 'react-redux';
import { signupUser, validateUniqueFields } from '../actions/signup';
import signupSelector from '../selectors/signup';
import AdvisorSignup from '../components/signup/advisorSignup';
import InvestorSignup from '../components/signup/investorSignup';
import CorporateSignup from '../components/signup/corporateSignup';
import { Link } from 'react-router-dom';
import { toastrSuccess } from '../helpers/toastrHelper';
import Loader from '../components/common/loader';
import SignupPopup from './signupPopup';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            name: '',
            panNumber: '',
            fullname: '',
            displayName: '',
            pincode: '',
            dob: '',
            gender: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            advisor: true,
            roleId: 1,
            redirect: false,
            submitted: false,
            step: 2,
            userType: '',
            advisorType: '',
            role: 2,
            openPopup: false
        };
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        this.setState({ role, step: role == 1 || role == 3 ? 3 : 2, advisorType: role == 1 ? 'individual' : role == 3 ? 'corporate' : 'individual' });
    }

    componentDidUpdate(oldProps) {
        if (oldProps.signupDetails !== this.props.signupDetails) {
            if (this.state.submitted && this.props.signupDetails && this.props.signupDetails.partyId) {
                this.handleOpenPopup();
            }
        }
    }

    handleOpenPopup = () => {
        this.setState({
            openPopup: true
        });
    };

    handleClosePopup = () => {
        this.setState({
            openPopup: false
        });
    };

    handleTabChange = (userType) => {
        this.setState({ userType, step: 2 });
    };

    handleButtonChange = (isIndividual) => {
        this.setState({ advisorType: isIndividual, step: 3 });
    };

    handleSignup = (options) => {
        this.setState({ submitted: true });
        this.props.signupUser(options);
    };

    render() {
        return (
            <div id="signup" className="signup-container">
                <SignupPopup openPopup={this.state.openPopup} handleClose={this.handleClosePopup}></SignupPopup>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 nopadding sp-design">
                            <Link to="/" className={`navbar-brand logo-content`}>
                                <img src="/images/color_logo.png" alt="bloomkite logo" />
                            </Link>
                        </div>
                        <div className="col-lg-6 nopadding sp-design">
                            <div className="signin-new-account">
                                {`Already have an account?`}
                                <Link className="signin-signup-btn" to="/login">
                                    Sign In
                                    <span className="arrow">
                                        <img src="/images/arrow.png" alt="Arrow" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container sign-container">
                    <div className="col-lg-12 signup-row">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="signin-left border-right">
                                    <div className="signin-left-holder">
                                        <img src="/images/circle_logo.png" alt="bloomkite logo" />
                                        <div className="signin-left-content1">Get Best!</div>
                                        <div className="signin-left-content2">Financial Advisor</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="signup-right-content1">{`Let's Begin!`}</div>
                                {this.state.role == 2 && <InvestorSignup handleSignup={this.handleSignup} clear={this.props.signupDetails ? true : false} />}
                                {this.state.step == 3 && (
                                    <div>
                                        {this.state.advisorType == 'individual' && (
                                            <AdvisorSignup handleSignup={this.handleSignup} clear={this.props.signupDetails ? true : false} />
                                        )}
                                        {this.state.advisorType == 'corporate' && <CorporateSignup handleSignup={this.handleSignup} clear={this.props.signupDetails ? true : false} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loading={this.props.isLoading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => signupSelector(state);

export default connect(mapStateToProps, { signupUser, validateUniqueFields })(Signup);
