import { HTTP_ERROR_ACTION } from "../actions/httpErrorAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HTTP_ERROR_ACTION.SAVE:
            return {
                ...state,
                loading: false,
                data: {...action.data}
            };
        case HTTP_ERROR_ACTION.REMOVE:
            return {
                ...state,
                loading: false,
                data: null,
            };
        default:
            return state;
    }
}