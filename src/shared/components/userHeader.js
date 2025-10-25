import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { apibaseURI } from '../constants/apiAttributes';
import { headerSelector } from '../selectors/header';
import { ChatContext } from '../components/chats/Chat.context';
import classNames from 'classnames';
import ChatWrapper from '../components/chats';
import FontIcon from './common/fontAwesomeIcon';
import { faPowerOff, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../components/common/customModal';

class UserHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openUp: false,
            openChat: false,
            user: null,
            chats: [],
            activeChat: null,
            multiActiveChat: []
        };
    }

    static contextType = ChatContext;

    componentDidMount() {
        //const loggedIn = localStorage.getItem('bloomkiteUsername');
        //if (loggedIn) {
        //const user = JSON.parse(loggedIn);
        // this.context.createUser({
        //     advId: user.roleBasedId,
        //     ...user
        // });
        //}
        this.setupBeforeUnloadListener();
    }

    // Things to do before unloading/closing the tab
    doSomethingBeforeUnload = () => {
        this.logout();
    };

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener('beforeunload', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            return this.doSomethingBeforeUnload();
        });
    };

    openModal = () => {
        this.setState({ openUp: true });
    };

    onCloseModal = () => {
        this.setState({ openUp: false });
    };

    openChatlist = () => {
        this.setState({ openChat: true });
    };

    closeChatList = () => {
        this.setState({ openChat: false });
    };

    logout = () => {
        // const { socket } = this.props;
        // socket && socket.emit('LOGOUT');
        //const loggedIn = localStorage.getItem('bloomkiteUsername');
        // if (loggedIn) {
        //     const user = JSON.parse(loggedIn);
        //     this.context.deleteUser({ advId: user.roleBasedId, ...user });
        // }
        localStorage.clear();
        window.location.href = window.location.origin;
    };

    render() {
        const { openChat } = this.state;
        const { location, advisorDetails: { name } = {}, investorDetails: { fullName } = {} } = this.props;
        const { pathname } = location || {};
        return (
            <React.Fragment>
                <nav className={'navbar navbar-expand-lg navbar-light user-header gray-border header-fixed'} id="header">
                    <Link to="/dashboard" className={`navbar-brand logo-content`}>
                        <img src="/images/logo.svg" alt="bloomkite logo" />
                    </Link>
                    {this.props.role && (
                        <div className="dropdown hidden-lg-up">
                            <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.props.role == 1 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${name ? name.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                                {this.props.role == 3 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${name ? name.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                                {this.props.role == 2 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${fullName ? fullName.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton123">
                                {this.props.role == 1 && (
                                    <Link to="/advisor" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                {this.props.role == 2 && (
                                    <Link to="/investor" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                {this.props.role == 3 && (
                                    <Link to="/corporate" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                <a className="logoutHeader nav-profile" onClick={() => this.logout()}>
                                    <FontIcon icon={faPowerOff} /> Logout
                                </a>
                            </div>
                        </div>
                    )}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <FontIcon icon={faBars} />
                        {/* <span className="navbar-toggler-icon"></span> */}
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link to="/dashboard" className={classNames('nav-link', { active: pathname == '/dashboard', 'no-active': pathname != '/dashboard' })}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/planning-list" className={classNames('nav-link', { active: pathname == '/planning-list', 'no-active': pathname != '/planning-list' })}>
                                    Plan
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/experts" className={classNames('nav-link', { active: pathname == '/experts', 'no-active': pathname != '/experts' })}>
                                    Experts
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/blog" className={classNames('nav-link', { active: pathname == '/blog', 'no-active': pathname != '/blog' })}>
                                    Blog
                                </Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <div onClick={() => this.openChatlist()} className={`nav-link ${this.props.active == 3 ? 'active' : 'no-active'}`}>
                                    <i className="far fa-comment-dots user-chat-icon"></i>
                                </div>
                            </li> */}

                            {/* <li className="nav-item">
                            <Link to="/product" className={`nav-link ${this.props.active == 2 ? 'active' : 'no-active'}`}>
                                Product
                            </Link>
                        </li> */}
                            {/* <li className="nav-item">
                            <a className={`nav-link ${this.props.active == 2 ? 'active' : 'no-active'}`} href="/experts">
                                Explore
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${this.props.active == 3 ? 'active' : 'no-active'}`} href="/blog">
                                Blog
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${this.props.active == 4 ? 'active' : 'no-active'}`} href="/academy">
                                Academy
                            </a>
                        </li> */}
                        </ul>
                    </div>
                    {/* <div className="dropdown">
                    <a className="dropdown-notify dropdown-toggle"
                        type="button"
                        id="dropdownNotifyButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="fa fa-bell fa-2x mr-3 bellIcon"></i>
                    </a>
                </div> */}
                    {!this.props.role && (
                        <>
                            <li className="signup-header">
                                <Link to="/signup" className={classNames('nav-link', { active: pathname == '/signup', 'no-active': pathname != '/signup' })}>
                                    Signup
                                </Link>
                            </li>
                            <li className="signup-header">
                                <Link to="/login" className={classNames('nav-link', { active: pathname == '/login', 'no-active': pathname != '/login' })}>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    {this.props.role && (
                        <div className="dropdown hidden-lg-down">
                            <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.props.role == 1 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${name ? name.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                                {this.props.role == 3 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${name ? name.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                                {this.props.role == 2 && (
                                    <img
                                        className="profile-img"
                                        src={
                                            this.props.logoPath
                                                ? `${apibaseURI}/api/v1/images/download/${this.props.logoPath}/**`
                                                : `https://dummyimage.com/40x40/fff/000000.png&text=${fullName ? fullName.split('')[0].toUpperCase() : 'U'}`
                                        }
                                        alt="profile image"
                                    />
                                )}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton123">
                                {this.props.role == 1 && (
                                    <Link to="/advisor" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                {this.props.role == 2 && (
                                    <Link to="/investor" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                {this.props.role == 3 && (
                                    <Link to="/corporate" className={`nav-profile`}>
                                        <FontIcon icon={faUser} /> Profile
                                    </Link>
                                )}
                                <a className="logoutHeader nav-profile" onClick={() => this.logout()}>
                                    <FontIcon icon={faPowerOff} /> Logout
                                </a>
                            </div>
                        </div>
                    )}
                </nav>
                {openChat && <ChatWrapper onClose={this.closeChatList} />}
                {this.state.openUp && (
                    <CustomModal open={this.state.openUp} showCloseIcon={false} onClose={this.onCloseModal} closeOnOverlayClick={false}>
                        <div className="modal-header">Are you sure? Do you want to logout?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.onCloseModal}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.doSomethingBeforeUnload()}>
                                Confirm
                            </button>
                        </div>
                    </CustomModal>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => headerSelector(state);

export default connect(mapStateToProps, {})(UserHeader);
