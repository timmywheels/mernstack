"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const authReducer = (state, action) => {
    switch (action.type) {
        case actions_1.USER_TOKEN_FOUND:
            return {
                ...state,
                authenticated: true
            };
        case actions_1.USER_LOGIN:
            try {
                return {
                    ...state,
                    authenticated: true
                };
            }
            catch (e) {
                return e;
            }
        case actions_1.USER_LOGOUT:
            return {
                ...state,
                authenticated: false,
                user: {},
                timezone: null
            };
        case actions_1.USER_TIMEZONE:
            return {
                ...state,
                timezone: action.payload
            };
        case actions_1.USER_DETAILS:
            try {
                const user = action.payload;
                return {
                    ...state,
                    user
                };
            }
            catch (err) {
                console.log('Error fetching user details:', err);
                return err;
            }
        default:
            return state;
    }
};
exports.default = authReducer;
