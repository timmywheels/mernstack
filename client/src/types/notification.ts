import { NotificationType } from '../constants';

export interface INotification {
	status?: string | number,
	title: string,
	message: string,
	type: NotificationType.SUCCESS | NotificationType.ERROR,
	payload?: any
}
