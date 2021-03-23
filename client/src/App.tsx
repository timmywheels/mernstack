import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {combineReducers, setLoadingFalse} from "./utils";
import authReducer from "./reducers/authReducer";
import notificationReducer from "./reducers/notificationReducer";
import {USER_DETAILS, USER_LOGIN} from "./actions";
import AuthContext from "./context/AuthContext";
import NotificationContext from "./context/NotificationContext";
import Loader from "./components/common/Loader";
import ScrollToTop from "./components/common/ScrollToTop";
import DashboardContext from "./context/DashboardContext";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardHome from "./views/dashboard/DashboardHome";
import AppLayout from "./layout/AppLayout";
import Home from "./views/landing/Home";
import {Paginate} from "./constants";
import dashboardReducer from "./reducers/dashboardReducer";
import Login from "./views/landing/Login";
import Register from "./views/landing/Register";
import DashboardLayout from "./layout/DashboardLayout";

const initialAuthState = {
    authenticated: false,
    user: {}
};

const initialDashboardState = {
    loading: false,
    currentPage: Paginate.PAGE,
    pageSize: Paginate.LIMIT,
};

const initialNotificationState = {
    display: false,
    message: null
};

const App = () => {
    const [state, dispatch] = React.useReducer(
        combineReducers({
            auth: authReducer,
            dashboard: dashboardReducer,
            notification: notificationReducer
        }),
        {
            auth: initialAuthState,
            dashboard: initialDashboardState,
            notification: initialNotificationState
        });



    const {auth, dashboard, notification} = state;

    const fetchCurrentUser = async () => {
        const res = await fetch('/api/current-user');
        const data = await res.json();
        console.log('data:', data)
        if (res.ok) {
            dispatch({type: USER_LOGIN, payload: data});
            dispatch({type: USER_DETAILS, payload: data});
        }
    };

    useEffect(() => {
        setLoadingFalse(dispatch, 1000);
    }, [auth.user.authenticated]);

    useEffect(() => {
        if (!auth.user.authenticated) fetchCurrentUser().catch(err => err);
    }, []);

    const { authenticated } = auth;
    return (
        <AuthContext.Provider value={{ state: auth, dispatch }}>
            <NotificationContext.Provider value={{ state: notification, dispatch }}>
                <div>
                    <Loader loading={dashboard.loading}/>
                    <Router>
                        <ScrollToTop/>
                        <Switch>
                            <Route path={'/dashboard'}>
                                <DashboardContext.Provider value={{ state: dashboard, dispatch }}>
                                    <DashboardLayout auth={auth}>
                                        <ProtectedRoute auth={auth} authenticated={authenticated} exact path={'/dashboard'} component={DashboardHome}/>
                                    </DashboardLayout>
                                </DashboardContext.Provider>
                            </Route>
                            <Route>
                                <AppLayout>
                                    <Switch>
                                        <Route exact path={'/'} component={Home}/>
                                        <Route exact path={'/login'} component={Login}/>
                                        <Route exact path={'/register'} component={Register}/>
                                    </Switch>
                                </AppLayout>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </NotificationContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
