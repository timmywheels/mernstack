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
const Header_1 = __importDefault(require("../components/common/Header"));
const Footer_1 = __importDefault(require("../components/common/Footer"));
const NotificationContext_1 = __importDefault(require("../context/NotificationContext"));
const Notification_1 = __importDefault(require("../components/common/Notification"));
const AppLayout = ({ children }) => {
    const { state: notification } = react_1.useContext(NotificationContext_1.default);
    return (<react_1.Fragment>
            <Header_1.default />
            <div className='mx-auto'>{children}</div>
            <Footer_1.default />
            <Notification_1.default display={notification.display} title={notification.title} message={notification.message} type={notification.success}/>
        </react_1.Fragment>);
};
exports.default = AppLayout;
