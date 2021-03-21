"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const notificationReducer = (state, action) => {
    switch (action.type) {
        case actions_1.NOTIFICATION_DISPLAY:
            return {
                ...state,
                display: action.payload,
                title: action.payload.title,
                message: action.payload.message,
                type: action.payload.type
            };
        case actions_1.NOTIFICATION_HIDE:
            return {
                ...state,
                display: action.payload,
                title: null,
                message: null,
                type: null
            };
        default:
            return state;
    }
};
exports.default = notificationReducer;
