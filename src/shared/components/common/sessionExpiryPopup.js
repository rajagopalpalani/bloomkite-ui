
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Modal from './modal';
import { refreshToken } from '../../actions/login';

const TITLE = 'Session Expired';
const WARNING_MESSAGE = 'Your session has been expired. Please click OK to continue your session.';
const EXPIRED_MESSAGE = 'Your session has been expired.';

const INTERVAL = 1000;

class SessionExpiryPopup extends PureComponent {
    constructor(props) {
        super(props);
        this.sessionTimer = null;
        this.state = {
            idle: false,
            showLogoutButton: false,
        };
    }

    componentDidMount() {
        this.reset();
    }

    componentWillUnmount() {
        this.sessionTimer && clearTimeout(this.sessionTimer);
    }

    closePopupHandler = (restoreSession) => {
        this.setState({ idle: false }, () => {
            if (!restoreSession) {
                this.clearAllTimeout();
                this.logout();
            } else {
                const timeStamps = moment().format('x');
                localStorage.setItem('bloomkiteUserLoggedInTime',
                    JSON.stringify(timeStamps));
                this.props.refreshToken();
                this.reset();
            }
        });
    }

    clearAllTimeout = () => {
        clearInterval(this.idleTimer);
    }

    reset = () => {
        const { idle } = this.state;
        let timeStamp = localStorage.getItem('bloomkiteUserLoggedInTime');
        if (!idle && timeStamp) {
            this.clearAllTimeout();
            timeStamp = Number(JSON.parse(timeStamp));
            const bufferTime = moment(timeStamp).add(55, "minutes");
            const expireTime = moment(bufferTime).add(5, "minutes");
            this.idleTimer = setInterval(() => {
                const now = moment();
                const diff = moment(bufferTime).diff(now);
                const expired = moment(expireTime).diff(now);
                if (expired <= 0) {
                    clearInterval(this.idleTimer);
                    this.setState({
                        showLogoutButton: true,
                        idle: true,
                    });
                    return;
                }
                if (diff <= 0) {
                    this.setState({
                        idle: true,
                    });
                }
            }, INTERVAL);
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    }

    renderFooter = () => {
        const { showLogoutButton } = this.state;
        if (showLogoutButton) {
            return (
                <div>
                    <button onClick={() => this.closePopupHandler(false)} className="btn btn-primary">Logout</button>
                </div>
            );
        }
        return (
            <div>
                <button onClick={() => this.closePopupHandler(false)} className="btn">Cancel</button>
                <button onClick={() => this.closePopupHandler(true)} className="btn btn-primary">Ok</button>
            </div>
        );
    }

    render() {
        const { idle, showLogoutButton } = this.state;
        const message = showLogoutButton ? EXPIRED_MESSAGE : WARNING_MESSAGE;
        return (
            <Modal
                show={idle}
                title={TITLE}
                body={<p>{message}</p>}
                onClose={(e) => {
                    e.preventDefault();
                    this.closePopupHandler(false);
                }}
                footer={this.renderFooter()}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshToken: bindActionCreators(refreshToken, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(SessionExpiryPopup);
