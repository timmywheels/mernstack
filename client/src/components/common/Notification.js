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
const NotificationContext_1 = __importDefault(require("../../context/NotificationContext"));
const heroicons_react_1 = require("heroicons-react");
const actions_1 = require("../../actions");
const notifications_1 = require("../../constants/notifications");
const Notification = ({ display, title, message, type }) => {
    const { state: notification, dispatch } = react_1.useContext(NotificationContext_1.default);
    const handleHideToast = () => {
        dispatch({ type: actions_1.NOTIFICATION_HIDE });
    };
    return (<div className={`${display ? "fixed right-0 top-0 w-full flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end" : "hidden"}`}>
            <div className={`${display ? "transition ease-in duration-100 transition opacity-100 translate-y-0 opacity-100 sm:translate-x-0" : "transform ease-out duration-300 transition opacity-0 translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"} max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto`}>
                <div className="rounded-lg shadow-xs overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-start">
                            {display ? <div className="flex-shrink-0">
                                {notification.type === notifications_1.NotificationType.SUCCESS ? <heroicons_react_1.CheckCircleOutline className={"h-6 w-6 text-green-400"}/> : <heroicons_react_1.XCircleOutline className={"h-6 w-6 text-red-400"}/>}
                            </div> : null}
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                {title ? <p className="text-sm leading-5 font-medium text-gray-900">
                                    {title}
                                </p> : null}
                                <p className="mt-1 text-sm leading-5 text-gray-500">
                                    {message}
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button onClick={() => handleHideToast()} className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                                    <heroicons_react_1.X className={"h-5 w-5"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = Notification;
