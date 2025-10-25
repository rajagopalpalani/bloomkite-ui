import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const contextMenuHander = (e) => {
    e.preventDefault();
};

export const PrivateRoute = ({ children }) => {
    const location = useLocation();
    
    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHander);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHander);
        };
    }, []);
    
    return localStorage.getItem('bloomkiteBusinessUser')
        ? children
        : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;