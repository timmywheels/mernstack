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
const react_router_breadcrumbs_hoc_1 = __importDefault(require("react-router-breadcrumbs-hoc"));
const heroicons_react_1 = require("heroicons-react");
const react_router_dom_1 = require("react-router-dom");
const routes = [];
const Breadcrumbs = ({ breadcrumbs }) => {
    return (<div>
            <div className={"inline-flex"}>
                {breadcrumbs.map(({ match, breadcrumb, key }, i) => {
            if (i === breadcrumbs.length - 1) {
                return (<div key={key} style={{ lineHeight: "0.9rem" }}>
                                <react_router_dom_1.Link to={key}>
                                    <div key={key} className={"flex text-xs inline-flex text-white"}>{breadcrumb}</div>
                                </react_router_dom_1.Link>
                            </div>);
            }
            return (<react_1.Fragment key={key}>
                            <div key={key} style={{ lineHeight: "0.9rem" }} className={"align-middle inline-block flex"}>
                                <react_router_dom_1.Link to={key}>
                                    <div className={"flex text-xs inline-flex text-white opacity-75"}>{breadcrumb}</div>
                                </react_router_dom_1.Link>
                                <heroicons_react_1.ChevronRight key={key} height={"1.75rem"} width={"1.1rem"} className={"inline-block flex text-white opacity-75"}/>
                            </div>

                        </react_1.Fragment>);
        })}
            </div>
            <div className={"my-5"}>
                <h1 className={"text-3xl font-medium text-white"}>
                    {breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children}
                </h1>
            </div>
        </div>);
};
exports.default = react_router_breadcrumbs_hoc_1.default(routes)(Breadcrumbs);
