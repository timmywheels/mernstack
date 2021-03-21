import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component, auth, path, authenticated, exact = false }: any) => {
    // @ts-ignore
    return authenticated ? <Route component={component} exact={exact} path={path} auth={auth.user} /> : <Redirect to={'/login'} />;
};

export default ProtectedRoute;
