"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const utils_1 = require("./utils");
const authReducer_1 = __importDefault(require("./reducers/authReducer"));
const notificationReducer_1 = __importDefault(require("./reducers/notificationReducer"));
const actions_1 = require("./actions");
const AuthContext_1 = __importDefault(require("./context/AuthContext"));
const NotificationContext_1 = __importDefault(require("./context/NotificationContext"));
const Loader_1 = __importDefault(require("./components/common/Loader"));
const ScrollToTop_1 = __importDefault(require("./components/common/ScrollToTop"));
const DashboardContext_1 = __importDefault(require("./context/DashboardContext"));
const DashboardLayout_1 = __importDefault(require("./layout/DashboardLayout"));
const ProtectedRoute_1 = __importDefault(require("./components/common/ProtectedRoute"));
const DashboardHome_1 = __importDefault(require("./views/dashboard/DashboardHome"));
const AppLayout_1 = __importDefault(require("./layout/AppLayout"));
const Home_1 = __importDefault(require("./views/landing/Home"));
const constants_1 = require("./constants");
const dashboardReducer_1 = __importDefault(require("./reducers/dashboardReducer"));
const Login_1 = __importDefault(require("./views/landing/Login"));
const Register_1 = __importDefault(require("./views/landing/Register"));
const initialAuthState = {
    authenticated: false,
    user: {}
};
const initialDashboardState = {
    loading: false,
    currentPage: constants_1.Paginate.PAGE,
    pageSize: constants_1.Paginate.LIMIT,
};
const initialNotificationState = {
    display: false,
    message: null
};
const App = () => {
    const [state, dispatch] = react_1.default.useReducer(utils_1.combineReducers({
        auth: authReducer_1.default,
        dashboard: dashboardReducer_1.default,
        notification: notificationReducer_1.default
    }), {
        auth: initialAuthState,
        dashboard: initialDashboardState,
        notification: initialNotificationState
    });
    const { auth, dashboard, notification } = state;
    const fetchCurrentUser = async () => {
        const res = await fetch('/api/current-user');
        const data = await res.json();
        if (res.ok) {
            dispatch({ type: actions_1.USER_LOGIN, payload: data });
            dispatch({ type: actions_1.USER_DETAILS, payload: data });
        }
    };
    react_1.useEffect(() => {
        utils_1.setLoadingFalse(dispatch, 1000);
    }, [auth.user.authenticated]);
    react_1.useEffect(() => {
        if (!auth.user.authenticated)
            fetchCurrentUser().catch(err => err);
    }, []);
    const { authenticated } = auth;
    return (<AuthContext_1.default.Provider value={{ state: auth, dispatch }}>
            <NotificationContext_1.default.Provider value={{ state: notification, dispatch }}>
                <div>
                    <Loader_1.default loading={dashboard.loading}/>
                    <react_router_dom_1.BrowserRouter>
                        <ScrollToTop_1.default />
                        <react_router_dom_1.Switch>
                            <react_router_dom_1.Route path={'/dashboard'}>
                                <DashboardContext_1.default.Provider value={{ state: dashboard, dispatch }}>
                                    <DashboardLayout_1.default auth={auth}>
                                        <ProtectedRoute_1.default auth={auth} authenticated={authenticated} exact path={'/dashboard'} component={DashboardHome_1.default}/>
                                    </DashboardLayout_1.default>
                                </DashboardContext_1.default.Provider>
                            </react_router_dom_1.Route>
                            <react_router_dom_1.Route>
                                <AppLayout_1.default>
                                    <react_router_dom_1.Switch>
                                        <react_router_dom_1.Route exact path={'/'} component={Home_1.default}/>
                                        <react_router_dom_1.Route exact path={'/login'} component={Login_1.default}/>
                                        <react_router_dom_1.Route exact path={'/register'} component={Register_1.default}/>
                                    </react_router_dom_1.Switch>
                                </AppLayout_1.default>
                            </react_router_dom_1.Route>
                        </react_router_dom_1.Switch>
                    </react_router_dom_1.BrowserRouter>
                </div>
            </NotificationContext_1.default.Provider>
        </AuthContext_1.default.Provider>);
};
exports.default = App;
