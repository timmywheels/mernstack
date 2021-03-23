import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Logo from '../assets/img/logo-light.svg';
import AuthContext from '../context/AuthContext';
import Avatar from '../components/common/Avatar';
import { DashboardDropdownMenu, DashboardMenu, Redirect } from '../constants';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Tag from '../components/Tag';
import DashboardContext from '../context/DashboardContext';
import { USER_LOGOUT } from '../actions';
import { Application } from '../constants';
import FeedbackModal from '../components/FeedbackModal';
import { SpeakerphoneOutline } from 'heroicons-react';
import Notification from "../components/common/Notification";
import NotificationContext from "../context/NotificationContext";

const AdminLayout: ({ auth, children }: { auth: any, children: any }) => any = ({ auth, children }) => {
    const { dispatch: authDispatch } = React.useContext(AuthContext);
    const { state, dispatch: dashboardDispatch } = React.useContext(DashboardContext);
    const { state: notification } = useContext(NotificationContext);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
    const [avatar, setAvatar] = useState(auth.user.avatar);
    const [displayFeedbackModal, setDisplayFeedbackModal] = useState(false);
    const history = useHistory();
    const dropDownRef: any = useRef();
    const { pathname: currentPath } = useLocation();
    let formSettingsPath = useRouteMatch('/dashboard/forms/:formCustomId/settings')?.url || null;
    let dashBoardFormsNewPath = useRouteMatch('/dashboard/forms/new')?.url || null;
    let dashboardDocsPath = useRouteMatch('/dashboard/docs')?.url || null;
    let dashboardProfilePath = useRouteMatch('/dashboard/profile')?.url || null;
    let dashboardBillingPath = useRouteMatch('/dashboard/billing')?.url || null;

    const minimalDashboardLayoutRoutes = [formSettingsPath, dashBoardFormsNewPath, dashboardDocsPath, dashboardProfilePath, dashboardBillingPath];
    const currentPathShouldHideStatBar = minimalDashboardLayoutRoutes.filter(Boolean).includes(currentPath);

    const handleLogout = async () => {
        const res = await fetch(Redirect.LOGOUT);
        if (res.ok) {
            authDispatch({ type: USER_LOGOUT });
            history.push(Redirect.HOME);
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
        } catch (e) {
            setDisplayDropdown(true);
        }
    };

    const renderDashboardMenu = () => {
        return DashboardMenu.map(menuItem => {
            return (
                <Link to={menuItem.link}
                      className="focus:bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium">
                    {menuItem.title}
                </Link>);
        });
    };

    const renderDashboardDropdownMenu = () => {
        return DashboardDropdownMenu.map(menuItem => {
            return menuItem.title.toLowerCase() === 'logout' ? (
                <a
                    onClick={() => handleLogout()}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150'
                    role='menuitem'
                >
                    {menuItem.title}
                </a>
            ) : (
                <Link onClick={() => handleHideDropdown()} to={menuItem.link}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150'
                      role='menuitem'
                >
                    {menuItem.title}
                </Link>);
        });
    };

    const toggleFeedbackModal = () => {
        setDisplayFeedbackModal(!displayFeedbackModal);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickEvent);
        return () => {
            document.removeEventListener('mousedown', handleClickEvent);
        };
    }, [dropDownRef]);

    useEffect(() => {
        if (auth.user.avatar) setAvatar(auth.user.avatar);
    }, [auth.user.avatar]);


    const { plan } = auth?.user;
    return !state.loading ? (
        <Fragment>
            <div className={`${dashboardDocsPath ? 'bg-white' : 'bg-gray-100'} min-h-screen`}>
                <div className={`${currentPathShouldHideStatBar ? '' : 'pb-32'} bg-indigo-600`}>
                    <nav className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none">
                        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                            <div
                                className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                                <div className="px-2 inline-flex items-center lg:px-0">
                                    <div className="flex-shrink-0">
                                        <Link to={Redirect.HOME}>
                                            <img className="block h-8 w-auto"
                                                 src={Logo}
                                                 alt="Logo" />
                                        </Link>
                                    </div>

                                    <div className="hidden sm:block lg:ml-10">
                                        <div className="flex space-x-4">
                                            {renderDashboardMenu()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:hidden">
                                    {/*Mobile menu button */}
                                    <button
                                        onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
                                        className="dashboard-dropdown bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                                        aria-expanded="false">
                                        <span className="sr-only">Open main menu</span>

                                        {/*	Heroicon name: menu */}
                                        {/* Menu open: "hidden", Menu closed: "block" */}
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>

                                        {/* Heroicon name: x */}
                                        {/* Menu open: "block", Menu closed: "hidden" */}
                                        <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="hidden sm:block lg:ml-4">
                                    <div className="flex items-center">
                                        <div className="my-4 pr-4">
                                            <Tag color={'indigo'} text={Application.RELEASE} />
                                        </div>
                                        {/*Profile dropdown */}
                                        <div onClick={() => setDisplayDropdown(!displayDropdown)}
                                             className='ml-3 relative flex-shrink-0'>
                                            <div>
                                                <button
                                                    className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline'
                                                    id='user-menu'
                                                    aria-label='User menu'
                                                    aria-haspopup='true'
                                                >
                                                    <Avatar avatarUrl={avatar} size={8} />
                                                </button>
                                            </div>
                                            {/* Desktop Dropdown */}
                                            {displayDropdown ? (
                                                <div
                                                    className={`${displayDropdown ? 'transition ease-in duration-75 transform opacity-100 scale-100'
                                                        : 'transition ease-out duration-100 transform opacity-0 scale-95'
                                                    } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
                                                >
                                                    <div ref={dropDownRef}
                                                         className='py-1 rounded-md bg-white shadow-xs'
                                                         role='menu'
                                                         aria-orientation='vertical' aria-labelledby='user-menu'>
                                                        {renderDashboardDropdownMenu()}
                                                    </div>
                                                </div>
                                            ) : null}
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
                                <Link to={Redirect.DASHBOARD}
                                      className="focus:bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium">
                                    Dashboard
                                </Link>

                                <Link to={Redirect.INBOX}
                                      className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Inbox
                                </Link>

                                <Link to={Redirect.FORMS}
                                      className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Forms
                                </Link>

                                <Link to={Redirect.DOCS}
                                      className="focus:bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium">
                                    Docs
                                </Link>
                            </div>
                            <div className="pt-4 pb-3 border-t border-indigo-700">
                                <div className="px-5 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="rounded-full h-10 w-10"
                                             src={auth.user.avatar}
                                             alt={'Avatar'} />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-indigo-300">{auth.user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <Link to={Redirect.PROFILE}
                                          className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Profile
                                    </Link>

                                    <Link to={Redirect.BILLING}
                                          className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Billing
                                    </Link>

                                    <a
                                        onClick={() => handleLogout()}
                                        className="cursor-pointer block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div> : null}
                    </nav>
                    <header className="py-5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className='text-3xl font-bold text-white'>
                                <Breadcrumbs />
                            </div>
                        </div>
                    </header>
                </div>

                <main className={'-mt-32'}>
                    <div onClick={toggleFeedbackModal} className={'cursor-pointer fixed bg-indigo-600 bottom-5 right-5 rounded-full p-3 shadow-lg border-2 border-indigo-200'}>
                        <SpeakerphoneOutline className={'h-5 w-5 text-white'}/>
                    </div>
                </main>
                <FeedbackModal display={displayFeedbackModal} callback={toggleFeedbackModal}/>
            </div>
            <Notification display={notification.display} title={notification.title} message={notification.message}
                          type={notification.success}/>
        </Fragment>
    ) : null;
};

export default AdminLayout;
