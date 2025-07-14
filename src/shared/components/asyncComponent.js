import React, { Component } from 'react';
import cx from 'classnames';
import SessionExpiryPopup from './common/sessionExpiryPopup';
import withTitle from './withTitle';
import Footer from './home/footer';
import MainHeader from './mainHeader';
import UserHeader from './userHeader';
import BrowserOfflineNotice from './browserOfflineNotice';
import { routeConstants } from '../constants/routes';

const routesForHideFooters = [routeConstants.LOGIN, routeConstants.SIGNUP];
const showPublicHeader = [
    '/',
    routeConstants.PRIVACY,
    routeConstants.FORGET_PASSWORD,
    routeConstants.MAIL_VERIFICATION,
    routeConstants.RESET_PASSWORD,
    routeConstants.HOME,
    routeConstants.HOWITWORKS,
    routeConstants.PLANNING_STATIC,
    routeConstants.WHY_US,
    routeConstants.PRODUCT,
    routeConstants.FAQ,
    routeConstants.TERMSANDCONDITIONS,
    routeConstants.CALCULATOR
];
class AsyncComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            browserOffline: false
        };
    }

    renderSessionPopup = () => {
        const isLoggedIn = localStorage.getItem('bloomkiteBusinessUser');
        return isLoggedIn && <SessionExpiryPopup />;
    };

    renderHeader = () => {
        const {
            location: { pathname }
        } = this.props;
        const loggedIn = localStorage.getItem('bloomkiteUsername');
        const user = JSON.parse(loggedIn);
        const { roleId } = user || {};
        if (routesForHideFooters.indexOf(pathname) === -1) {
            if (loggedIn && user && showPublicHeader.indexOf(pathname) === -1) {
                return <UserHeader role={roleId} />;
            }
            return <MainHeader />;
        }
        return null;
    };

    componentDidMount() {
        window.addEventListener('online', this.onBrowserOnline, true);
        window.addEventListener('offline', this.onBrowserOffline, true);
    }

    onBrowserOffline = () => {
        this.setState({ browserOffline: true });
    };

    onBrowserOnline = () => {
        this.setState({ browserOffline: false });
    };

    render() {
        const {
            component,
            publicRoute,
            isNewDesign,
            location: { pathname }
        } = this.props;
        const loggedIn = localStorage.getItem('bloomkiteBusinessUser');
        const Comp = component;
        const homeDashboard = pathname === '/dashboard';
        const expertspage = pathname === '/experts';
        const containerClass = cx('root-container', {
            'root-container-bottom': publicRoute,
            'full-height': publicRoute && isNewDesign,
            'root-container-loggedin': loggedIn && showPublicHeader.indexOf(pathname) === -1,
            'dashboard-container': homeDashboard,
            'experts-loggedin': loggedIn && expertspage,
            'profile-loggedin-url': loggedIn && pathname.indexOf('profile') > -1
        });
        let isHome = pathname === '/';
        return (
            <div className={containerClass}>
                {this.renderHeader()}
                <Comp {...this.props} />
                {!publicRoute && this.renderSessionPopup()}
                {routesForHideFooters.indexOf(pathname) === -1 && <Footer isHome={isHome} homeDashboard={homeDashboard} />}
                {this.state.browserOffline && <BrowserOfflineNotice browserOffline={this.state.browserOffline} />}
            </div>
        );
    }
}

export default withTitle(AsyncComponent);
