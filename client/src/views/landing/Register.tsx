import React, { useContext, useState } from 'react';
import Logo from '../../assets/img/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { emitToastNotification } from '../../utils/notificationUtils';
import NotificationContext from '../../context/NotificationContext';
import { NotificationType, Redirect } from '../../constants';
import FacebookLogo from "../../assets/img/facebook-login.svg";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(NotificationContext);
    const history = useHistory();
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            name,
            email,
            password
        };

        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const notification = await res.json();
        emitToastNotification(dispatch, notification);

        if (notification.type === NotificationType.SUCCESS) {
            history.push(Redirect.CONFIRM_EMAIL)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="object-center m-auto lg:block h-12 w-auto" src={Logo} alt="Sendpoint logo" />
                <h2 className="mt-0 text-center text-xl leading-9 font-extrabold text-gray-900">
                    Create your free account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="name"
                                    type="name"
                                    name={'name'}
                                    onChange={(e: any) => setName(e.target.value)}
                                    value={name}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="email"
                                    type="email"
                                    name={'email'}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="password"
                                    type="password"
                                    name={'password'}
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm leading-5">
                                <Link to={'/login'}
                                      className="font-bold text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    Already have an account? Login instead.
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6">
						  <span className="block w-full rounded-md shadow-sm">
							<button type="submit"
                                    className="w-full flex justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:border-indigo-500 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							  Register
							</button>
						  </span>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm leading-5">
								<span className="px-2 bg-white text-gray-500">
								  Or continue with
								</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <a href={"/auth/google/login"}
                                   className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="h-5 w-5" fill="#737373" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg"
                                         preserveAspectRatio="xMidYMid">
                                        <path
                                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                            fill="#737373" />
                                        <path
                                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                            fill="#737373" />
                                        <path
                                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                            fill="#737373" />
                                        <path
                                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                            fill="#737373" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a href={"/auth/facebook/login"}
                                   className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <img style={{ height: 20 }} src={FacebookLogo} alt={"Facebook Login"} />
                                </a>
                            </div>

                            <div>
                                <a href={"/auth/github/login"}
                                   className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Sign in with GitHub</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                              clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
