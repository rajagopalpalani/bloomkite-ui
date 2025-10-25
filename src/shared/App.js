import React, { Component } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';
import configureStore from './core/configureStore';
import SimpleTest from './components/SimpleTest';
import MainHeader from './components/mainHeader';
import UserHeader from './components/userHeader';
import Footer from './components/home/footer';
// CSS import removed for direct Node.js execution (not using webpack)

// Route components
import Home from './containers/home';
import Privacy from './containers/privacy';
import Advisor from './containers/advisor/advisor';
import PlanningLanding from './containers/planning/planningLanding';
import PlanningStatic from './containers/planning/planningStatic';
import Planning from './containers/planning/planning';
import Blog from './containers/blog/blog';
import Academy from './containers/academy/academy';
import Corporate from './containers/corporate/corporate';
import Investor from './containers/investor/investor';
import DashBoard from './containers/dashBoard';
import Profile from './containers/profile';
import Login from './containers/login';
import Signup from './containers/signup';
import ResetPassword from './containers/accountDetails/resetPassword';
import ForgetPassword from './containers/accountDetails/forgetPassword';
import MailVerification from './containers/accountDetails/mailVerification';
import NotFound from './containers/notFound';
import Explore from './containers/explore/explore';
import Product from './containers/product/product';
import Howitworks from './containers/howItWorks/howItWorks';
import WhyUs from './containers/whyUs/whyUs';
import Calculator from './containers/calculator/calculator';
import ErrorBoundary from './containers/errorBoundary';
import TermsAndConditions from './containers/terms&Conditions';
import Faq from './containers/faq';

// Route guards
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

// Constants
import { routeConstants } from './constants/routes';

// Layout component to determine which header to show
const Layout = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    
    // Routes that need UserHeader (authenticated routes)
    const authenticatedRoutes = [
        routeConstants.ADVISOR,
        routeConstants.PLANNING_LIST,
        routeConstants.PLANNING,
        routeConstants.BLOG,
        routeConstants.ACADEMY,
        routeConstants.CORPORATE,
        routeConstants.INVESTOR,
        routeConstants.DASHBOARD,
        routeConstants.USER_PROFILE
    ];
    
    // Routes that should hide header and footer (auth pages)
    const authRoutes = [
        routeConstants.LOGIN,
        routeConstants.SIGNUP,
        routeConstants.RESET_PASSWORD,
        routeConstants.FORGET_PASSWORD,
        routeConstants.MAIL_VERIFICATION
    ];
    
    // Check if current route needs authenticated header
    const needsUserHeader = authenticatedRoutes.some(route => {
        // Handle dynamic routes like /planning/:planId
        if (route.includes(':')) {
            const routePattern = route.replace(/:[^/]+/g, '[^/]+');
            return new RegExp(`^${routePattern}$`).test(pathname);
        }
        return pathname === route;
    });
    
    // Check if current route should hide header and footer
    const shouldHideHeaderFooter = authRoutes.some(route => {
        if (route.includes(':')) {
            const routePattern = route.replace(/:[^/]+/g, '[^/]+');
            return new RegExp(`^${routePattern}$`).test(pathname);
        }
        return pathname === route;
    });
    
    // If it's an auth route, render only the children without header/footer
    if (shouldHideHeaderFooter) {
        return <div>{children}</div>;
    }
    
    const HeaderComponent = needsUserHeader ? UserHeader : MainHeader;
    
    return (
        <div>
            <HeaderComponent />
            <main>
                {children}
            </main>
            <Footer isHome={pathname === '/' || pathname === routeConstants.HOME} />
        </div>
    );
};

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
export default class App extends Component {
    constructor(props) {
        super(props);
        console.log('🚀 App component constructor called');
        console.log('📦 App props:', props);
        console.log('⚛️ React version:', React.version);
        
        // Create Redux store
        this.store = configureStore();
    }

    componentDidMount() {
        console.log('✅ App component mounted successfully!');
        console.log('🎯 App component mounted at:', new Date().toLocaleString());
    }

    render() {
        return (
            <Provider store={this.store}>
                <HelmetProvider>
                    <BrowserRouter>
                        <div>
                            <Helmet>
                                <title>Bloomkite | {this.props.title || 'Financial Planning'}</title>
                            </Helmet>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<PublicRoute path="/"><Home /></PublicRoute>} />
                                    <Route path={routeConstants.HOME} element={<PublicRoute path={routeConstants.HOME}><Home /></PublicRoute>} />
                                    <Route path={routeConstants.PRIVACY} element={<PublicRoute path={routeConstants.PRIVACY}><Privacy /></PublicRoute>} />
                                    <Route path={routeConstants.ADVISOR} element={<PrivateRoute><Advisor /></PrivateRoute>} />
                                    <Route path={routeConstants.PLANNING_LIST} element={<PrivateRoute><PlanningLanding /></PrivateRoute>} />
                                    <Route path={routeConstants.PLANNING_STATIC} element={<PublicRoute path={routeConstants.PLANNING_STATIC}><PlanningStatic /></PublicRoute>} />
                                    <Route path={routeConstants.PLANNING} element={<PrivateRoute><Planning /></PrivateRoute>} />
                                    <Route path={routeConstants.BLOG} element={<PrivateRoute><Blog /></PrivateRoute>} />
                                    <Route path={routeConstants.ACADEMY} element={<PrivateRoute><Academy /></PrivateRoute>} />
                                    <Route path={routeConstants.CORPORATE} element={<PrivateRoute><Corporate /></PrivateRoute>} />
                                    <Route path={routeConstants.INVESTOR} element={<PrivateRoute><Investor /></PrivateRoute>} />
                                    <Route path={routeConstants.DASHBOARD} element={<PrivateRoute><DashBoard /></PrivateRoute>} />
                                    <Route path={routeConstants.CORPORTATE_PROFILE} element={<PublicRoute path={routeConstants.CORPORTATE_PROFILE}><Profile /></PublicRoute>} />
                                    <Route path={routeConstants.USER_PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>} />
                                    <Route path={routeConstants.LOGIN} element={<PublicRoute path={routeConstants.LOGIN}><Login /></PublicRoute>} />
                                    <Route path={routeConstants.SIGNUP} element={<PublicRoute path={routeConstants.SIGNUP}><Signup /></PublicRoute>} />
                                    <Route path={routeConstants.RESET_PASSWORD} element={<PublicRoute path={routeConstants.RESET_PASSWORD}><ResetPassword /></PublicRoute>} />
                                    <Route path={routeConstants.FORGET_PASSWORD} element={<PublicRoute path={routeConstants.FORGET_PASSWORD}><ForgetPassword /></PublicRoute>} />
                                    <Route path={routeConstants.MAIL_VERIFICATION} element={<PublicRoute path={routeConstants.MAIL_VERIFICATION}><MailVerification /></PublicRoute>} />
                                    <Route path={routeConstants.NOT_FOUND} element={<PublicRoute path={routeConstants.NOT_FOUND}><NotFound /></PublicRoute>} />
                                    <Route path={routeConstants.EXPERTS} element={<PublicRoute path={routeConstants.EXPERTS}><Explore /></PublicRoute>} />
                                    <Route path={routeConstants.PRODUCT} element={<PublicRoute path={routeConstants.PRODUCT}><Product /></PublicRoute>} />
                                    <Route path={routeConstants.HOWITWORKS} element={<PublicRoute path={routeConstants.HOWITWORKS}><Howitworks /></PublicRoute>} />
                                    <Route path={routeConstants.WHY_US} element={<PublicRoute path={routeConstants.WHY_US}><WhyUs /></PublicRoute>} />
                                    <Route path={routeConstants.PLANS} element={<PublicRoute path={routeConstants.PLANS}><Calculator /></PublicRoute>} />
                                    <Route path={routeConstants.ERROR} element={<PublicRoute path={routeConstants.ERROR}><ErrorBoundary /></PublicRoute>} />
                                    <Route path={routeConstants.TERMSANDCONDITIONS} element={<PublicRoute path={routeConstants.TERMSANDCONDITIONS}><TermsAndConditions /></PublicRoute>} />
                                    <Route path={routeConstants.FAQ} element={<PublicRoute path={routeConstants.FAQ}><Faq /></PublicRoute>} />
                                </Routes>
                            </Layout>
                        </div>
                    </BrowserRouter>
                </HelmetProvider>
            </Provider>
        );
    }
}

// Bootstrap code removed - handled by webpack client bundle
