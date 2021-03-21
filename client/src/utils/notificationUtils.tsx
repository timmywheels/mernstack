import { INotification } from '../types/notification';
import { NOTIFICATION_DISPLAY, NOTIFICATION_HIDE } from '../actions';

export const emitToastNotification = (dispatch, notification: INotification, displayFor = 5000) => {
    dispatch({ type: NOTIFICATION_DISPLAY, payload: { title: notification.title, message: notification.message, type: notification.type } as INotification });
    setTimeout(() => {
        dispatch({ type: NOTIFICATION_HIDE })
    }, displayFor);
}
