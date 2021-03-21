"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = ({ component, auth, path, authenticated, exact = false }) => {
    // @ts-ignore
    return authenticated ? <react_router_dom_1.Route component={component} exact={exact} path={path} auth={auth.user}/> : <react_router_dom_1.Redirect to={'/login'}/>;
};
exports.default = ProtectedRoute;
