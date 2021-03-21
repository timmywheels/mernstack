"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToastNotification = void 0;
const actions_1 = require("../actions");
const emitToastNotification = (dispatch, notification, displayFor = 5000) => {
    dispatch({ type: actions_1.NOTIFICATION_DISPLAY, payload: { title: notification.title, message: notification.message, type: notification.type } });
    setTimeout(() => {
        dispatch({ type: actions_1.NOTIFICATION_HIDE });
    }, displayFor);
};
exports.emitToastNotification = emitToastNotification;
