import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../shared/components/asyncComponent';

const getUrl = (roleId) => {
    switch (roleId) {
        case 1:
            return '/dashboard';
        case 2:
            return '/dashboard';
        case 3:
            return '/dashboard';
    }
};

export const PublicRoute = ({ component, ...rest }) => {
    const { path } = rest;
    const token = localStorage.getItem('bloomkiteBusinessUser');
    const user = localStorage.getItem('bloomkiteUsername');
    const isLoginPage = path === '/login';
    const isSignupPage = path === '/signup';
    const redirect = !!(isLoginPage && token);
    if (redirect) {
        const { roleId } = JSON.parse(user);
        const url = getUrl(roleId);
        return (
            <Redirect
                to={{
                    pathname: url,
                    state: { from: rest.location }
                }}
            />
        );
    }
    return <Route {...rest} component={(props) => <AsyncComponent {...props} component={component} publicRoute={true} isNewDesign={isLoginPage || isSignupPage} />} />;
};

export default PublicRoute;
