import { USER_DETAILS, USER_LOGIN, USER_LOGOUT, USER_TIMEZONE, USER_TOKEN_FOUND } from "../actions";

const authReducer = (state: any, action: any) => {
	switch (action.type) {
		case USER_TOKEN_FOUND:
			return {
				...state,
				authenticated: true
			};
		case USER_LOGIN:
			try {
				return {
					...state,
					authenticated: true
				};
			} catch (e) {
				return e;
			}
		case USER_LOGOUT:
			return {
				...state,
				authenticated: false,
				user: {},
				timezone: null
			};
		case USER_TIMEZONE:
			return {
				...state,
				timezone: action.payload
			};
		case USER_DETAILS:
			try {
				const user: any = action.payload;
				return {
					...state,
					user
				};
			} catch (err) {
				console.log('Error fetching user details:', err);
				return err;
			}
		default:
			return state;
	}
};

export default authReducer;
