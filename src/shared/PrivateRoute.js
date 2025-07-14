import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../shared/components/asyncComponent';

const contextMenuHander = (e) => {
    e.preventDefault();
};

export const PrivateRoute = ({ component, ...rest }) => {
    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHander);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHander);
        };
    }, []);
    return (
        <Route {...rest} component={props => (
            localStorage.getItem('bloomkiteBusinessUser')
                ? <AsyncComponent {...props} component={component} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    );
}

export default PrivateRoute;