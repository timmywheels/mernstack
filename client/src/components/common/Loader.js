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
const PulseLoader_1 = __importDefault(require("./PulseLoader"));
const Loader = ({ loading }) => {
    return (<react_1.Fragment>
           <div className={`${loading ? "opacity-100 object-cover w-full h-full fixed block top-0 left-0 bg-white z-50 absolute" : "opacity-0 hidden"} transition-opacity duration-100 ease-in-out`}>
                <div className="profile-main-loader">
                    <div className="loader">
                        <PulseLoader_1.default />
                    </div>
                </div>
            </div>
        </react_1.Fragment>);
};
exports.default = Loader;
