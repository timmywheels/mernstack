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
const logo_svg_1 = __importDefault(require("../assets/img/logo.svg"));
const AuthContext_1 = __importDefault(require("../context/AuthContext"));
const Avatar_1 = __importDefault(require("../components/common/Avatar"));
const constants_1 = require("../constants");
const Breadcrumbs_1 = __importDefault(require("../components/common/Breadcrumbs"));
const Tag_1 = __importDefault(require("../components/Tag"));
const DashboardContext_1 = __importDefault(require("../context/DashboardContext"));
const actions_1 = require("../actions");
const constants_2 = require("../constants");
const FeedbackModal_1 = __importDefault(require("../components/FeedbackModal"));
const heroicons_react_1 = require("heroicons-react");
const Notification_1 = __importDefault(require("../components/common/Notification"));
const NotificationContext_1 = __importDefault(require("../context/NotificationContext"));
const DashboardLayout = ({ auth, children }) => {
    const { dispatch: authDispatch } = react_1.default.useContext(AuthContext_1.default);
    const { state, dispatch: dashboardDispatch } = react_1.default.useContext(DashboardContext_1.default);
    const { state: notification } = react_1.useContext(NotificationContext_1.default);
    const [displayDropdown, setDisplayDropdown] = react_1.useState(false);
    const [displayMobileMenu, setDisplayMobileMenu] = react_1.useState(false);
    const [avatar, setAvatar] = react_1.useState(auth.user.avatar);
    const [displayFeedbackModal, setDisplayFeedbackModal] = react_1.useState(false);
    const history = react_router_dom_1.useHistory();
    const dropDownRef = react_1.useRef();
    const { pathname: currentPath } = react_router_dom_1.useLocation();
    let formSettingsPath = react_router_dom_1.useRouteMatch('/dashboard/forms/:formCustomId/settings')?.url || null;
    let dashBoardFormsNewPath = react_router_dom_1.useRouteMatch('/dashboard/forms/new')?.url || null;
    let dashboardDocsPath = react_router_dom_1.useRouteMatch('/dashboard/docs')?.url || null;
    let dashboardProfilePath = react_router_dom_1.useRouteMatch('/dashboard/profile')?.url || null;
    let dashboardBillingPath = react_router_dom_1.useRouteMatch('/dashboard/billing')?.url || null;
    const minimalDashboardLayoutRoutes = [formSettingsPath, dashBoardFormsNewPath, dashboardDocsPath, dashboardProfilePath, dashboardBillingPath];
    const currentPathShouldHideStatBar = minimalDashboardLayoutRoutes.filter(Boolean).includes(currentPath);
    const handleLogout = async () => {
        const res = await fetch(constants_1.Redirect.LOGOUT);
        if (res.ok) {
            authDispatch({ type: actions_1.USER_LOGOUT });
            history.push(constants_1.Redirect.HOME);
        }
    };
    const handleHideDropdown = () => {
        setDisplayDropdown(false);
    };
    const handleClickEvent = (event) => {
        try {
            if (displayDropdown && !dropDownRef.current.classList.contains('dashboard-dropdown')) {
                dropDownRef.current = null;
                setDisplayDropdown(false);
            }
        }
        catch (e) {
            setDisplayDropdown(true);
        }
    };
    const renderDashboardMenu = () => {
        return constants_1.DashboardMenu.map(menuItem => {
            return (<react_router_dom_1.Link to={menuItem.link} className="focus:bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium">
                    {menuItem.title}
                </react_router_dom_1.Link>);
        });
    };
    const renderDashboardDropdownMenu = () => {
        return constants_1.DashboardDropdownMenu.map(menuItem => {
            return menuItem.title.toLowerCase() === 'logout' ? (<a onClick={() => handleLogout()} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150' role='menuitem'>
                    {menuItem.title}
                </a>) : (<react_router_dom_1.Link onClick={() => handleHideDropdown()} to={menuItem.link} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150' role='menuitem'>
                    {menuItem.title}
                </react_router_dom_1.Link>);
        });
    };
    const toggleFeedbackModal = () => {
        setDisplayFeedbackModal(!displayFeedbackModal);
    };
    react_1.useEffect(() => {
        document.addEventListener('mousedown', handleClickEvent);
        return () => {
            document.removeEventListener('mousedown', handleClickEvent);
        };
    }, [dropDownRef]);
    react_1.useEffect(() => {
        if (auth.user.avatar)
            setAvatar(auth.user.avatar);
    }, [auth.user.avatar]);
    const { plan } = auth?.user;
    return !state.loading ? (<react_1.Fragment>
            <div className={`${dashboardDocsPath ? 'bg-white' : 'bg-gray-100'} min-h-screen`}>
                <div className={`${currentPathShouldHideStatBar ? '' : 'pb-32'} bg-indigo-600`}>
                    <nav className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none">
                        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                            <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                                <div className="px-2 inline-flex items-center lg:px-0">
                                    <div className="flex-shrink-0">
                                        <react_router_dom_1.Link to={constants_1.Redirect.HOME}>
                                            <img className="block h-8 w-auto" src={logo_svg_1.default} alt="Logo"/>
                                        </react_router_dom_1.Link>
                                    </div>

                                    <div className="hidden sm:block lg:ml-10">
                                        <div className="flex space-x-4">
                                            {renderDashboardMenu()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:hidden">
                                    {/*Mobile menu button */}
                                    <button onClick={() => setDisplayMobileMenu(!displayMobileMenu)} className="dashboard-dropdown bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-expanded="false">
                                        <span className="sr-only">Open main menu</span>

                                        {/*	Heroicon name: menu */}
                                        {/* Menu open: "hidden", Menu closed: "block" */}
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                        </svg>

                                        {/* Heroicon name: x */}
                                        {/* Menu open: "block", Menu closed: "hidden" */}
                                        <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="hidden sm:block lg:ml-4">
                                    <div className="flex items-center">
                                        <div className="my-4 pr-4">
                                            <Tag_1.default color={'indigo'} text={constants_2.Application.RELEASE}/>
                                        </div>
                                        <div className="my-4">
                                            <Tag_1.default color={'indigo'} text={plan?.type}/>
                                        </div>
                                        {/*Profile dropdown */}
                                        <div onClick={() => setDisplayDropdown(!displayDropdown)} className='ml-3 relative flex-shrink-0'>
                                            <div>
                                                <button className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline' id='user-menu' aria-label='User menu' aria-haspopup='true'>
                                                    <Avatar_1.default avatarUrl={avatar} size={8}/>
                                                </button>
                                            </div>
                                            {/* Desktop Dropdown */}
                                            {displayDropdown ? (<div className={`${displayDropdown ? 'transition ease-in duration-75 transform opacity-100 scale-100'
                : 'transition ease-out duration-100 transform opacity-0 scale-95'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}>
                                                    <div ref={dropDownRef} className='py-1 rounded-md bg-white shadow-xs' role='menu' aria-orientation='vertical' aria-labelledby='user-menu'>
                                                        {renderDashboardDropdownMenu()}
                                                    </div>
                                                </div>) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Mobile menu, toggle classNamees based on menu state.*/}
                        {/*Menu open: "block", Menu closed: "hidden"*/}

                        {displayMobileMenu ? <div className={displayMobileMenu ? `block` : `hidden lg:hidden`}>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {/*Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75"*/}
                                <react_router_dom_1.Link to={constants_1.Redirect.DASHBOARD} className="focus:bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium">
                                    Dashboard
                                </react_router_dom_1.Link>

                                <react_router_dom_1.Link to={constants_1.Redirect.INBOX} className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Inbox
                                </react_router_dom_1.Link>

                                <react_router_dom_1.Link to={constants_1.Redirect.FORMS} className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Forms
                                </react_router_dom_1.Link>

                                <react_router_dom_1.Link to={constants_1.Redirect.DOCS} className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Docs
                                </react_router_dom_1.Link>
                            </div>
                            <div className="pt-4 pb-3 border-t border-indigo-700">
                                <div className="px-5 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="rounded-full h-10 w-10" src={auth.user.avatar} alt={'Avatar'}/>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-indigo-300">{auth.user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <react_router_dom_1.Link to={constants_1.Redirect.PROFILE} className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Profile
                                    </react_router_dom_1.Link>

                                    <react_router_dom_1.Link to={constants_1.Redirect.BILLING} className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Billing
                                    </react_router_dom_1.Link>

                                    <a onClick={() => handleLogout()} className="cursor-pointer block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div> : null}
                    </nav>
                    <header className="py-5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className='text-3xl font-bold text-white'>
                                <Breadcrumbs_1.default />
                            </div>
                        </div>
                    </header>
                </div>

                <main className={'-mt-32'}>
                    <div onClick={toggleFeedbackModal} className={'cursor-pointer fixed bg-indigo-600 bottom-5 right-5 rounded-full p-3 shadow-lg border-2 border-indigo-200'}>
                        <heroicons_react_1.SpeakerphoneOutline className={'h-5 w-5 text-white'}/>
                    </div>
                </main>
                <FeedbackModal_1.default display={displayFeedbackModal} callback={toggleFeedbackModal}/>
            </div>
            <Notification_1.default display={notification.display} title={notification.title} message={notification.message} type={notification.success}/>
        </react_1.Fragment>) : null;
};
exports.default = DashboardLayout;
