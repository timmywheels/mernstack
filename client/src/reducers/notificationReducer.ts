import { NOTIFICATION_DISPLAY, NOTIFICATION_HIDE } from "../actions";

const notificationReducer = (state: any, action: any) => {
	switch (action.type) {
		case NOTIFICATION_DISPLAY:
			return {
				...state,
				display: action.payload,
				title: action.payload.title,
				message: action.payload.message,
				type: action.payload.type
			};
		case NOTIFICATION_HIDE:
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

export default notificationReducer;
