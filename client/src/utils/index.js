"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLoadingFalse = exports.combineReducers = void 0;
const constants_1 = require("../constants");
const combineReducers = (slices) => (prevState, action) => {
    return Object.keys(slices).reduce((nextState, nextProp) => ({
        ...nextState,
        [nextProp]: slices[nextProp](prevState[nextProp], action)
    }), prevState);
};
exports.combineReducers = combineReducers;
const setLoadingFalse = (dispatch, delay = 0) => {
    setTimeout(() => {
        dispatch({ type: constants_1.LOADING, payload: false });
    }, delay);
};
exports.setLoadingFalse = setLoadingFalse;
