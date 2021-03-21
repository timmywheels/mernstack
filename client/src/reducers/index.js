"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combineReducers = (slices) => (prevState, action) => {
    return Object.keys(slices).reduce((nextState, nextProp) => ({
        ...nextState,
        [nextProp]: slices[nextProp](prevState[nextProp], action)
    }), prevState);
};
exports.default = combineReducers;
