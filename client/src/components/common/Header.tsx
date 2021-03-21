import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/img/logo.svg";
import {Link, useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import { Plus } from 'heroicons-react';
import { USER_LOGOUT } from "../../actions";
import { DashboardDropdownMenu, DashboardMenu, Menu, Redirect } from '../../constants';

const Header = () => {

    const { state: auth, dispatch } = React.useContext(AuthContext);
    const { authenticated } = auth;
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const history = useHistory();
    const [avatar, setAvatar] = useState(auth.user.avatar);
    const [email, setEmail] = useState("");
    const dropDownRef: any = useRef();

    const renderMenu = () => {
        return Menu.map(menuItem => {
            return (
                <Link to={menuItem.link!}
                      className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-indigo-500 focus:outline-none focus:text-gray-700 focus:border-indigo-500 transition duration-150 ease-in-out">
                    { menuItem.title }
                </Link>
            );
        });
    };

    const renderDropdownMenu = () => {
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
                <Link onClick={() => handleHideDropdown()} to={menuItem.link!}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150'
                      role='menuitem'
                >
                    {menuItem.title}
                </Link>);
        });
    };

    const handleHideDropdown = () => {
        setDisplayDropdown(false);
    };

    const handleClickEvent = (event: any) => {
        try {
            if (displayDropdown && !dropDownRef.current.classList.contains('dashboard-dropdown')) {
                dropDownRef.current = null;
                setDisplayDropdown(false);
            }
        } catch (e) {
            setDisplayDropdown(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickEvent);
        return () => {
            document.removeEventListener('mousedown', handleClickEvent);
        };
    }, [dropDownRef]);

    useEffect(() => {
        try {
            if (auth.user.avatar) setAvatar(auth.user.avatar);
            if (auth.user.email) setEmail(auth.user.email);
        } catch (e) {
            console.log('User not available:', e)
        }
    }, [auth.user, authenticated]);

    const handleLogout = async () => {
        const res = await fetch(Redirect.LOGOUT);
        if (res.ok) {
            dispatch({type: USER_LOGOUT});
            history.push(Redirect.HOME);
        }
    };

    return (
        <nav className="bg-white relative shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center md:hidden">
                            <button onClick={() => setToggleMenu(!toggleMenu)}
                                    className="dashboard-dropdown inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    aria-label="Main menu" aria-expanded="false">
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center">
                            <Link to={auth.authenticated ? Redirect.DASHBOARD : Redirect.HOME}>
                                <img className="block lg:hidden h-8 w-auto" src={Logo} alt="Logo"/>
                                <img className="hidden lg:block h-8 w-auto" src={Logo} alt="Logo"/>
                            </Link>
                        </div>
                        <div className="hidden md:ml-6 md:flex">
                            { renderMenu() }
                        </div>
                    </div>
                    <div className="flex items-center">
                        {authenticated ? (<div className="flex-shrink-0">
                                <Link to={Redirect.FORMS_NEW}>
                                    <button type="button"
                                            className="inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded-lg shadow text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition duration-150">
                                        <Plus className={'w-4 h-4'}/>
                                        <span>New Form</span>
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex-shrink-0">
                                <Link to={Redirect.REGISTER}>
                                    <p className={"relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium"}>Register</p>
                                </Link>
                                <Link to={Redirect.LOGIN}>
                                    <span className="inline-flex rounded-md shadow">
                                      <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-500">
                                        Login
                                      </a>
                                    </span>
                                </Link>
                            </div>
                        )}
                        { authenticated ? (<div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                                <button
                                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    aria-label="Notifications">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                    </svg>
                                </button>

                                <div onClick={() => setDisplayDropdown(!displayDropdown)} className={"ml-3 relative"}>
                                    <div>
                                        <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                                id="user-menu" aria-label="User menu" aria-haspopup="true">
                                            <Avatar avatarUrl={avatar} size={8}/>
                                        </button>
                                    </div>

                                    <div ref={dropDownRef} className={`${displayDropdown ? "dashboard-dropdown z-50 transition ease-in duration-75 transform opacity-100 scale-100" : "transition ease-out duration-200 transform opacity-0 scale-95"} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}>
                                        <div className="dashboard-dropdown origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu"
                                             aria-orientation="vertical" aria-labelledby="user-menu">
                                            <Link to={Redirect.DASHBOARD}
                                                  className="dashboard-dropdown block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                  role="menuitem">Dashboard
                                            </Link>
                                            <Link to={Redirect.BILLING}
                                                  className="dashboard-dropdown block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                  role="menuitem">Billing
                                            </Link>
                                            <Link to={Redirect.HOME} onClick={() => handleLogout()}
                                                  className="dashboard-dropdown block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                  role="menuitem">Logout
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className={`${toggleMenu ? "block z-100" : "hidden"} md:hidden`}>
                <div className="pt-2 pb-3 z-100">
                    <Link to={Redirect.DASHBOARD}
                          className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-500 transition duration-150 ease-in-out sm:pl-5 sm:pr-6">Dashboard
                    </Link>
                    <Link to={Redirect.INBOX}
                          className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out sm:pl-5 sm:pr-6">Submissions
                    </Link>
                    <Link to={Redirect.FORMS}
                          className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out sm:pl-5 sm:pr-6">Forms
                    </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                            <Avatar avatarUrl={avatar} size={10}/>
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium leading-5 text-gray-500">{ email }</div>
                        </div>
                    </div>
                    <div className="mt-3 dashboard-dropdown">
                        {/*<Link to={MenuLink.PROFILE} className="dashboard-dropdown block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6">Profile</Link>*/}
                        <Link to={Redirect.BILLING} className="dashboard-dropdown mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6">Billing</Link>
                        <Link to={Redirect.HOME} onClick={() => handleLogout()}
                              className="dashboard-dropdown mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Header;