import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import '../shared/styles/index.css';
import PrivateRoute from '../shared/PrivateRoute';
import PublicRoute from '../shared/PublicRoute';
import configureStore from '../shared/core/configureStore';
import { routeConstants } from '../shared/constants/routes';
import Home from '../shared/containers/home/index';
import {
    Advisor,
    Investor,
    Corporate,
    Planning,
    PlanningLanding,
    PlanningStatic,
    Explore,
    Blog,
    Product,
    Howitworks,
    Academy,
    Privacy,
    NotFound,
    Login,
    Signup,
    Profile,
    ResetPassword,
    ForgetPassword,
    MailVerification,
    WhyUs,
    Calculator,
    DashBoard,
    ErrorBoundary,
    TermsAndConditions,
    Faq
} from '../AsyncPage';

const createHistory = require('history').createBrowserHistory;
const history = createHistory();

const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

/**
 * Renders a react component into the #react-root div container.
 * Since react 16, the `hydrate` method is used instead of `render` when dealing
 * with server side rendering.
 *
 * @param Component React component that should be rendered
 */
const render = () => {
    hydrate(
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <PublicRoute exact path="/" component={Home} />
                    <PublicRoute path={routeConstants.HOME} component={Home} />
                    <PublicRoute path={routeConstants.PRIVACY} component={Privacy} />
                    <PrivateRoute path={routeConstants.ADVISOR} component={Advisor} />
                    <PrivateRoute path={routeConstants.PLANNING_LIST} component={PlanningLanding} />
                    <PublicRoute path={routeConstants.PLANNING_STATIC} component={PlanningStatic} />
                    <PrivateRoute path={routeConstants.PLANNING} component={Planning} />
                    <PrivateRoute path={routeConstants.BLOG} component={Blog} />
                    <PrivateRoute path={routeConstants.ACADEMY} component={Academy} />
                    <PrivateRoute path={routeConstants.CORPORATE} component={Corporate} />
                    <PrivateRoute path={routeConstants.INVESTOR} component={Investor} />
                    <PrivateRoute path={routeConstants.DASHBOARD} component={DashBoard} />
                    <PublicRoute exact path={routeConstants.CORPORTATE_PROFILE} component={Profile} />
                    <PrivateRoute exact path={routeConstants.USER_PROFILE} component={Profile} />
                    <PublicRoute path={routeConstants.LOGIN} component={Login} />
                    <PublicRoute path={routeConstants.SIGNUP} component={Signup} />
                    <PublicRoute path={routeConstants.RESET_PASSWORD} component={ResetPassword} />
                    <PublicRoute path={routeConstants.FORGET_PASSWORD} component={ForgetPassword} />
                    <PublicRoute path={routeConstants.MAIL_VERIFICATION} component={MailVerification} />
                    <PublicRoute path={routeConstants.NOT_FOUND} component={NotFound} />
                    <PublicRoute path={routeConstants.EXPERTS} component={Explore} />
                    <PublicRoute path={routeConstants.PRODUCT} component={Product} />
                    <PublicRoute path={routeConstants.HOWITWORKS} component={Howitworks} />
                    <PublicRoute path={routeConstants.WHY_US} component={WhyUs} />
                    <PublicRoute path={routeConstants.PLANS} component={Calculator} />
                    <PublicRoute path={routeConstants.ERROR} component={ErrorBoundary} />
                    <PublicRoute path={routeConstants.TERMSANDCONDITIONS} component={TermsAndConditions} />
                    <PublicRoute path={routeConstants.FAQ} component={Faq} />
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('react-root')
    );
};

loadableReady(() => {
    render();
});

/**
 * This script provides hot module reloading in development mode.
 */
// if (module.hot && process.env.NODE_ENV === 'development') {
//     module.hot.accept('../shared/App', () => {
//         const NextApp = require('../shared/App').default;
//         render(NextApp);
//     });
// }
