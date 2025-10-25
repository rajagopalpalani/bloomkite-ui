import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

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

export const PublicRoute = ({ children, path }) => {
    const location = useLocation();
    const token = localStorage.getItem('bloomkiteBusinessUser');
    const user = localStorage.getItem('bloomkiteUsername');
    const isLoginPage = path === '/login';
    const isSignupPage = path === '/signup';
    const redirect = !!(isLoginPage && token);
    
    if (redirect) {
        const { roleId } = JSON.parse(user);
        const url = getUrl(roleId);
        return <Navigate to={url} state={{ from: location }} replace />;
    }
    
    return children;
};

export default PublicRoute;
