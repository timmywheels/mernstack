"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const dashboardReducer = (state, action) => {
    switch (action.type) {
        case actions_1.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};
exports.default = dashboardReducer;
