import {LOADING} from "../constants";

export const combineReducers = (slices: any) => (prevState: any, action: any): any => {
    return Object.keys(slices).reduce(
        (nextState: any, nextProp: any) => ({
            ...nextState,
            [nextProp]: slices[nextProp](prevState[nextProp], action)
        }),
        prevState
    );
};

export const setLoadingFalse = (dispatch: any, delay = 0) => {
    setTimeout(() => {
        dispatch({ type: LOADING, payload: false });
    }, delay)
}
