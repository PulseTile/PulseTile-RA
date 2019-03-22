import { MODAL_OPEN_ACTION } from "../actions/ReSPECT/modalOpenAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_ACTION.REQUEST:
            return {
                ...state,
                loading: false,
                data: !state.data,
            };
        default:
            return state;
    }
}