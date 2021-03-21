import React, { useContext } from 'react';
import NotificationContext from '../../context/NotificationContext';
import { CheckCircleOutline, X, XCircleOutline } from 'heroicons-react';
import { NOTIFICATION_HIDE } from '../../actions';
import { NotificationType } from '../../constants/notifications';

const Notification = ({ display, title, message, type } : { display: any, title?: any, message: any, type: NotificationType }) => {

    const { state: notification, dispatch } = useContext(NotificationContext);

    const handleHideToast = () => {
        dispatch({ type: NOTIFICATION_HIDE });
    };

    return (
        <div className={`${display ? "fixed right-0 top-0 w-full flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end" : "hidden"}`}>
            <div className={`${display ? "transition ease-in duration-100 transition opacity-100 translate-y-0 opacity-100 sm:translate-x-0" : "transform ease-out duration-300 transition opacity-0 translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto`}>
                <div className="rounded-lg shadow-xs overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-start">
                            { display ? <div className="flex-shrink-0">
                                { notification.type === NotificationType.SUCCESS ? <CheckCircleOutline className={"h-6 w-6 text-green-400"} /> : <XCircleOutline className={"h-6 w-6 text-red-400"} /> }
                            </div> : null }
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                { title ? <p className="text-sm leading-5 font-medium text-gray-900">
                                    { title }
                                </p> : null }
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    { message }
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button
                                    onClick={() => handleHideToast()}
                                    className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                                    <X className={"h-5 w-5"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Notification;
