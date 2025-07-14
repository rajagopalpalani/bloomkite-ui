import React, { Component } from 'react';
import Loader from '../../components/common/loader';
import { forgetPasswordSelector } from '../../selectors/accountDetails/forgetPassword';
import { connect } from 'react-redux';
import { validEmailRegex, maxLength } from '../../constants/commonRules';
import { forgetPassword } from '../../actions/accountDetails/forgetPassword';
import { verificationMessage } from '../../constants/verificationMessage';
import { toastrError } from '../../helpers/toastrHelper';
import { toastrMessage } from '../../constants/toastrMessage';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRole: '',
            advId: '',
            emailId: '',
            loading: false,
            disableButton: true
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
        // this.props.forgetPassword();
    }

    componentDidUpdate(oldProps) {
        if (JSON.stringify(this.props.advId) != JSON.stringify(oldProps.advId) || this.state.currentTab != this.props.currentTab) {
            this.setState({ advId: this.props.advId, currentTab: this.props.currentTab, loading: false });
        }
        if (JSON.stringify(this.props.loading) != JSON.stringify(oldProps.loading)) {
            this.setState({ loading: this.props.loading });
        }
    }

    handleForgetPassword = (e) => {
        e.preventDefault();
        if (validEmailRegex.test(this.state.emailId)) {
            let options = {
                emailId: this.state.emailId
            };
            this.props.forgetPassword(options);
        } else {
            toastrError(toastrMessage.emptyMail);
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
                        <h2>{verificationMessage.enterEmail}</h2>
                        <form className="form">
                            <input
                                className="forget-text-box1"
                                autoComplete="off"
                                name="emailId"
                                id="emailId"
                                type="email"
                                placeholder="Enter your registered Email ID"
                                maxLength={maxLength.content}
                                onChange={this.handleChange}
                                value={this.state.emailId}
                            />
                            <br />
                            <br />
                        </form>
                        <button className="save-btn2" onClick={(e) => this.handleForgetPassword(e)}>
                            SEND
                        </button>
                        <div>{this.props.forgetPasswordDetails}</div>
                    </div>
                    <Loader loading={this.state.loading} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => forgetPasswordSelector(state);

export default connect(mapStateToProps, {
    forgetPassword
})(ForgetPassword);
