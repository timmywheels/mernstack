import { LOADING } from "../actions";

const dashboardReducer = (state: any, action: any) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: action.payload
			}
		default:
			return state;
	}
};

export default dashboardReducer;
