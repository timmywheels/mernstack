"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Avatar = ({ size, avatarUrl, className }) => {
    return <img className={`${className ? className : ""} h-${size} w-${size} rounded-full`} src={avatarUrl} alt={`Avatar`}/>;
};
exports.default = Avatar;
